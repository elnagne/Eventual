import React from 'react';
import './Register.css';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { useState } from 'react';

const Register = (props) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [username,setUsername] = useState('');
    const [password,setPassword] = useState('');

    const submit = async (e) => {
        e.preventDefault();

        const newAccount = {
            username: username,
            password: password,
            email: email,
            name: {first: firstName, last: lastName}
        }

        await fetch("http://localhost:5000/accounts/add", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newAccount),
        }).catch(error => {
            window.alert(error);
            return;
        })

        setUsername('');
        setPassword('');
        setEmail('');
        setFirstName('');
        setLastName('');
    }

    return (props.trigger) ? (
        <section id="registerPopup" class="h-100 h-custom">
            <div class="container py-5 h-100">
                <div class="row d-flex justify-content-center align-items-center h-100">
                    <div class="col-lg-8 col-xl-6">
                        <div class="card rounded-3">
                            <div class="card-body p-4 p-md-5">                    
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
                                    <Row>
                                        <Button variant="primary" type="submit" onClick={submit}>
                                            Register
                                        </Button>
                                    </Row>
                                </Col>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    ) : "";
  }
  
  export default Register