import React, { useEffect, useState, useContext } from "react";
import SidebarPro from "./SidebarPro";
import EventsDisplay from "./EventsDisplay";
import EventsSearch from "./EventsSearch";
import { SearchContext } from './SearchContext';
import { ThemeContext } from "./ThemeContext";
import Alert from 'react-bootstrap/Alert';

const Events = () => {
  const {
    activeFilters,
    womanOnly,
    startDate,
    endDate,
    orderby,
    city
  } = useContext(SearchContext);
  const {theme} = useContext(ThemeContext);
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
    setEvents(events);
  }

  async function getFilteredEvents() {
    let filtersArray = Object.keys(activeFilters).filter(k => activeFilters[k] == true);

    const response = await fetch(`http://localhost:5000/search/filteredSearch`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ filters: filtersArray, womanOnly: womanOnly, startDate: startDate, endDate: endDate, city: city, orderby:orderby }),
    });

    if (!response.ok) {
      const message = `${response.statusText}`;
      window.alert(message);
      return;
    }

    const events = await response.json();
    setEvents(events);
  }
  
  return (
    <div className="eventsWrapper">
      <SidebarPro />
      <div className="eventContent" data-theme={theme}>
        <EventsSearch search={getFilteredEvents} />
        {events.length > 0 ? <EventsDisplay events={events} /> : <Alert variant='primary' className="mx-4 my-4">No events found.</Alert>}
      </div>
    </div>
  );
};

export default Events;
