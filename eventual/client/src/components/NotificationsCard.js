import * as Utils from './Utils.js';
import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";
const NotifCard = (props) => {
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
  let navigate = useNavigate();
  function redirectToEvent() {
    let path = "/eventsNotif/" + id;
    navigate(path);
  }
  const event = props.event;
  const id = event.event_id;
  const event_name = event.event_name;
  const timeStr = event.time_created;
  const description = event.description;
  const title = event.title;
 
  return (
    <Card
      className="eventCard clickable card-title shadow"
      onClick={redirectToEvent}
    >
      <Card.Body>
      <div className="title">
            {title ? title : '[NO EVENT NAME]'}
          </div>
          <div className="infoStrip"></div>
          <div className="event-info">
      {timeStr && (
            <span>
              <span className="property">Event Name: </span>
              {event_name}
            </span>
          )}
      </div>
      <div className="event-info">
      {timeStr && (
            <span>
              <span className="property">Time Created: </span>
              {timeStr}
            </span>
          )}
      </div>
      <div className="event-info">{description}</div>
      </Card.Body>
    </Card>
  );
};

export default NotifCard;
