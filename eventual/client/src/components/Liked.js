import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Sidebar from './Sidebar'
const Events = (props) => (
 <tr>
   <td>{props.testEvents._id}</td>
   <td>{props.testEvents.event_name}</td>
   <td>{props.testEvents.description}</td>
   <td>
   <Link className="btn btn-link" to={`/edit/${props.testEvents._id}`}>Edit</Link> |
     <button className="btn btn-link">
       Delete
     </button>
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
 // This method will delete a record
 async function deleteEvent(id) {
  await fetch(`http://localhost:5000/${id}`, {
    method: "DELETE"
  });

  const newRecords = events.filter((el) => el._id !== id);
  setEvents(newRecords);
}
  
 // This method will map out the records on the table
 function eventsList() {
   return events.map((testEvents) => {
     return (
       <Events
       testEvents={testEvents}
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
                <th>_id</th>
                <th>author</th>
                <th>description</th>
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