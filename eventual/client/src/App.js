import React from "react";
// Components
import Home from "./components/Home";
import Events from "./components/Events";
import Liked from "./components/Liked";
import History from "./components/History";
import Settings from "./components/Settings";
import DbWriteTemp from "./components/DbWriteTemp";
import Register from "./components/Register";
import AddEvents from "./components/AddEvent";
import LogIn from "./components/LogIn";
import UserInfo from "./components/userInfo";
// We use Route in order to define the different routes of our application
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/events" element={<Events />} />
        <Route path="/liked" element={<Liked />} />
        <Route path="/history" element={<History />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/add-events" element={<AddEvents />} />
        <Route path="/dbwritetemp" element={<DbWriteTemp />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/register" element={<Register />} />
        <Route path="/userInfo" element={<UserInfo />} />
      </Routes>
    </Router>
  );
};

export default App;
