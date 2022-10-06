import React from 'react';
import './Register.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { useState, useEffect, useRef, useContext } from 'react';
import { RegisterContext } from './RegisterContext';

const Register = (props) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');

    const ref = useRef();
    // Call hook passing in the ref and a function to call on outside click
    const {isModalOpen, setModalOpen} = useContext(RegisterContext);
    useOnClickOutside(ref, () => setModalOpen(false));

    const submit = async (e) => {
        e.preventDefault();

        const newAccount = {
            username: username,
            password: password,
            email: email,
            name: {first: firstName, last: lastName}
        }

        const response = await fetch("http://localhost:5000/users/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newAccount),
        }).catch(error => {
            window.alert(error);
            return;
        });

        let message = await response.json();
        document.getElementById("response").innerHTML = message.message;

        setUsername('');
        setPassword('');
        setEmail('');
        setFirstName('');
        setLastName('');
    };

    return props.trigger ? (
        <section id="registerPopup" className="h-100 h-custom">
            <div className="container py-5 h-100">
                <div className="row d-flex justify-content-center align-items-center h-100">
                    <div className="col-lg-8 col-xl-6">
                        <div className="card rounded-3" ref={ref}>
                            <div className="card-body p-4 p-md-5">                    
                                <Col>
                                    <Row className="mb-3">
                                        <Form.Group as={Col} controlId="firstName">
                                            <Form.Label>First name</Form.Label>
                                            <Form.Control type="firstname" placeholder="Enter first name" onChange={(e) => setFirstName(e.target.value)}/>
                                        </Form.Group>
                                        <Form.Group as={Col} controlId="lastName">
                                            <Form.Label>Last name</Form.Label>
                                            <Form.Control type="lastname" placeholder="Enter last name" onChange={(e) => setLastName(e.target.value)}/>
                                        </Form.Group>
                                    </Row>
                                    <Form.Group className="mb-3" controlId="formBasicEmail">
                                        <Form.Label>Email address</Form.Label>
                                        <Form.Control type="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)}/>
                                        <Form.Text className="text-muted">
                                            We'll never share your email with anyone else.
                                        </Form.Text>
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="formBasicUsername">
                                        <Form.Label>Username</Form.Label>
                                        <Form.Control type="username" placeholder="Username" onChange={(e) => setUsername(e.target.value)}/>
                                    </Form.Group>
                                    <Form.Group className="mb-3" controlId="formBasicPassword">
                                        <Form.Label>Password</Form.Label>
                                        <Form.Control type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)}/>
                                    </Form.Group>
                                    <p>
                                        <Button variant="primary" type="submit" onClick={submit}>
                                            Register
                                        </Button>
                                        <span className="p-3" id="response">{""}</span>
                                    </p>
                                </Col>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    ) : "";
  }

  function useOnClickOutside(ref, handler) {
    useEffect(
      () => {
        const listener = (event) => {
          // Do nothing if clicking ref's element or descendent elements
          if (!ref.current || ref.current.contains(event.target)) {
            return;
          }
          handler(event);
        };
        document.addEventListener("mousedown", listener);
        document.addEventListener("touchstart", listener);
        return () => {
          document.removeEventListener("mousedown", listener);
          document.removeEventListener("touchstart", listener);
        };
      },
      // Add ref and handler to effect dependencies
      [ref, handler]
    );
  }
  
  export default Register