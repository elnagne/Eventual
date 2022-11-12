import { useContext, useEffect, useState, useLayoutEffect } from "react";
import { useParams } from "react-router-dom";
import EventCardSingular from "./EventCardSingular";
import EventComment from "./EventComment";
import SidebarPro from "./SidebarPro";
import Alert from "react-bootstrap/Alert";
import AddComment from "./AddComment";
import { EventContext } from "./EventContext";
import { ThemeContext } from "./ThemeContext";

const Event = () => {
  const {theme} = useContext(ThemeContext);
  const { id } = useParams();
  const userId = localStorage.getItem("userid");
  const [event, setEvent] = useState([]);
  const [comments, setComments] = useState([]);
  const [loggedIn, setLoggedIn] = useState(false);
  const { commentText, setCommentText } = useContext(EventContext);

  useLayoutEffect(() => {
    fetch("http://localhost:5000/users/isUserAuth", {
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setLoggedIn(data.isLoggedIn);
      })
      .catch((err) => alert(err));
  }, []);

  useEffect(() => {
    getEvents();

    return;
  }, [id]);

  async function getEvents() {
    const response = await fetch("http://localhost:5000/search/events/" + id);

    if (!response.ok) {
      setEvent(null);
      return;
    }

    const event = await response.json();
    setComments(event.comments);
    setEvent(event);
  }

  async function addComment(e) {
    e.preventDefault();
    const response = await fetch(`http://localhost:5000/comments/addComment`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        eventId: id,
        userId: userId,
        comment: commentText,
      }),
    });

    if (!response.ok) {
      const message = `${response.statusText}`;
      window.alert(message);
      return;
    }
    getEvents();
    setCommentText("");
  }

  return (
    <div className="eventsWrapper">
      <SidebarPro />
      <div className="eventContent" data-theme={theme}>
        <div>
          <EventCardSingular event={event} id={id} />
          {loggedIn ? (
            <AddComment eventId={id} addComment={addComment} />
          ) : (
            <Alert variant="primary" className="mx-4 my-4">
              Log in to leave a comment.
            </Alert>
          )}
          {comments != null && comments.length > 0 ? (
            comments.map((userComment) => (
              <EventComment
                userid={userComment.userId}
                comment={userComment.comment}
              />
            ))
          ) : (
            <Alert variant="primary" className="mx-4 my-4">
              No comments found. You could be the first!
            </Alert>
          )}
        </div>
      </div>
    </div>
  );
};

export default Event;
