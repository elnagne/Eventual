import * as Utils from './Utils.js';
import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";

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

  const event = props.event;
  const id = event._id;
  const event_id = event.event_id;
  const description = event.description;
  const title = event.title;
 
  return (
    <Card
      className="eventCard clickable card-title shadow"
    >
      <Card.Body>
      <div>{title}</div>
      <div>{description}</div>
      </Card.Body>
    </Card>
  );
};

export default NotifCard;
