import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Sidebar from './Sidebar'
import { useState, useEffect } from 'react';

var sleep = function () {
    setTimeout(function () {
        ;
    }, 5000);
}

const ResetPassword = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [invalid, setInvalid] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect ((e) => {
        async function checkToken() {
            e.preventDefault();

            await fetch("http://localhost:5000/reset", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    PasswordResetToken: this.props.match.params.token
            }).then(response => {
                if (response.ok) {
                    setLoading(false);
                    setUsername(response.username);
                } else {
                    setInvalid(true);
                    setLoading(false);
                }
            }).catch(error => {
                console.error(error.data);
            });
        }

        checkToken();
    })

    const resetPassword = e => {
        e.preventDefault();

        fetch("http://localhost:5000/update-forgot-password", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                username: username
        }).then(response => {
            document.getElementById("response").innerHTML = "Password has been reset.";
            // wait five seconds and then redirect to homepage
            sleep();
            window.location.href = "http://localhost:5000/";
        }).catch(error => {
            console.error(error.data);
        });
    }

    if (invalid) { return (
        <div className="vh-100 d-flex justify-content-center align-items-center">
            <div className="card rounded-3 mx-auto">
                <div className="card-body p-4 p-md-5">
                    <div className="d-flex">
                        <div className="mx-auto p-5">
                            <h3>Password link is invalid.</h3>
                        </div>
                    </div>       
                </div>       
            </div>       
        </div>
    )} else if (loading) { return (
        <div className="vh-100 d-flex justify-content-center align-items-center">
            <div className="card rounded-3 mx-auto">
                <div className="card-body p-4 p-md-5">
                    <div className="d-flex">
                        <div className="mx-auto p-5">
                            <h3>Loading...</h3>
                        </div>
                    </div>       
                </div>       
            </div>       
        </div>
    )} else { return (
            <div className="vh-100 d-flex justify-content-center align-items-center">
                <div className="card rounded-3 mx-auto">
                    <div className="card-body p-4 p-md-5">
                        <div className="d-flex">
                            <div className="mx-auto p-5">
                                <h3>Reset Password</h3>
                                <Form.Group className="mb-3" controlId="formBasicPassword">
                                    <Form.Label>New Password</Form.Label>
                                    <Form.Control type="email" placeholder="Enter email" value={password} onChange={(e) => setPassword(e.target.value)}/>
                                </Form.Group>
                                <Button variant="primary" className="me-1" type="Submit" id="reset" onClick={resetPassword}>
                                    Reset
                                </Button>
                                <span className="m-3" id="response">{""}</span>
                            </div>
                        </div>       
                    </div>       
                </div>       
            </div>
        ) 
    }
};


export default ResetPassword