import React, { useEffect, useState, useContext, useParams } from 'react';
import SidebarPro from './SidebarPro';
import { SearchContext } from './SearchContext';
import Alert from 'react-bootstrap/Alert';

const Attendees = () => {
  const { id } = useParams();
  const [attendees, setAttendees] = useState([]);

  const [author, setAuthor] = useState(null);

  const login_author = localStorage.getItem('userid');
  // console.log(login_author);

  useEffect(() => {
    getAttendees();
    return;
  }, []);

  async function getAttendees() {
    const response = await fetch('http://localhost:5000/get-attendees/' + id);

    const events_authors = [];

    const attendees = await response.json();

    setAttendees(attendees);

    await setAuthor(localStorage.getItem('userid'));

    for (let i = 0; i < attendees.length; i++) {
      
    }
  }

  return (
    <div className="eventsWrapper">
      <SidebarPro />
      <div className="eventContent">
        {attendees.length > 0 ? (
          <div>attendees.</div>
        ) : (
          <Alert variant="primary" className="mx-4 my-4">
            No attendees found.
          </Alert>
        )}
      </div>
    </div>
  );
};

export default Attendees;
