import { useEffect, useContext } from 'react';
import SidebarPro from './SidebarPro';
import { useState } from 'react';
import { Widget } from '@uploadcare/react-widget';
import Button from 'react-bootstrap/Button';
import { useParams } from 'react-router-dom';
import { ThemeContext } from "./ThemeContext";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddNotification = () => {
  const {theme} = useContext(ThemeContext);
  const { id } = useParams();

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

    var currentdate = new Date(); 
    var datetime = currentdate.getDate() + "/"
                + (currentdate.getMonth()+1)  + "/" 
                + currentdate.getFullYear()  + " "
                + currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds();
    const newNotif = {
      event_id: event_id,
      title: title,
      description: description,
      liked_by: liked_by,
      attending_users: attending_users,
      event_name: event_name,
      time_created:datetime,
    };
    const newNotifMail = {
      subject: event_name,
      text:description,
    };
    await fetch('http://localhost:5000/receive-response/' + event_id,{
      method:'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newNotifMail),
    }).catch((error) => {
      window.alert(error);
      return;
    });;

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
      <div className="AddNotif" data-theme={theme}>
        <form
          name="notification"
          className="AddNotifForm"
          encType="multipart/form-data"
          onSubmit={onSubmit}
        >
          <h2 className="NotificationTitle">Add Notification</h2>
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
          <ToastContainer />
        </form>
      </div>
    </div>
  );
};

export default AddNotification;
