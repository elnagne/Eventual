import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Sidebar from './Sidebar'
import { useState, useEffect } from 'react';

const PasswordReset = () => {
    const [email, setEmail] = useState('');

    const resetPassword = e => {
        e.preventDefault();
    }

    return (
        <div className="vh-100 d-flex justify-content-center align-items-center">
            <div className="card rounded-3 mx-auto">
                <div className="card-body p-4 p-md-5">
                    <div className="d-flex">
                        <div className="mx-auto p-5">
                            <h3>Reset Password</h3>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} disabled/>
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
    );
}

export default PasswordReset