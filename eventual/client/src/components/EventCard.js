import * as Utils from './Utils.js';
import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
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

  const event = props.event;
  const id = event._id;
  const name = event.event_name;
  const imgUrl = event.image_url;
  const desc = event.description;
  const likes = event.num_likes;
  const city = event.address_data ? event.address_data.locality : null;
  const address = event.location;

  const dateStr = event.date_of_event;
  const dateObj = new Date(dateStr);
  const date = dateObj.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const timeStr = event.time_of_event;
  const timeObj = new Date("0000-01-01 " + timeStr);
  const time = timeObj.toLocaleTimeString([], {
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
          {date && <span className="date">{date}</span>}
        </div>
        <div className="infoStrip">
          {time && (
            <span>
              <span className="property">Time: </span>
              {time}
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
      </Card.Body>
    </Card>
  );
};

export default EventCard;
