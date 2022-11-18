import React, { useEffect, useState, useContext } from 'react';
import SidebarPro from './SidebarPro';
import EventsDisplay from './EventsDisplay';
import EventsSearch from './EventsSearch';
import { SearchContext } from './SearchContext';
import { ThemeContext } from "./ThemeContext";
import Alert from 'react-bootstrap/Alert';

var date = new Date();
var today = new Date(date.getFullYear(), date.getMonth(), date.getDate());

const Events = () => {
  const {theme} = useContext(ThemeContext);

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

    for (let i = 0; i < events.length; i++) {
      for (let j = 0; j < events[i].attending_users.length; j++) {
        let attendence = events[i].attending_users[j].account_id;
        if (attendence == login_author) {
          let event_date = new Date(events[i].date_of_event);
          if (typeof event_date != 'undefined') {
            if (new Date(today).getTime() > new Date(event_date).getTime()) {
              events_authors.push(events[i]);
            }
          }
        }
      }
    }

    setEvents(events_authors);
  }

  return (
    <div className="eventsWrapper">
      <SidebarPro />
      <div className="eventContent" data-theme={theme}>
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
