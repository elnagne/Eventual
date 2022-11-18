import React from 'react';
// Components
import Home from './components/Home';
import Events from './components/Events';
import Event from './components/Event';
import EventNotif from './components/EventNotification';
import Liked from './components/Liked';
import History from './components/History';
import DbWriteTemp from './components/DbWriteTemp';
import AddNotification from './components/AddNotification';
import Register from './components/Register';
import AddEvents from './components/AddEvent';
import UpdateEvents from './components/UpdateEvent';
import MyEvents from './components/MyEvents';
import AttendingEvents from './components/AttendingEvents';
import LogIn from './components/LogIn';
import UserInfo from './components/UserInfo';
import ForgotPassword from './components/ForgotPassword';
import EventAttendees from './components/EventAttendees';
import ResetPassword from './components/ResetPassword';
import UserNotifications from './components/UserNotifications';
import { SearchContextProvider } from './components/SearchContext';
import { EventContextProvider } from './components/EventContext';
import { ThemeContextProvider } from './components/ThemeContext';

import Profile from './components/Profile';
// We use Route in order to define the different routes of our application
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
const App = () => {
  return (
    <ThemeContextProvider>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/events" element={<SearchContextProvider><Events /></SearchContextProvider>} />
        <Route path="/events/:id" element={<EventContextProvider><Event /></EventContextProvider>} />
        <Route path="/eventsNotif/:id" element={<EventNotif />} />
        <Route path="/liked" element={<Liked />} />
        <Route path="/history" element={<History />} />
        <Route path="/add-events" element={<AddEvents />} />
        <Route path="/add-notifications/:id" element={<AddNotification />} />
        <Route path="/update-events/:id" element={<UpdateEvents />} />
        <Route path="/event-attendees/:id" element={<EventAttendees />} />
        <Route path="/my-events" element={<MyEvents />} />
        <Route path="/attending-events" element={<AttendingEvents />} />
        <Route path="/dbwritetemp" element={<DbWriteTemp />} />
        <Route path="/login" element={<LogIn />} />
        <Route path="/register" element={<Register />} />
        <Route path="/userInfo" element={<UserInfo />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password/*" element={<ResetPassword />} />
        <Route path="/my-notifications" element={<UserNotifications />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </Router>
    </ThemeContextProvider>
  );
};
export default App;
