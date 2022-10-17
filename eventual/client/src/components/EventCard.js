import * as Utils from './Utils.js';
import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faCircleDot,
  faAngleRight,
} from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

const arrowDivStyle = {
  float: "right",
  margin: "50px auto",
};

const arrowStyle = {
  fontSize: 25,
};

const EventCard = (props) => {
  const [author, setAuthor] = useState([]);

  useEffect(() => {
    if (props.event.author) {
      async function getUser() {
        const response = await fetch(
          `http://localhost:5000/search/name/` + props.event.author
        );
        if (!response.ok) {
          return;
        }
        const author = await response.json();
        setAuthor(author);
      }
      getUser();
      return;
    }
  }, [props.event.author]);

  async function likeEvent(id) {
    // passes the id of the event
    await fetch(`http://localhost:5000/liked/add_like/${id}`, {
        method: "POST"
      });
    window.location.reload(false);
  }
  
  // This method decrease the number of likes by 1
  async function dislikeEvent(id) {
    // passes the id of the event
    await fetch(`http://localhost:5000/liked/add_dislike/${id}`, {
        method: "POST"
      });
    window.location.reload(false);
  }

  const event = props.event;
  const id = event._id;
  const name = event.event_name;
  const imgUrl = event.image_url;
  const desc = event.description;
  const likes = event.num_likes;
  const city = event.city;
  const address = event.location;
  const eventID = event._id;
  const likedby= event.liked_by;
  const account_id = "632c889ad56e85f52f50ac78";

  const startTimeObj = event.startTime;
  const startTime = new Date(startTimeObj);
  const endTime = new Date(event.endTime);
  const date = startTime.toDateString();
  const startTimeStr = startTime.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  const endTimeStr = endTime.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  const authorName = Utils.getUsersNameAsString(author);

  let navigate = useNavigate();
  function redirectToEvent() {
    let path = "/events/" + id;
    navigate(path);
  }

  return (
    <Card
      className="eventCard clickable card-title shadow"
      onClick={redirectToEvent}
    >
      <Card.Body>
        {imgUrl && (
          <div className="pic">
            <img src={imgUrl} alt={name} />
          </div>
        )}
        <div style={arrowDivStyle}>
          <FontAwesomeIcon icon={faAngleRight} style={arrowStyle} />
        </div>
        <div>
          {name && <span className="title">{name}</span>}
          {startTimeObj && <span className="date">{date}</span>}
        </div>
        <div className="infoStrip">
          {startTimeObj && (
            <span>
              <span className="property">Time: </span>
              {startTimeStr} - {endTimeStr}
            </span>
          )}
          {city && (
            <span>
              {" "}
              <FontAwesomeIcon icon={faCircleDot} size="xs" />{" "}
              <span className="property">City: </span>
              {city}
            </span>
          )}
          {authorName && (
            <span>
              {" "}
              <FontAwesomeIcon icon={faCircleDot} size="xs" />{" "}
              <span className="property">Hosted By: </span>
              {authorName}
            </span>
          )}
          {address && (
            <span>
              {" "}
              <FontAwesomeIcon icon={faCircleDot} size="xs" />{" "}
              <span className="property">Address: </span>
              {address}
            </span>
          )}
        </div>
        
        {desc && <div className="desc">{desc}</div>}
        {likes !== undefined && (
          <div className="likes">
            <FontAwesomeIcon icon={faHeart} /> {likes}{" "}
            {likes === 1 ? "person is" : "people are"} interested in this event
          </div>
        )}
        {likedby.find((likeObjects)=>likeObjects.account_id==account_id) !== undefined 
        ?
        <div><Button variant="outline-danger"
        onClick={() => {
          dislikeEvent(eventID)
        }}
      > Dislike 
      </Button></div>
        :
        <div><Button variant="outline-primary"
        onClick={() => {
          likeEvent(eventID)
        }}
      > Like 
      </Button></div>
        }
      </Card.Body>
    </Card>
  );
};

export default EventCard;
