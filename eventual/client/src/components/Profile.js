import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Sidebar from './Sidebar'
import { useState, useEffect } from 'react';

const Profile = () => {
    const [firstName, setFirstName] = useState('Test');
    const [lastName, setLastName] = useState('Test');
    const [email, setEmail] = useState('Test');
    const [username,setUsername] = useState('Test');
    const [oldPassword,setOldPassword] = useState('');
    const [newPassword,setNewPassword] = useState('');

    // get current user information and populate forms
    const getUser = async (e) => {
        //e.preventDefault();

        const currUser = {
            username: username,
            password: oldPassword,
            email: email,
            name: {first: firstName, last: lastName}
        }

        /*
        const response = await fetch("http://localhost:5000/users/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(currUser),
        }).catch(error => {
            window.alert(error);
            return;
        });
        */
    };

    // update user information on submit click

    // if password is equal to the users password, change password

    return (
        <div className="d-flex">
            <div className="d-flex">
                <Sidebar />
            </div>
            <div class="row">
                <Col className="col-xs-12 col-sm-12 col-md-6 justify-content-start p-5">
                    <h3>Change Profile Information</h3>
                    <Row className="mb-3">
                        <Form.Group as={Col} controlId="firstName">
                            <Form.Label>First name</Form.Label>
                            <Form.Control type="firstname" placeholder="Enter first name" value={firstName} onChange={(e) => setFirstName(e.target.value)} disabled/>
                        </Form.Group>
                        <Form.Group as={Col} controlId="lastName">
                            <Form.Label>Last name</Form.Label>
                            <Form.Control type="lastname" placeholder="Enter last name" value={lastName} onChange={(e) => setLastName(e.target.value)} disabled/>
                        </Form.Group>
                    </Row>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} disabled/>
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="formBasicUsername">
                        <Form.Label>Username</Form.Label>
                        <Form.Control type="username" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} disabled/>
                    </Form.Group>
                    <div class='col-xs-3'>
                        <Button variant="primary" className="me-1" type="Edit" onClick={toggleForms}>
                            Edit
                        </Button>
                        <Button variant="primary" className="me-1" type="Submit" id="submit" onClick={getUser} disabled>
                            Submit
                        </Button>
                        <span className="m-3" id="response">{""}</span>
                    </div>
                </Col>
                <Col className="col-xs-12 col-sm-12 col-md-6 justify-content-start p-5">
                    <h3>Change Password</h3>
                    <Row className="mb-3">
                        <Form.Group className="mb-3" controlId="formOldPassword">
                            <Form.Label>Enter Current Password</Form.Label>
                            <Form.Control type="password" placeholder="Old Password" value={oldPassword} onChange={(e) => setOldPassword(e.target.value)} disabled/>
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formNewPassword">
                            <Form.Label>Enter Current Password</Form.Label>
                            <Form.Control type="password" placeholder="New Password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} disabled/>
                        </Form.Group>
                        <div class='col-xs-3'>
                            <Button variant="primary" className="me-1" type="Edit" onClick={togglePassword}>
                                Edit
                            </Button>
                            <Button variant="primary" className="me-1" type="Submit" id="submitPassword" onClick={getUser} disabled>
                                Submit
                            </Button>
                            <span className="m-3" id="response">{""}</span>
                        </div>
                    </Row>
                </Col>
            </div>
        </div>
    );
}

// toggles enabled and disabled for profile forms
function toggleForms() {
    document.getElementById("firstName").disabled = !document.getElementById("firstName").disabled;
    document.getElementById("lastName").disabled = !document.getElementById("lastName").disabled;
    document.getElementById("formBasicEmail").disabled = !document.getElementById("formBasicEmail").disabled;
    document.getElementById("formBasicUsername").disabled = !document.getElementById("formBasicUsername").disabled;
    document.getElementById("submit").disabled = !document.getElementById("submit").disabled;
}

// toggles enabled and disabled for password forms
function togglePassword() {
    document.getElementById("formOldPassword").disabled = !document.getElementById("formOldPassword").disabled;
    document.getElementById("formNewPassword").disabled = !document.getElementById("formNewPassword").disabled;
    document.getElementById("submitPassword").disabled = !document.getElementById("submitPassword").disabled;
}

export default Profile