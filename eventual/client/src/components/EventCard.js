import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faCircleDot,
  faAngleRight,
} from "@fortawesome/free-solid-svg-icons";

const arrowDivStyle = {
  float: "right",
  margin: "50px auto",
};

const arrowStyle = {
  fontSize: 25,
};

function getAuthorName(author) {
  if (!author) return null;
  if (author.name) {
    const firstName = author.name.first;
    const lastName = author.name.last;
    var name = "";
    if (firstName) name = name + firstName;
    if (firstName && lastName) name = name + " ";
    if (lastName) name = name + lastName;
    return name;
  }
  return null;
}

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
  });

  const event = props.event;
  const name = event.event_name;
  const imgUrl = event.image_url;
  const desc = event.description;
  const likes = event.num_likes;
  const city = event.city;
  const address = event.location;

  const startTimeObj = event.startTime;
  const startTime = new Date(startTimeObj);
  const endTime = new Date(event.endTime);
  const date = startTime.toDateString();
  const startTimeStr = startTime.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});
  const endTimeStr = endTime.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});

  const authorName = getAuthorName(author);

  return (
    <Card className="eventCard card-title shadow" border="dark">
      <Card.Body>
        {imgUrl && (
          <div className="img">
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
      </Card.Body>
    </Card>
  );
};

export default EventCard;
