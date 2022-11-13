import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState, useContext } from 'react';
import SidebarPro from './SidebarPro'
import { ThemeContext } from "./ThemeContext";

const emailRegex = new RegExp('[a-z0-9]+@[a-z]+\.[a-z]{2,3}');

const ForgotPassword = () => {
    const {theme} = useContext(ThemeContext);
    const [email, setEmail] = useState('');

    const sendResetPassword = e => {
        e.preventDefault();
        if (!emailRegex.test(email)) {
            document.getElementById("response").innerHTML = "Please enter a valid email address.";
        } else {
            fetch("http://localhost:5000/forgot-password", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({email: email})
            })

            document.getElementById("response").innerHTML = "If email is correct, then the reset link has been sent.";        
        }
    };

    return (
        <div className="forgotPasswordContent vh-100 d-flex justify-content-center align-items-center" data-theme={theme}>
            <SidebarPro/>
            <div className="card rounded-3 mx-auto">
                <div className="card-body p-4 p-md-5">
                    <div className="d-flex">
                        <div className="mx-auto p-5">
                            <h3>Reset Password</h3>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                            </Form.Group>
                            <Button variant="primary" className="me-1" type="Submit" id="reset" onClick={sendResetPassword}>
                                Reset
                            </Button>
                            <span className="m-3" id="response">{""}</span>
                        </div>
                    </div>       
                </div>       
            </div>       
        </div>
    );
}

export default ForgotPassword