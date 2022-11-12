import React, { useEffect, useState, useContext } from 'react';
import SidebarPro from './SidebarPro';
import EventsDisplay from './EventsDisplay';
import EventsSearch from './EventsSearch';
import { SearchContext } from './SearchContext';
import Alert from 'react-bootstrap/Alert';

const Events = () => {
  const [events_authors, setEvents] = useState([]);

  const [author, setAuthor] = useState(null);

  const login_author = localStorage.getItem('userid');


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

    const events_authors = [];

    const events = await response.json();

    await setAuthor(localStorage.getItem('userid'));

    for (let i = 0; i < events.length; i++) {

      if (events[i].author == login_author) {
        events_authors.push(events[i]);

      }
    }

    setEvents(events_authors);
  }

  return (
    <div className="eventsWrapper">
      <SidebarPro />
      <div className="eventContent">
        {events_authors.length > 0 ? (
          <EventsDisplay events={events_authors} />
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
