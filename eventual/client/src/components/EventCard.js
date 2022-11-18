import * as Utils from "./Utils.js";
import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Tooltip from "react-bootstrap/Tooltip";
import "./Likebtn.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHandshake } from "@fortawesome/free-solid-svg-icons";
import {
  faHeart,
  faCircleDot,
  faPerson,
  faCaretRight,
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
  const [female, setFemale] = useState([]);
  const getUserGender = async () => {
    const response = await fetch(
      "http://localhost:5000/users/get-user-info/" +
        localStorage.getItem("userid"),
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.ok) {
      await response.json().then((user) => {
        setFemale(user.female);
      });
    }
  };

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
        changedValues();
      }
      getUser();
      getUserGender();
      return;
    }
  }, [props.event.author]);

  async function likeEvent() {
    let outcome = event.woman_only && female;
    // passes the id of the event
    let newlikedBy = [...likedby, account_id];
    if (!event.woman_only || outcome) {
      await fetch(`http://localhost:5000/liked/add_like`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(accountEvent),
      });
      setLikedby(newlikedBy);

      setLikes(likes + 1);
    } else {
      alert("this is a women-friendly event");
    }
  }

  // This method decrease the number of likes by 1
  async function dislikeEvent(id) {
    // passes the id of the event
    await fetch(`http://localhost:5000/liked/add_dislike`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(accountEvent),
    });
    let newlikedBy = likedby;
    newlikedBy.pop(account_id);
    setLikedby(newlikedBy);
    setLikes(likes - 1);
  }
  async function joinEvent() {
    // passes the id of the event
    if (num_slots - parseInt(numJoined) <= 0) {
      setnNSM(
        "No spots left, please return another time when spots are available again or leave a like to keep track of the event"
      );
    }
    // check if banned
    const response = await fetch('http://localhost:5000/is-banned/' + accountEvent.event_id, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(accountEvent),
    });

    if (response.status === 403) {
      alert("You have been banned from this event.");
    } else {
      let newJoinedBy = [...joinedby, account_id];
      let outcome = event.woman_only && female;
      if (!event.woman_only || outcome) {
        if (num_slots - parseInt(numJoined) > 0){
            await fetch(`http://localhost:5000/attend/add_attendance`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(accountEvent),
          });

          setJoinedby(newJoinedBy);
          setNumJoined(numJoined + 1);
        } 
        
      } else {
        alert("this is a women-friendly event");
      }
    }
  }
  // This method decrease the number of likes by 1
  async function notJoinEvent() {
    // passes the id of the event
    await fetch(`http://localhost:5000/attend/remove_attendance`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(accountEvent),
    });
    let newJoinedBy = joinedby;
    newJoinedBy.pop(account_id);
    setJoinedby(newJoinedBy);

    setNumJoined(numJoined - 1);
  }
  async function loadInitialValues() {
    if (changesMade == true) {
      setLikes(event.num_likes);
      setLikedby(event.liked_by.map((user) => user.account_id));
      setNumJoined(event.num_joined);
      setJoinedby(event.attending_users.map((user) => user.account_id));
      setChangesMade(false);
    }
  }
  async function changedValues(){
    setChangesMade(true);
  }
  const [changesMade, setChangesMade] = useState(true);
  const event = props.event;
  const id = event._id;
  const name = event.event_name;
  const imgUrl = event.image_url;
  const desc = event.description;
  const [likes, setLikes] = useState(event.num_likes);
  const city = event.address_data ? event.address_data.locality : null;
  const address = event.location;
  const eventID = event._id;
  const [likedby, setLikedby] = useState(
    event.liked_by.map((user) => user.account_id)
  );
  const [numJoined, setNumJoined] = useState(event.num_joined);
  const [joinedby, setJoinedby] = useState(
    event.attending_users.map((user) => user.account_id)
  );
  const num_slots = parseInt(event.num_slots);
  const account_id = localStorage.getItem("userid");
  const accountEvent = {
    account_id: account_id,
    event_id: eventID,
  };
  const [NoSpotsMsg, setnNSM] = useState("");

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
    <Card className="eventCard clickable card-title shadow">
      <Card.Body onLoad={loadInitialValues()}>
        {imgUrl && (
          <div className="pic">
            <img src={imgUrl} alt={name} />
          </div>
        )}
        <Button
          variant="dark"
          size="sm"
          className="back-btn"
          onClick={redirectToEvent}
        >
          More Info <FontAwesomeIcon icon={faCaretRight} />
        </Button>

        <div>
          {name && <span className="title">{name}</span>}
          {dateStr && <span className="date">{date}</span>}
        </div>
        <div className="infoStrip">
          {timeStr && (
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
          {num_slots !== undefined && (
            <span>
              {" "}
              <FontAwesomeIcon icon={faCircleDot} size="xs" />{" "}
              <span className="property">Available Spots: </span>
              {num_slots - parseInt(numJoined)}{" "}
              <FontAwesomeIcon icon={faPerson} size="xs" />
            </span>
          )}
        </div>

        {desc && <div className="desc">{desc}</div>}
        {NoSpotsMsg !== "" && <span className="alert">{NoSpotsMsg}</span>}
        {likes !== undefined && account_id !== null && (
          <div className="likes">
            {likedby.includes(account_id) ? (
              <OverlayTrigger
                placement="top"
                delay={{ show: 200, hide: 180 }}
                overlay={<Tooltip id="button-tooltip-2">Remove Like</Tooltip>}
              >
                <Button
                  id="a"
                  variant="liked"
                  onClick={() => {
                    dislikeEvent(eventID);
                    return true;
                  }}
                >
                  {" "}
                  <FontAwesomeIcon icon={faHeart} />
                </Button>
              </OverlayTrigger>
            ) : (
              <OverlayTrigger
                placement="top"
                delay={{ show: 200, hide: 180 }}
                overlay={<Tooltip id="button-tooltip-2">Add Like</Tooltip>}
              >
                <Button
                  id="a"
                  variant="like"
                  onClick={() => {
                    likeEvent(eventID);
                    return true;
                  }}
                >
                  {" "}
                  <FontAwesomeIcon icon={faHeart} />
                </Button>
              </OverlayTrigger>
            )}
            {likes}
            {"     "}
            {joinedby.includes(account_id) ? (
              <OverlayTrigger
                placement="top"
                delay={{ show: 200, hide: 180 }}
                overlay={
                  <Tooltip id="button-tooltip-2">Remove Attendance</Tooltip>
                }
              >
                <Button
                  id="a"
                  variant="liked"
                  onClick={() => {
                    notJoinEvent(eventID);
                    return true;
                  }}
                >
                  {" "}
                  <FontAwesomeIcon icon={faHandshake} />
                </Button>
              </OverlayTrigger>
            ) : (
              <OverlayTrigger
                placement="top"
                delay={{ show: 200, hide: 180 }}
                overlay={<Tooltip id="button-tooltip-2">Join Event</Tooltip>}
              >
                <Button
                  id="a"
                  variant="like"
                  onClick={() => {
                    joinEvent(eventID);
                    return true;
                  }}
                >
                  {" "}
                  <FontAwesomeIcon icon={faHandshake} />
                </Button>
              </OverlayTrigger>
            )}
            {numJoined}
          </div>
        )}
      </Card.Body>
    </Card>
  );
};

export default EventCard;
