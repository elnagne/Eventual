import React from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { useState, useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";
import Register from "./Register";
import { RegisterContext } from "./RegisterContext";
import UserInfo from "./UserInfo";
import "./registerbutton.css";
const Sidebar = () => {
  let navigate = useNavigate();

  const {isModalOpen, setModalOpen} = useContext(RegisterContext);

  const [username, setUsername] = useState(null);
  async function logout() {
    localStorage.removeItem("token");
    navigate("/login");
  }
  useLayoutEffect(() => {
    fetch("http://localhost:5000/users/isUserAuth", {
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.isLoggedIn) {
          setUsername(data.username);
        }
      })
      .catch((err) => alert(err));
  }, []);
  return username ? (
    <div>
      <div className="sidebarWrapper">
        <Link to="/" className="navbarItem">
          Home
        </Link>
        <Link to="/events" className="navbarItem">
          Events
        </Link>
        <Link to="/add-events" className="navbarItem">
          Add Events
        </Link>
        <Link to="/liked" className="navbarItem">
          Liked
        </Link>
        <Link to="/history" className="navbarItem">
          History
        </Link>
        <Link to="/settings" className="navbarItem">
          Settings
        </Link>
        <Link to="/profile" className="navbarItem">Profile</Link>

        <div>
          <div onClick={logout} className="navbarItem">
            logout
          </div>
          <UserInfo username={username} className="navbarItem"></UserInfo>
        </div>
      </div>
    </div>
  ) : (
    <div>
      <div className="sidebarWrapper">
        <Link to="/" className="navbarItem">
          Home
        </Link>
        <Link to="/events" className="navbarItem">
          Events
        </Link>
        <Link to="/add-events" className="navbarItem">
          Add Events
        </Link>
        <Link to="/liked" className="navbarItem">
          Liked
        </Link>
        <Link to="/history" className="navbarItem">
          History
        </Link>
        <Link to="/settings" className="navbarItem">
          Settings
        </Link>
        <button onClick={() => setModalOpen(true)}>Register</button>
        <Link to="/login" className="navbarItem">
          Login
        </Link>
      </div>
      <Register trigger={isModalOpen} setTrigger={setModalOpen}/>
    </div>
  )
}

export default Sidebar