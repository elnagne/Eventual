import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Sidebar from './Sidebar'
import { useState, useEffect } from 'react';

const Profile = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [username,setUsername] = useState('');
    const [oldPassword,setOldPassword] = useState('');
    const [newPassword,setNewPassword] = useState('');

    // get current user information and populate forms
    const getUser = async (e) => {
                /*
        const token = localStorage.getItem("token");
        console.log();

        const user = {
            username: token.username,
        }

        await fetch("http://localhost:5000/users/get-user-info", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(user)
        }).then(response => {
            if (response.ok) {
                setUsername();
                setEmail();
                setFirstName();
                setLastName();
            } else {
                window.location = 'http://localhost:3000';
            }
        }).catch(error => {
            window.alert(error);
            return;
        });
        */
    };

    getUser();

    // update user information on submit click
    const updateProfile = async (e) => {
        e.preventDefault();

        const newProfile = {
            username: username,
            email: email,
            name: {first: firstName, last: lastName}
        }

        const response = await fetch("http://localhost:5000/users/update/:id", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newProfile),
        }).catch(error => {
            window.alert(error);
            return;
        });

        let message = await response.json();
        document.getElementById("profileResponse").innerHTML = message.message;

        setUsername('');
        setEmail('');
        setFirstName('');
        setLastName('');
    };

    // update password
    const updatePassword = async (e) => {
        e.preventDefault();

        // if old password is not correct don't update TODO 
        /*
        if () {

            return;
        }
        */

        const newProfile = {
            password: newPassword
        }

        const response = await fetch("http://localhost:5000/users/updatePassword/:id", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newProfile),
        }).catch(error => {
            window.alert(error);
            return;
        });

        let message = await response.json();
        document.getElementById("passwordResponse").innerHTML = message.message;

        setOldPassword('');
        setNewPassword('');
    };

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
                        <Button variant="primary" className="me-1" type="Submit" id="submit" onClick={updateProfile} disabled>
                            Submit
                        </Button>
                        <span className="m-3" id="profileResponse">{""}</span>
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
                            <Button variant="primary" className="me-1" type="Submit" id="submitPassword" onClick={updatePassword} disabled>
                                Submit
                            </Button>
                            <span className="m-3" id="passwordResponse">{""}</span>
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