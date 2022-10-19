import React from "react";
import { useContext } from "react";
import { Link } from "react-router-dom";
import { useState, useLayoutEffect } from "react";
import { useNavigate } from "react-router-dom";
import Register from "./Register";
import { RegisterContext } from "./RegisterContext";

const Sidebar = () => {
  let navigate = useNavigate();

  const { isModalOpen, setModalOpen } = useContext(RegisterContext);

  const [username, setUsername] = useState(null);
  async function logout() {
    localStorage.removeItem("token");
    await navigate.push("/login");
  }
  useLayoutEffect(() => {
    fetch("/isUserAuth", {
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      //.then((data) => (data.isLooggedIn ? setUsername(data.username) : null ));
      .then((data) => {
        if (data.isLoggedIn) {
          setUsername(data.username);
          console.log("DATA :" + data);
        }
      })
      // .catch((err) => alert(err));
  }, []);
  return (
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

        {username ? (
          <div>
            <userInfo username={username} className="navbarItem"></userInfo>
            <div onClick={logout}>logout</div>
          </div>
        ) : (
          <div>
            <Link to="/login" className="navbarItem">
              Login
            </Link>
          </div>
        )}
      </div>
      <Register trigger={isModalOpen} setTrigger={setModalOpen} />
    </div>
  );
};

export default Sidebar;
