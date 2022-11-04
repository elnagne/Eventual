import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import EventCardSingular from "./EventNotificationCardSingular";
import SidebarPro from "./SidebarPro";

const Event = () => {
  const { id } = useParams();
  const [event, setEvent] = useState([]);

  useEffect(() => {
    async function getEvents() {
      const response = await fetch('http://localhost:5000/search/events/' + id);

      if (!response.ok) {
        setEvent(null);
        return;
      }

      const event = await response.json();
      console.log(event);
      setEvent(event);
    }

    getEvents();

    return;
  }, [id]);

  return (
    <div className="eventsWrapper">
      <SidebarPro />
      <div className="eventContent">
        <div>
          <EventCardSingular event={event} id={id} />
        </div>
      </div>
    </div>
  );
};

export default Event;
