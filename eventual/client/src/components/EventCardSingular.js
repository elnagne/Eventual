import * as Utils from "./Utils.js";
import { Card, Button, Container, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faShare,
  faEarthAfrica,
  faCaretLeft,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const EventCardSingular = (props) => {
  const [author, setAuthor] = useState([]);

  useEffect(() => {
    if (props.event && props.event.author) {
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
  }, [props.event]);

  let navigate = useNavigate();
  function backToEventsPage() {
    let path = "/events";
    navigate(path);
  }

  const event = props.event;

  if (!event) {
    return (
      <Card className="eventCard singular card-title shadow">
        <Card.Body>
          <Button
            variant="dark"
            size="sm"
            className="back-btn"
            onClick={backToEventsPage}
          >
            <FontAwesomeIcon icon={faCaretLeft} /> All Events
          </Button>
          <h1>Sorry, that event doesn't exist.</h1>
        </Card.Body>
      </Card>
    );
  }

  const name = event.event_name;
  const displayName = name ? name.toUpperCase() : null;
  const imgUrl = event.image_url;

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
  
  const likes = event.num_likes;
  const city = event.address_data
    ? Utils.getLocationInfoAsString(event.address_data)
    : null;
  const category = event.category;
  const address = event.location;
  const desc = event.description;

  const authorName = author ? Utils.getUsersNameAsString(author) : null;

  return (
    <Card className="eventCard singular card-title shadow">
      <Card.Body>
        <div>
          {imgUrl && (
            <div className="pic">
              <img src={imgUrl} alt={name} />
            </div>
          )}
          <Button
            variant="dark"
            size="sm"
            className="back-btn"
            onClick={backToEventsPage}
          >
            <FontAwesomeIcon icon={faCaretLeft} /> All Events
          </Button>
          <div className="title">
            {displayName ? displayName : "[NO EVENT NAME]"}
          </div>
          {date && <div className="date">{date}</div>}
          {likes !== undefined && (
            <div className="likes">
              <FontAwesomeIcon icon={faHeart} /> {likes}{" "}
              {likes === 1 ? "PERSON is" : "PEOPLE are"} interested in this
              event
            </div>
          )}
          <div className="main-btns">
            <Button variant="danger" size="lg" className="main-btn like-btn">
              <FontAwesomeIcon icon={faHeart} /> I am{" "}
              <strong>interested</strong> in this event!
            </Button>
            <Button variant="warning" size="lg" className="main-btn">
              <FontAwesomeIcon icon={faShare} /> <strong>Share</strong> Event
            </Button>
          </div>
        </div>
        <Container>
          <Row>
            <Col lg={5}>
              <div className="event-info">
                {time && (
                  <div>
                    <span className="property">Time: </span>
                    {time}
                  </div>
                )}
                {city && (
                  <div>
                    <span className="property">City: </span>
                    {city}
                  </div>
                )}
                {category && (
                  <div>
                    <span className="property">Category: </span>
                    {category}
                  </div>
                )}
                {authorName && (
                  <div>
                    <span className="property">Hosted By: </span>
                    {authorName}
                  </div>
                )}
                {address && (
                  <div>
                    <span className="property">Address: </span>
                    {address}
                  </div>
                )}
                <Button variant="success" className="maps-btn">
                  {" "}
                  <FontAwesomeIcon icon={faEarthAfrica} /> Open in{" "}
                  <strong>MAPS</strong>
                </Button>
              </div>
            </Col>
            <Col lg={7}>
              {desc && (
                <div>
                  <h1>Description:</h1>
                  <div className="full-desc">{desc}</div>
                </div>
              )}
            </Col>
          </Row>
        </Container>
      </Card.Body>
    </Card>
  );
};

export default EventCardSingular;
