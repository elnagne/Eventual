import React from 'react';
import SidebarPro from './SidebarPro';
import { useState, useContext } from 'react';
import { Widget } from '@uploadcare/react-widget';
import Button from 'react-bootstrap/Button';
import { ThemeContext } from "./ThemeContext";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddEvent = () => {
  const {theme} = useContext(ThemeContext);
  const [event_name, setEvent_name] = useState('');
  const [author, setAuthor] = useState(null);
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [date_of_event, setDate_of_event] = useState('');
  const [time_of_event, setTime_of_event] = useState('');
  const [num_slots, setNum_slots] = useState(0);
  const [woman_only, setWoman_only] = useState(false);
  const [location, setLocation] = useState('');
  const [category, setCategory] = useState('');

  const login_author = localStorage.getItem('userid');

  const handleCheck = () => {
    setWoman_only(true);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    toast('You added an Event!');
    await console.log(localStorage.getItem('userid'));
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
    };

    await fetch('http://localhost:5000/testEvents/add', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newEvent),
    }).catch((error) => {
      window.alert(error);
      return;
    });

    setEvent_name('');
    setDescription('');
    setImage(null);
    setEmail('');
    setPhone('');
    setDate_of_event('');
    setTime_of_event('');
    setNum_slots(0);
    setWoman_only('');
    setLocation('');
    setCategory('');
    window.location.reload();
  };

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
          <h2 className="EventTitle">Add Event</h2>
          <div className="AddEventElement">
            <label>Event Name</label>
            <input
              className="form-control"
              type="text"
              security=""
              placeholder="Enter Event Title"
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
            <label htmlFor="file">Your file:</label>{' '}
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
              required
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
            Submit
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

export default AddEvent;
