import React from "react";
import EventCard from "./EventCard";

const EventsDisplay = (props) => {
  return (
    <div>
      {props.events.map((event) => { return <EventCard event={event} /> })}
    </div>
  );
};

export default EventsDisplay;
