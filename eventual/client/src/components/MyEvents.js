import React, { useEffect, useState, useContext } from 'react';
import Sidebar from './Sidebar';
import EventsDisplay from './EventsDisplay';
import EventsSearch from './EventsSearch';
import { SearchContext } from './SearchContext';
import Alert from 'react-bootstrap/Alert';

const Events = () => {
  const [events_authors, setEvents] = useState([]);

  const [author, setAuthor] = useState(null);

  const login_author = localStorage.getItem('userid');
  // console.log(login_author);

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

    console.log('logined author:', login_author);

    for (let i = 0; i < events.length; i++) {
      // console.log('event:', events[i]);
      // console.log('event author:', events[i].author);
      if (events[i].author == login_author) {
        console.log('event:', events[i]);
        console.log('event author:', events[i].author);
        events_authors.push(events[i]);
        console.log('event in array:', events_authors[0]);
      }
    }

    setEvents(events_authors);
  }

  return (
    <div className="eventsWrapper">
      <Sidebar />
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
