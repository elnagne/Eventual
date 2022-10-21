import React, { useEffect, useState, useContext } from 'react';
import Sidebar from './Sidebar';
import EventsDisplay from './EventsDisplay';
import EventsSearch from './EventsSearch';
import { SearchContext } from './SearchContext';
import Alert from 'react-bootstrap/Alert';

const Events = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    getEvents();
    return;
  }, []);

  async function getEvents() {
    const response = await fetch(`http://localhost:5000/search/`);

    if (!response.ok) {
      const message = `${response.statusText}`;
      window.alert(message);
      return;
    }

    const events = await response.json();

    for (let i = 0; i < events.length; i++) {
      console.log(events[i]);
    }

    setEvents(events);
  }

  return (
    <div className="eventsWrapper">
      <Sidebar />
      <div className="eventContent">
        {events.length > 0 ? (
          <EventsDisplay events={events} />
        ) : (
          <Alert variant="primary" className="mx-4 my-4">
            No events found.
          </Alert>
        )}
      </div>
    </div>
  );
};

export default Events;
