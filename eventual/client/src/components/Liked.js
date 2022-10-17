import React, { useEffect, useState } from "react";
import Sidebar from "./Sidebar";
import EventsDisplay from "./EventsDisplay";

const LikedEvents = () => {
  const [events, setEvents] = useState([]);
  const logged_account_id = "632c889ad56e85f52f50ac78";
  useEffect(() => {
    async function getEvents() {
      const response = await fetch(`http://localhost:5000/search/liked/${logged_account_id}`);

      if (!response.ok) {
        const message = `${response.statusText}`;
        window.alert(message);
        return;
      }

      const events = await response.json();
      setEvents(events);
    }

    getEvents();

    return;
  }, [events.length]);

  return (
    <div className="eventsWrapper">
      <Sidebar />
      <div className="eventContent">
        <EventsDisplay events={events} />
      </div>
    </div>
  );
};

export default LikedEvents;