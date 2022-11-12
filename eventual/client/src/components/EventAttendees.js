import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import SidebarPro from './SidebarPro';
import Alert from 'react-bootstrap/Alert';

const EventAttendees = () => {
  const { id } = useParams();
  const [attendees, setAttendees] = useState([]);

  async function getAttendees() {
    const response = await fetch('http://localhost:5000/get-attendees/' + id);
    console.log(await (await fetch('http://localhost:5000/get-attendees/' + id)).json());
    await response.json().then((response) => { setAttendees(response); });
  }
  
  useEffect(() => {
    getAttendees();
  }, []);

  const AttendeeRow = (props) => {
    return (
      <div>
        {props.attendees.map((attendee) => { return (
            <div>this.attendee.name</div>
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
          <AttendeeRow attendees={attendees} />
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