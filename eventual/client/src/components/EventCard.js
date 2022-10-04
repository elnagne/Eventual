import React from "react";
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

const EventCard = (props) => {
  const event = props.event;
  const name = event.event_name;
  const imgUrl = event.image_url;
  const author = event.author;
  const desc = event.description;
  const likes = event.num_likes;
  const city = event.city;
  const address = event.address;

  const startTime = new Date(event.startTime);
  const endTime = new Date(event.endTime);
  const date = startTime.toDateString();
  const startTimeStr = startTime.toLocaleTimeString();
  const endTimeStr = endTime.toLocaleTimeString();

  return (
    <Card className="eventCard card-title shadow" border="dark">
      <Card.Body>
        <div className="img">
          <img src={imgUrl} alt={name} />
        </div>
        <div style={arrowDivStyle}>
          <FontAwesomeIcon icon={faAngleRight} style={arrowStyle} />
        </div>
        <div>
          {name && <span className="title">{name}</span>}
          {date && <span className="date">{date}</span>}
        </div>
        <div className="infoStrip">
          {startTimeStr && endTimeStr && (
            <span>
              <span className="property">TIME: </span>
              {startTimeStr} - {endTimeStr}
            </span>
          )}
          {city && (
            <span>
              {" "}
              <FontAwesomeIcon icon={faCircleDot} size="xs" />{" "}
              <span className="property">CITY: </span>
              {city}
            </span>
          )}
          {author && (
            <span>
              {" "}
              <FontAwesomeIcon icon={faCircleDot} size="xs" />{" "}
              <span className="property">HOSTED BY: </span>
              {author}
            </span>
          )}
          {address && (
            <span>
              {" "}
              <FontAwesomeIcon icon={faCircleDot} size="xs" />{" "}
              <span className="property">ADDRESS: </span>
              {address}
            </span>
          )}
        </div>
        {desc && <div className="desc">{desc}</div>}
        {likes && (
          <div className="likes">
            <FontAwesomeIcon icon={faHeart} /> {likes}{" "}
            {likes === 1 ? "person has" : "people have"} are interested in this
            event
          </div>
        )}
      </Card.Body>
    </Card>
  );
};

export default EventCard;
