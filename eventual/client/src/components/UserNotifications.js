import React, { useEffect, useState } from "react";
import SidebarPro from "./SidebarPro";
import NotificationsDisplay from "./NotificationsDisplay";

const MyNotifications = () => {
  const [events, setEvents] = useState([]);
  const logged_account_id = localStorage.getItem("userid");
  useEffect(() => {
    async function getEvents() {
      const response = await fetch(`http://localhost:5000/search/my-notifications/${logged_account_id}`);

      if (!response.ok) {
        const message = `${response.statusText}`;
        return;
      }

      const events = await response.json();
      console.log(events);
      console.log(logged_account_id);
      setEvents(events);
    }

    getEvents();

    return;
  }, [events.length]);

  return (
    <div className="eventsWrapper">
      <SidebarPro />
      <div className="eventContent">
        <NotificationsDisplay events={events} />
      </div>
    </div>
  );
};

export default MyNotifications;