import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import SidebarPro from './SidebarPro';
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Alert from 'react-bootstrap/Alert';

const EventAttendees = () => {
  const { id } = useParams();
  const [attendees, setAttendees] = useState([]);

  async function getAttendees() {
    const response = await fetch('http://localhost:5000/get-attendees/' + id);
    await response.json().then((response) => { setAttendees(response); });
  }
  
  useEffect(() => {
    getAttendees().then(console.log(attendees));
  }, []);

  const AttendeeRow = (props) => {
    return (
      <div>
        {props.attendees.map((attendee) => { return (
          <Row key={attendee.username}>
            <Col>{attendee.name}</Col>
            <Col>{attendee.username}</Col>
            <ButtonGroup as={Col}>
              <Button variant="warning" type="submit" className="col-2" onClick={async () => {
                const response = await fetch('http://localhost:5000/remove-attendee/' + id, {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify(attendee),
                });
                if (response.modifiedCount > 0) { this.parentNode.remove() }
              }}>Remove</Button>
              <Button variant="danger" type="submit" className="col-2" onClick={async () => {
                
              }}>Ban</Button>
            </ButtonGroup>
          </Row>
        )})}
      </div>
    );
  };

  return (
    <div className="d-flex">
      <SidebarPro />
      <Col className="col-xs-12 col-sm-12 col-md-10 p-5">
        <h2>Attendees</h2>
        {attendees.length > 0 ? (
          <AttendeeRow attendees={attendees} />
        ) : (
          <Alert variant="primary" className="mx-4 my-4">
            No attendees found.
          </Alert>
        )}
      </Col>
    </div>
  );
};

export default EventAttendees;