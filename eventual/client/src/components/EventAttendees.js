import React, { useEffect, useState, useParams } from 'react';
import SidebarPro from './SidebarPro';
import Alert from 'react-bootstrap/Alert';

const EventAttendees = () => {
  const { id } = useParams();
  const [attendees, setAttendees] = useState([]);

  async function getAttendees() {
    const response = await fetch('http://localhost:5000/get-attendees/' + id);

    setAttendees(await response.json());

    for (let i = 0; i < attendees.length; i++) {
      
    }
  }
  
  useEffect(() => {
    getAttendees();
    return;
  });

  const AttendeeRow = (props) => {
    return (
      <div>
        {props.attendee.map((attendee) => { return (
          <div/> 
          // put username and name
          // button that calls function with username as argument
      )})}
      </div>
    );
  };

  return (
    <div className="attendeeWrapper">
      <SidebarPro />
      <div className="attendeeContent">
        {attendees.length > 0 ? (
          <AttendeeRow attendee={attendees} />
        ) : (
          <Alert variant="primary" className="mx-4 my-4">
            No attendees found.
          </Alert>
        )}
      </div>
    </div>
  );
};

export default EventAttendees;
