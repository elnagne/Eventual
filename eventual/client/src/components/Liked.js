import React, { useEffect, useState } from "react";
import Button from 'react-bootstrap/Button';
import Sidebar from './Sidebar'
const Events = (props) => (
 <tr>
   <td>{props.testEvents.event_name}</td>
   <td>{props.testEvents.description}</td>
   <td>{props.testEvents.num_likes}</td>
   <td>
   <Button variant="outline-primary"
        onClick={() => {
          props.likeEvent(props.testEvents._id)
        }}
      > Like 
    </Button>{'  '}
   <Button variant="outline-danger"
        onClick={() => {
          props.dislikeEvent(props.testEvents._id)
        }}
      > Dislike 
    </Button>
   </td>
 </tr>
);
 
export default function EventList() {
 const [events, setEvents] = useState([]);
 
 // This method fetches the records from the database.
 useEffect(() => {
   async function getEvents() {
     const response = await fetch(`http://localhost:5000/liked/`);
 
     if (!response.ok) {
       const message = `Oh nyo T-T: ${response.statusText}`;
       window.alert(message);
       return;
     }
 
     const events = await response.json();
     setEvents(events);
   }
 
   getEvents();
 
   return;
 }, [events.length]);

 // This method increase the number of likes by 1
 async function likeEvent(id) {
  await fetch(`http://localhost:5000/liked/add_like/${id}`, {
      method: "POST"
    });
  window.location.reload(false);
}

// This method decrease the number of likes by 1
async function dislikeEvent(id) {
  await fetch(`http://localhost:5000/liked/add_dislike/${id}`, {
      method: "POST"
    });
  window.location.reload(false);
}
  
 // This method will map out the records on the table
 function eventsList() {
   return events.map((testEvents) => {
     return (
       <Events
       testEvents={testEvents}
       likeEvent={() => likeEvent(testEvents._id)}
       dislikeEvent={() => dislikeEvent(testEvents._id)}
       key={testEvents._id}
       />
     );
   });
 }
 
 // This following section will display the table with the records of individuals.
 return (
  <div className="eventsWrapper">
        <Sidebar/>
        <div className="eventContent">
        <div>
     <h3>Event List</h3>
          <table className="table table-striped" style={{ marginTop: 20 }}>
            <thead>
              <tr>
                <th>Event Name</th>
                <th>Description</th>
                <th>Number of Likes</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>{eventsList()}</tbody>
          </table>
        </div>
        </div>
    </div>

 );
}