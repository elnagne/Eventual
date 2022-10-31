import React, { useEffect } from 'react';
import SidebarPro from './SidebarPro';
import { useState } from 'react';
import { Widget } from '@uploadcare/react-widget';
import Button from 'react-bootstrap/Button';
import { useParams } from 'react-router-dom';

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddNotification = () => {
  const { id } = useParams();
  console.log(id);
  const [event, setEvent] = useState(null);
  const [event_name, setEvent_name] = useState('');
  const [event_id, setEvent_id] = useState('');
  const [description, setDescription] = useState('');
  const [title, setTitle] = useState('');
  const [liked_by, setLikedBy] = useState([]);
  const [attending_users, setAttendedBy] = useState([]);

  const login_author = localStorage.getItem('userid');

  useEffect(() => {
    getEvents();
    return;
  }, []);

  async function getEvents() {
    const response = await fetch('http://localhost:5000/search/events/' + id);

    if (!response.ok) {
      setEvent(null);
      return;
    }

    const event = await response.json();
    console.log(event);
    setEvent(event);

    setEvent_name(event.event_name);
    setEvent_id(event._id);
    setLikedBy(event.liked_by);
    setAttendedBy(event.attending_users);
  }


  const onSubmit = async (e) => {
    e.preventDefault();
    toast('Notification Added!');
    await console.log(localStorage.getItem('userid'));
    console.log(login_author);
    const newNotif = {
      event_id: setEvent_id,
      title: title,
      description: description,
      liked_by: liked_by,
      attending_users: attending_users
    };

    await fetch('http://localhost:5000/notif/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newNotif),
    }).catch((error) => {
      window.alert(error);
      return;
    });

    setDescription('');
    setTitle('');
  };

  //   const namePlaceholder = event.hasOwnProperty('event_name')
  //     ? event.event_name
  //     : 'Add a name';

  return (
    <div className="dbWriteWrapper">
      <SidebarPro />
      <div className="AddEvent">
        <form
          name="notification"
          className="AddEventForm"
          encType="multipart/form-data"
          onSubmit={onSubmit}
        >
          <br />
          <br />
          <h2 className="EventTitle">Add Notification</h2>
          <div className="AddEventElement">
            <label>Event Name</label>
            <input
              className="form-control"
              type="text"
              security=""
              placeholder="Name of Events"
              value={event_name}
              onChange={(e) => setEvent_name(e.target.value)}
              disabled
            />
          </div>
          <div className="AddEventElement">
            <label>Title</label>
            <input
              className="form-control"
              type="text"
              security=""
              placeholder="Title of the notification"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
          <div className="AddEventElement">
            <label>Description</label>
            <textarea
              type="text"
              rows="6"
              className="form-control input-lg"
              placeholder="Notification body content"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <Button
            className="AddEventSubmit"
            variant="secondary"
            type="submit"
            value="send"
          >
            Add
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

export default AddNotification;
