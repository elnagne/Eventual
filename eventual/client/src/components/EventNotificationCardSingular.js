import * as Utils from './Utils.js';
import {
  Card,
  Button,
  Container,
  Row,
  Col,
  OverlayTrigger,
  Tooltip,
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useParams } from 'react-router-dom';
import {
  faHeart,
  faShare,
  faEarthAfrica,
  faPerson,
  faCaretLeft,
  faMessage,
} from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { faHandshake } from '@fortawesome/free-solid-svg-icons';

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
  async function likeEvent() {
    // passes the id of the event
    await fetch(`http://localhost:5000/liked/add_like`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(accountEvent),
    });
    let newlikedBy = [...likedby, account_id];
    setLikedby(newlikedBy);
   
    setLikes(likes + 1);
  }
  // This method decrease the number of likes by 1
  async function dislikeEvent() {
    // passes the id of the event
    await fetch(`http://localhost:5000/liked/add_dislike`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(accountEvent),
    });
    let newlikedBy = likedby;
    newlikedBy.pop(account_id);
    setLikedby(newlikedBy);

    setLikes(likes - 1);
  }
  async function joinEvent() {
    if (num_slots - parseInt(numJoined) == 0) {
      setnNSM(
        'No spots left, please return another time when spots are available again or leave a like to keep track of the event'
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
      await fetch(`http://localhost:5000/attend/add_attendance`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(accountEvent),
      });
      let newJoinedBy = [...joinedby, account_id];
      setJoinedby(newJoinedBy);
      setNumJoined(numJoined + 1);
    }
  }
  // This method decrease the number of likes by 1
  async function notJoinEvent() {
    // passes the id of the event
    await fetch(`http://localhost:5000/attend/remove_attendance`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(accountEvent),
    });
    let newJoinedBy = joinedby;
    newJoinedBy.pop(account_id);
    setJoinedby(newJoinedBy);
    setNumJoined(numJoined - 1);
  }
  async function loadInitialValues() {
    if (event.num_likes != undefined) {
      if (firstLoad == true) {
        setFirstLoad(false);
        setLikes(event.num_likes);
        setLikedby(event.liked_by.map((user) => user.account_id));
        setNumJoined(event.num_joined);
        setJoinedby(event.attending_users.map((user) => user.account_id));
      }
    }
  }

  let navigate = useNavigate();
  function backToNotificationsPage() {
    let path = '/my-notifications';
    navigate(path);
  }

  function goToAttendeesPage() {
    let path = '/event-attendees/' + props.id;
    navigate(path);
  }

  function goToUpdatePage() {
    let path = '/update-events/' + props.id;
    navigate(path);
  }

  function goToAddNotifications() {
    let path = '/add-notifications/' + props.id;
    navigate(path);
  }

  const event = props.event;
  const [likes, setLikes] = useState(0);
  const [likedby, setLikedby] = useState([]);
  const [numJoined, setNumJoined] = useState(0);
  const [joinedby, setJoinedby] = useState([]);
  const [firstLoad, setFirstLoad] = useState(true);
  const [NoSpotsMsg, setnNSM] = useState('');
  if (!event) {
    return (
      <Card className="eventCard singular card-title shadow">
        <Card.Body>
          <Button
            variant="dark"
            size="sm"
            className="back-btn"
            onClick={backToNotificationsPage}
          >
            <FontAwesomeIcon icon={faCaretLeft} /> Notifications
          </Button>
          <h1>Sorry, that event doesn't exist.</h1>
        </Card.Body>
      </Card>
    );
  }
  const name = event.event_name;
  const displayName = name ? name.toUpperCase() : null;
  const imgUrl = event.image_url;

  const num_slots = parseInt(event.num_slots);

  const dateStr = event.date_of_event;
  const dateObj = new Date(dateStr);
  const date = dateObj.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  const timeStr = event.time_of_event;
  const timeObj = new Date('0000-01-01 ' + timeStr);
  const time = timeObj.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });

  const city = event.address_data
    ? Utils.getLocationInfoAsString(event.address_data)
    : null;

  const category = event.category;
  const address = event.location;
  const desc = event.description;

  const account_id = localStorage.getItem('userid');
  const author_id = event.author;
  const eventID = event._id;
  const accountEvent = {
    account_id: account_id,
    event_id: eventID,
  };

  const authorName = author ? Utils.getUsersNameAsString(author) : null;

  return (
    <Card className="eventCard singular card-title shadow">
      <Card.Body onLoad={loadInitialValues()}>
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
            onClick={backToNotificationsPage}
          >
            <FontAwesomeIcon icon={faCaretLeft} /> Notifications
          </Button>

          <div className="title">
            {displayName ? displayName : '[NO EVENT NAME]'}
          </div>
          {dateStr && <div className="date">{date}</div>}
          {NoSpotsMsg !== '' && <span className="alert">{NoSpotsMsg}</span>}
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
                    {' '}
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
                    {' '}
                    <FontAwesomeIcon icon={faHeart} />
                  </Button>
                </OverlayTrigger>
              )}
              {likes}
              {'     '}
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
                    {' '}
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
                    {' '}
                    <FontAwesomeIcon icon={faHandshake} />
                  </Button>
                </OverlayTrigger>
              )}
              {numJoined}
            </div>
          )}
          <div className="main-btns">
            <Button variant="warning" size="lg" className="main-btn">
              <FontAwesomeIcon icon={faShare} /> <strong>Share</strong> Event
            </Button>
            {account_id == author_id && (
              <Button
              variant="info"
              size="lg"
              onClick={goToUpdatePage}
              className="main-btn"
            >
              Update Event
            </Button>
            )}
            {account_id == author_id && (
              <Button
              variant="secondary"
              size="lg"
              onClick={goToAddNotifications}
              className="main-btn"
            >
              <FontAwesomeIcon icon={faMessage} />
              {' '} Add Notification
            </Button>
              
            )}
          </div>
        </div>
        <Container>
          <Row>
            <Col lg={5}>
              <div className="event-info">
                {num_slots !== undefined && (
                  <span>
                    <span className="property">Available Spots: </span>
                    {num_slots - parseInt(numJoined)}{' '}
                    <FontAwesomeIcon icon={faPerson} size="xxs" />
                  </span>
                )}
                {timeStr && (
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
                  {' '}
                  <FontAwesomeIcon icon={faEarthAfrica} /> Open in{' '}
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
