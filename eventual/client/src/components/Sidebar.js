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
    </div>
  )
}

export default Sidebar