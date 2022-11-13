import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import SidebarPro from './SidebarPro';
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
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
          <Row key={attendee.username} id={attendee.username}>
            <Col className="border-end"><span>{attendee.name}</span></Col>
            <Col className="border-end"><span>{attendee.username}</span></Col>
            <ButtonGroup as={Col} className="mb-3">
              <Button variant="warning" type="submit" className="col-2" onClick={async () => {
                const response = await fetch('http://localhost:5000/remove-attendee/' + id, {
                  method: "POST",
                  headers: { "Content-Type": "application/json", },
                  body: JSON.stringify(attendee),
                })

                const result = await response.json();

                if (result.modifiedCount > 0) { document.getElementById(attendee.username).remove(); }
              }}>Remove</Button>
              <Button variant="danger" type="submit" className="col-2" onClick={async () => {
                const response = await fetch('http://localhost:5000/ban-attendee/' + id, {
                  method: "POST",
                  headers: { "Content-Type": "application/json", },
                  body: JSON.stringify(attendee),
                })
                
                const result = await response.json();

                if (result.modifiedCount > 0) { document.getElementById(attendee.username).remove(); }
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
      <Container>
        <Col className="col-xs-12 col-sm-12 col-md-10 p-5">
          <h2 className="fw-bold text-secondary pb-2">Attendees</h2>
          {attendees.length > 0 ? (
            <AttendeeRow attendees={attendees} />
          ) : (
            <Alert variant="primary" className="mx-4 my-4">
              No attendees found.
            </Alert>
          )}
        </Col>
      </Container>
    </div>
  );
};

export default EventAttendees;