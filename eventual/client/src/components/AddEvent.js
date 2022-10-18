import React from 'react';
import Sidebar from './Sidebar';
import { useState } from 'react';

import Button from 'react-bootstrap/Button';

const today = new Date();

const AddEvent = () => {
  const [event_name, setEvent_name] = useState('');
  const [description, setDescription] = useState('');
  const [date_of_event, setDate_of_event] = useState('');
  const [time_of_event, setTime_of_event] = useState('');
  const [num_slots, setNum_slots] = useState(0);
  const [woman_only, setWoman_only] = useState(false);
  const [location, setLocation] = useState('');
  const [category, setCategory] = useState('');

  const handleCheck = () => {
    setWoman_only(true);
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const newEvent = {
      event_name: event_name,
      description: description,
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
  };

  return (
    <div className="dbWriteWrapper">
      <Sidebar />
      <div className="AddEvent">
        <form className="AddEventForm" onSubmit={onSubmit}>
          <h2 className="EventTitle">Add Event</h2>
          <div class="form-group" className="AddEventElement">
            <label>Event Name</label>
            <input
              class="form-control"
              type="text"
              placeholder="Enter Event Title"
              value={event_name}
              onChange={(e) => setEvent_name(e.target.value)}
            />
          </div>
          <div class="form-group" className="AddEventElement">
            <label>Description</label>
            <textarea
              type="text"
              rows="6"
              class="form-control input-lg"
              placeholder="Enter Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
          <div class="form-group" className="AddEventElement">
            <label>Date</label>
            <input
              class="form-control"
              type="date"
              placeholder="Enter Date"
              value={date_of_event}
              onChange={(e) => setDate_of_event(e.target.value)}
            />
          </div>
          <div class="form-group" className="AddEventElement">
            <label>Time</label>
            <input
              class="form-control"
              type="time"
              placeholder="Enter Time"
              value={time_of_event}
              onChange={(e) => setTime_of_event(e.target.value)}
            />
          </div>
          <div class="form-group" className="AddEventElement">
            <label>Location</label>
            <input
              class="form-control"
              type="location"
              placeholder="Enter Location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
          <label>Category</label>
          <select
            class="form-control"
            className="AddEventElement"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option>Sport</option>
            <option>Entertainment</option>
            <option>Indoor Game</option>
            <option>Concert</option>
            <option>Charity</option>
          </select>

          <div class="form-group" className="AddEventElement">
            <label>Number of Slots Available</label>
            <input
              class="form-control"
              type="number"
              placeholder="Enter Number of Slots"
              value={num_slots}
              onChange={(e) => setNum_slots(e.target.value)}
            />
          </div>
          <div class="form-group form-check">
            <label class="form-check-label">Woman Only?</label>
            <input
              type="checkbox"
              class="form-check-input"
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
        </form>
      </div>
    </div>
  );
};

export default AddEvent;
