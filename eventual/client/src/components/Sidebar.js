import React from 'react'
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="sidebarWrapper">
        <Link to="/" className="navbarItem">Home</Link>
        <Link to="/events" className="navbarItem">Events</Link>
        <Link to="/liked" className="navbarItem">Liked</Link>
        <Link to="/history" className="navbarItem">History</Link>
        <Link to="/settings" className="navbarItem">Settings</Link>
        <Link to="/dbwritetemp" className="navbarItem">DB Write</Link>
        <Link to="/register" className="navbarItem">Register</Link>
    </div>
  )
}

export default Sidebar