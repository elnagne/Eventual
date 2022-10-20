import * as Utils from "./Utils.js";
import { Card, Button, Container, Row, Col,OverlayTrigger,Tooltip } from "react-bootstrap";
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
  async function likeEvent(id) {
    // passes the id of the event
    await fetch(`http://localhost:5000/liked/add_like`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
      },
        body:JSON.stringify(accountEvent)
      });
      let newlikedBy =[...likedby, account_id];
      setLikedby((newlikedBy));
      console.log(likedby.toString());
      console.log(newlikedBy.toString());
      setLikes(likes+1);
  }
  
  // This method decrease the number of likes by 1
  async function dislikeEvent(id) {
    // passes the id of the event
    await fetch(`http://localhost:5000/liked/add_dislike`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
      },
        body:JSON.stringify(accountEvent),
      });
      let newlikedBy =likedby;
      newlikedBy.pop(account_id);
      setLikedby(newlikedBy);
      console.log(likedby.toString());
      console.log(newlikedBy.toString());
    setLikes(likes-1)
  }
  const event = props.event;
  const [likes, setLikes] = useState(0);
  const [likedby, setLikedby]= useState([]);
  if (!event) {
    return (
      <Card className="eventCard singular card-title shadow" border="dark">
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
  const startTimeObj = event.startTime;
  const startTime = new Date(startTimeObj);
  const endTime = new Date(event.endTime);
  const date = startTime.toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const startTimeStr = startTime.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  const endTimeStr = endTime.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
  const city = event.city;
  const category = event.category;
  const address = event.location;
  const desc = event.description;

  const account_id = "632c889ad56e85f52f50ac78";
  const eventID = event._id;
  const accountEvent = {
    account_id: account_id,
    event_id: eventID
  }

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
          <div className="title">{displayName ? displayName : "[NO EVENT NAME]"}</div>
          {startTimeObj && <div className="date">{date}</div>}
          {likes !== undefined && (
            <div className="likes">
            {likedby.includes(account_id)
            ?
                <OverlayTrigger
                placement="top"
                delay={{ show: 200, hide: 180}}
                overlay={<Tooltip id="button-tooltip-2">Remove Like</Tooltip>}
              >
              <Button id = "a" variant="liked" 
              onClick={() => {
                dislikeEvent(eventID);
                return true
              }}
              > <FontAwesomeIcon icon={faHeart} />
              </Button>
              </OverlayTrigger>
              :
              <OverlayTrigger
                placement="top"
                delay={{ show: 200, hide: 180}}
                overlay={<Tooltip id="button-tooltip-2">Add Like</Tooltip>}
              >
              <Button id = "a" variant="like" 
              onClick={() => {
                likeEvent(eventID);
                return true
              }}
              > <FontAwesomeIcon icon={faHeart} />
              </Button>
              </OverlayTrigger>
            }
            {likes}{" "}
            {likes === 1 ? "person is" : "people are"} interested in this event
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
                {startTimeObj && (
                  <div>
                    <span className="property">Time: </span>
                    {startTimeStr} - {endTimeStr}
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
