import React from "react";
import EventCard from "./EventCard";
import Alert from 'react-bootstrap/Alert';

const EventsDisplay = (props) => {
  return (
    <div>
      {props.events.length > 0 ? props.events.map((event) => { return <EventCard event={event} /> })
                               : <Alert variant='primary' className="mx-4 my-4">No events found.</Alert>
      }
    </div>
  );
};

export default EventsDisplay;
