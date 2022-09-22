import React from "react";

// Components
import Home from './components/Home';
import Events from './components/Events';
import Liked from './components/Liked';
import History from './components/History';
import Settings from './components/Settings';

// We use Route in order to define the different routes of our application
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";

const App = () => {
 return (
   <Router>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/events" element={<Events/>}/>
        <Route path="/liked" element={<Liked/>}/>
        <Route path="/history" element={<History/>}/>
        <Route path="/settings" element={<Settings/>}/>
      </Routes>
   </Router>
 );
};

export default App;