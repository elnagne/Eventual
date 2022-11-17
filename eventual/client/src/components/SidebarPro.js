import React from 'react';
import useLocalStorage from 'use-local-storage'
import { useState, useContext, useLayoutEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { RegisterContext } from './RegisterContext';
import { ThemeContext } from "./ThemeContext";
import Register from './Register';
import UserInfo from './UserInfo';

// Imports for ProSidebar
import {
  ProSidebar,
  Menu,
  MenuItem,
  SidebarHeader,
  SidebarFooter,
  SidebarContent,
} from 'react-pro-sidebar';
import sidebarBg from './Purple-Color-Wallpaper.jpg';
import './Sidebar.css';
import 'react-pro-sidebar/dist/css/styles.css';

// Imports for Icons
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHome,
  faCalendarAlt,
  faCogs,
  faThumbsUp,
  faHistory,
  faPlus,
  faUser,
  faUserPlus,
  faQuestion,
  faSignIn,
  faSignOut,
  faCalendarCheck,
  faMessage,
  faSun,
  faMoon,
} from '@fortawesome/free-solid-svg-icons';

const SidebarPro = () => {
  let navigate = useNavigate();
  const [username, setUsername] = useState(null);
  const [collapsed, setCollapsed] = useState(true);
  const { isModalOpen, setModalOpen } = useContext(RegisterContext);
  const {theme, setTheme} = useContext(ThemeContext);

  const switchTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
  }

  async function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userid');
    navigate('/login');
  }
  useLayoutEffect(() => {
    fetch('http://localhost:5000/users/isUserAuth', {
      headers: {
        'x-access-token': localStorage.getItem('token'),
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

  return (
    <div className="sidebarproWrapper">
      <ProSidebar
        collapsed={collapsed}
        breakPoint="xs"
        image={sidebarBg}
        onMouseOver={() => {
          setCollapsed(false);
        }}
        onMouseOut={() => {
          setCollapsed(true);
        }}
      >
        <SidebarHeader>
          <div className="sidebarproHeader">Eventual</div>
        </SidebarHeader>
        <SidebarContent>
          <Menu>
            <MenuItem icon={<FontAwesomeIcon icon={faHome} />}>
              Home
              <Link to="/" />
            </MenuItem>
            <MenuItem icon={<FontAwesomeIcon icon={faCalendarAlt} />}>
              Events
              <Link to="/events" />
            </MenuItem>
            {username && (
              <MenuItem icon={<FontAwesomeIcon icon={faPlus} />}>
                Add Events
                <Link to="/add-events" />
              </MenuItem>
            )}
            {username && (
              <MenuItem icon={<FontAwesomeIcon icon={faCalendarCheck} />}>
                My Events
                <Link to="/my-events" />
              </MenuItem>
            )}
            {username && (
              <MenuItem icon={<FontAwesomeIcon icon={faCalendarCheck} />}>
                Attending
                <Link to="/attending-events" />
              </MenuItem>
            )}
            {username && (
              <MenuItem icon={<FontAwesomeIcon icon={faThumbsUp} />}>
                Liked
                <Link to="/liked" />
              </MenuItem>
            )}
            {username &&
                <MenuItem icon={<FontAwesomeIcon icon={faMessage} />}>
                    Notifications
                    <Link to="/my-notifications" />
                </MenuItem>
            }
            {username && (
              <MenuItem icon={<FontAwesomeIcon icon={faHistory} />}>
                History
                <Link to="/history" />
              </MenuItem>
            )}
            {username == null && (
              <MenuItem icon={<FontAwesomeIcon icon={faSignIn} />}>
                Log in
                <Link to="/login" />
              </MenuItem>
            )}
            {username == null && (
              <MenuItem
                icon={<FontAwesomeIcon icon={faUserPlus} />}
                onClick={() => {
                  setModalOpen(true);
                }}
              >
                Register
              </MenuItem>
            )}
            {username == null && (
              <MenuItem icon={<FontAwesomeIcon icon={faQuestion} />}>
                Forgot Password?
                <Link to="/forgot-password" />
              </MenuItem>
            )}
            {username && (
              <MenuItem icon={<FontAwesomeIcon icon={faUser} />}>
                {username}
                <Link to="/profile" />
              </MenuItem>
            )}
            {username && (
              <MenuItem
                icon={<FontAwesomeIcon icon={faSignOut} />}
                onClick={logout}
              >
                Log out
              </MenuItem>
            )}
            <MenuItem onClick={switchTheme} icon={theme === 'light' ? <FontAwesomeIcon icon={faMoon} />: <FontAwesomeIcon icon={faSun} />}>
              {theme === 'light' ? 'Dark' : 'Light'} Mode
            </MenuItem>
          </Menu>
        </SidebarContent>
        <SidebarFooter>
          <div className="sidebarproFooter">@RuntimeWarriors</div>
        </SidebarFooter>
      </ProSidebar>
      <Register trigger={isModalOpen} setTrigger={setModalOpen} />
    </div>
  );
};

export default SidebarPro;
