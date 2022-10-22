import { Form, Button } from 'react-bootstrap';
import { useLayoutEffect, useEffect, useState } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { useContext } from 'react';
import Register from './Register';
import { RegisterContext } from './RegisterContext';
import './LogIn.css';
import userInfo from './UserInfo';
import SidebarPro from "./SidebarPro";

const LogIn = () => {
  const [errorMessage, setErrorMessage] = useState('');
  let navigate = useNavigate();
  const { isModalOpen, setModalOpen } = useContext(RegisterContext);

  // move to the home page if successful

  const onSubmit = async (e) => {
    e.preventDefault();

    // Grab the password and email and login
    let pw = document.querySelector('#pw').value;
    let email = document.querySelector('#email').value;
    document.querySelector('#signin-form').reset();
    await fetch('http://localhost:5000/users/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ pw: pw, email: email }),
    })
      .then((res) => res.json())
      .then((data) => {
        //console.log(data.userid);
        if (data.message === 'Success') {
          localStorage.setItem('token', data.token);
          localStorage.setItem('userid', data.userid);
          isAuth();
          return;
        }
        alert(data.message);
      })
      .catch((error) => {
        setErrorMessage(error);
      });
  };

  const isAuth = async () => {
    await fetch('http://localhost:5000/users/isUserAuth', {
      method: 'GET',
      headers: {
        'x-access-token': localStorage.getItem('token'),
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.isLoggedIn) {
          navigate('/');
        }
      })
      .catch((error) => {
        setErrorMessage(error);
      });
  };

  return (
    <div className="loginWrapper">
      <SidebarPro />
      <div className="loginContent">
        <Form className="pageCard" id="signin-form" onSubmit={onSubmit}>
          <div class="c">
            <h1 className="text-center size">
              <em>
                <strong>Login Page</strong>
              </em>
            </h1>
            <Form.Group className="mb-3">
              <Form.Label>Email address</Form.Label>
              <Form.Control id="email" type="email" placeholder="Enter email" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control id="pw" type="password" placeholder="Password" />
            </Form.Group>
          </div>
          <Button
            id="submit"
            variant="primary"
            type="submit"
            className="btn size"
          >
            Login
          </Button>
        </Form>

        <div className="bottom-right">
          <button
            className="btn size"
            varient="secondary"
            onClick={() => setModalOpen(true)}
          >
            Register
          </button>
        </div>
        <div className="embed-responsive embed-responsive-4by3">
        <img
          className="img"
          alt=""
          src={process.env.PUBLIC_URL + 'img/people.png'}
        ></img>
      </div>
      </div>
      <Register trigger={isModalOpen} setTrigger={setModalOpen} />
    </div>
  );
};

export default LogIn;
