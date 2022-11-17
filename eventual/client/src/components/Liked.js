import React, { useEffect, useState } from "react";
import SidebarPro from "./SidebarPro";
import EventsDisplay from "./EventsDisplay";

const LikedEvents = () => {
  const [events, setEvents] = useState([]);
  const logged_account_id = localStorage.getItem("userid");
  useEffect(() => {
    async function getEvents() {
      const response = await fetch(`http://localhost:5000/search/liked/${logged_account_id}`);

      if (!response.ok) {
        const message = `${response.statusText}`;
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
      <SidebarPro />
      <div className="eventContent">
        <EventsDisplay events={events} />
      </div>
    </div>
  );
};

export default LikedEvents;