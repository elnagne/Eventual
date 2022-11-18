import React, { useEffect } from "react";
import SidebarPro from "./SidebarPro";
import { useState, useContext } from "react";
import { Widget } from "@uploadcare/react-widget";
import Button from "react-bootstrap/Button";
import { useParams } from "react-router-dom";
import { ThemeContext } from "./ThemeContext";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UpdateEvent = () => {
  const {theme} = useContext(ThemeContext);
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [event_name, setEvent_name] = useState("");
  const [author, setAuthor] = useState(null);
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [date_of_event, setDate_of_event] = useState("");
  const [time_of_event, setTime_of_event] = useState("");
  const [num_slots, setNum_slots] = useState(0);
  const [woman_only, setWoman_only] = useState(false);
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState("");
  const [num_likes, setNum_likes] = useState(0);
  const [num_joined, setNum_joined] = useState(0);
  const [liked_by, setLiked_by] = useState(null);
  const [attending_users, setAttending_users] = useState(null);
  const [comments, setComments] = useState(null);
  const [banlist, setBanlist] = useState(null);

  const login_author = localStorage.getItem("userid");

  useEffect(() => {
    getEvents();
    return;
  }, []);

  async function getEvents() {
    const response = await fetch("http://localhost:5000/search/events/" + id);

    if (!response.ok) {
      setEvent(null);
      return;
    }

    const event = await response.json();

    setEvent(event);

    setEvent_name(event.event_name);
    setDescription(event.description);
    setImage(event.image_url);
    setEmail(event.email);
    setPhone(event.phone);
    setDate_of_event(event.date_of_event);
    setTime_of_event(event.time_of_event);
    setNum_slots(event.num_slots);
    setWoman_only(event.woman_only);
    setLocation(event.location);
    setCategory(event.category);
    setNum_likes(event.num_likes);
    setNum_joined(event.num_joined);
    setLiked_by(event.liked_by);
    setAttending_users(event.attending_users);
    setComments(event.comments);
    setBanlist(event.banlist);
  }

  const handleCheck = () => {
    setWoman_only(true);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    toast("You Updated Your Event!");
    await console.log(localStorage.getItem("userid"));
    await setAuthor(login_author);

    const newEvent = {
      event_name: event_name,
      author: login_author,
      description: description,
      image_url: image,
      phone: phone,
      email: email,
      date_of_event: date_of_event,
      time_of_event: time_of_event,
      num_slots: num_slots,
      woman_only: woman_only,
      location: location,
      category: category,
      num_likes: num_likes,
      num_joined: num_joined,
      liked_by: liked_by,
      attending_users: attending_users,
      comments: comments,
      banlist: banlist,
    };

    await fetch("http://localhost:5000/testEvents/update/" + id, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newEvent),
    }).catch((error) => {
      window.alert(error);
      return;
    });

    setEvent_name("");
    setDescription("");
    setImage(null);
    setEmail("");
    setPhone("");
    setDate_of_event("");
    setTime_of_event("");
    setNum_slots(0);
    setWoman_only("");
    setLocation("");
    setCategory("");
    setBanlist(event.banlist);
    window.location.reload();
  };

  //   const namePlaceholder = event.hasOwnProperty('event_name')
  //     ? event.event_name
  //     : 'Add a name';

  return (
    <div className="dbWriteWrapper">
      <SidebarPro />
      <div className="AddEvent" data-theme={theme}>
        <form
          name="event"
          className="AddEventForm"
          encType="multipart/form-data"
          onSubmit={onSubmit}
        >
          <br />
          <br />
          <h2 className="EventTitle">Update Event</h2>
          <div className="AddEventElement">
            <label>Event Name</label>
            <input
              className="form-control"
              type="text"
              security=""
              placeholder="Name of Events"
              value={event_name}
              required
              onChange={(e) => setEvent_name(e.target.value)}
            />
          </div>
          <div className="AddEventElement">
            <label>Description</label>
            <textarea
              type="text"
              rows="6"
              className="form-control input-lg"
              placeholder="Enter Description"
              value={description}
              required
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <p>
            <label htmlFor="file">Your file:</label>{" "}
            <Widget
              publicKey="6092add1783f1344a4e4"
              type="hidden"
              role="uploadcare-uploader"
              name="my_file"
              id="uploadcare-file"
              value={image}
              required
              onChange={(info) => {

                setImage(info.cdnUrl);
              }}
            />
          </p>
          <div className="AddEventElement">
            <label>Phone</label>
            <input
              class="form-control"
              type="text"
              placeholder="Enter Phone"
              value={phone}
              required
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div className="AddEventElement">
            <label>Email</label>
            <input
              class="form-control"
              type="text"
              placeholder="Enter Email"
              value={email}
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="AddEventElement">
            <label>Date</label>
            <input
              class="form-control"
              type="date"
              placeholder="Enter Date"
              value={date_of_event}
              onChange={(e) => setDate_of_event(e.target.value)}
            />
          </div>
          <div className="AddEventElement">
            <label>Time</label>
            <input
              class="form-control"
              type="time"
              placeholder="Enter Time"
              value={time_of_event}
              required
              onChange={(e) => setTime_of_event(e.target.value)}
            />
          </div>
          <div className="AddEventElement">
            <label>Address</label>
            <input
              class="form-control"
              type="location"
              placeholder="Enter a valid address"
              value={location}
              required
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
          <label>Category</label>
          <select
            class="form-control"
            className="AddEventElement"
            value={category}
            required
            onChange={(e) => setCategory(e.target.value)}
          >
            <option>Sport</option>
            <option>Entertainment</option>
            <option>Board Game</option>
            <option>Concert</option>
            <option>Charity</option>
          </select>

          <div className="AddEventElement">
            <label>Number of Slots Available</label>
            <input
              class="form-control"
              type="number"
              placeholder="Enter Number of Slots"
              value={num_slots}
              required
              onChange={(e) => setNum_slots(e.target.value)}
            />
          </div>
          <div className="form-group form-check">
            <label className="form-check-label">Woman Only?</label>
            <input
              type="checkbox"
              className="form-check-input"
              value={woman_only}
              onChange={handleCheck}
            />
          </div>
          <Button
            className="AddEventSubmit"
            variant="secondary"
            type="submit"
            value="send"
          >
            Update
          </Button>
          <br />
          <br />
          <br />
          <br />
          <ToastContainer />
        </form>
      </div>
    </div>
  );
};

export default UpdateEvent;
