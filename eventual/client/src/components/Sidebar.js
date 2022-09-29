import React from 'react'
import { Link } from "react-router-dom";
import { useState } from 'react'
import Register from './Register';

const Sidebar = () => {
  const [registerPopup, setRegisterPopup] = useState(false);

  return (
    <div>
    <div className="sidebarWrapper">
        <Link to="/" className="navbarItem">Home</Link>
        <Link to="/events" className="navbarItem">Events</Link>
        <Link to="/liked" className="navbarItem">Liked</Link>
        <Link to="/history" className="navbarItem">History</Link>
        <Link to="/settings" className="navbarItem">Settings</Link>
        <Link to="/dbwritetemp" className="navbarItem">DB Write</Link>
        <button onClick={() => setRegisterPopup(true)}>Register</button>
    </div>
      <div>
        <Register trigger={registerPopup} setTrigger={setRegisterPopup}/>
      </div>
    </div>
  );
};

export default Sidebar;
