import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import EventCardSingular from "./EventCardSingular";
import Sidebar from "./Sidebar";

const Event = () => {
  const { id } = useParams();
  const [event, setEvent] = useState([]);

  useEffect(() => {
    async function getEvents() {
      const response = await fetch("http://localhost:5000/search/events/" + id);

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
      <Sidebar />
      <div className="eventContent">
        {/* <h1>{id}</h1> */}
        <div>
          <EventCardSingular event={event} />
        </div>
      </div>
    </div>
  );
};

export default Event;
