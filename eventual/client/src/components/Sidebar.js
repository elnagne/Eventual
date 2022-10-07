import React from 'react'
import { useContext } from 'react';
import { Link } from "react-router-dom";
import Register from './Register';
import { RegisterContext } from './RegisterContext';

const Sidebar = () => {
  const {isModalOpen, setModalOpen} = useContext(RegisterContext);

  return (
    <div>
    <div className="sidebarWrapper">
        <Link to="/" className="navbarItem">Home</Link>
        <Link to="/events" className="navbarItem">Events</Link>
        <Link to="/events" className="navbarItem">Events</Link>
        <Link to="/events" className="navbarItem">Events</Link>
        <Link to="/liked" className="navbarItem">Liked</Link>
        <Link to="/history" className="navbarItem">History</Link>
        <Link to="/settings" className="navbarItem">Settings</Link>
        <Link to="/dbwritetemp" className="navbarItem">DB Write</Link>
        <button onClick={() => setModalOpen(true)}>Register</button>
        <Link to="/login" className='navbarItem'>Login</Link>
    </div>
        <Register trigger={isModalOpen} setTrigger={setModalOpen}/>
    </div>
  );
};

export default Sidebar;

export default Sidebar