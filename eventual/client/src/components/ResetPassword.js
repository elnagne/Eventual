import React from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const ResetPassword = props => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [invalid, setInvalid] = useState(false);
    const [loading, setLoading] = useState(true);

    const params = useParams();

    useEffect ((e) => {
        async function checkToken() {
            const data = { PasswordResetToken: params['*'] };

            const response = await fetch("http://localhost:5000/reset/", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(data)
            }).catch(error => {
                console.error(error.data);
            });

            // information is correct up to here
        
            if (response.ok) {
                await response.json().then(user => {

                    setUsername(user.username);
                    setLoading(false);
                });
            } else {
                setInvalid(true);
                setLoading(false);
            }
        }

        checkToken();
    })

    const resetPassword = e => {
        e.preventDefault();

        const data = { 
            username: username,
            password: password
        };

  

        fetch("http://localhost:5000/update-forgot-password", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data)
        }).then(response => {
            document.getElementById("response").innerHTML = "Password has been reset.";
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
                            <h5>Password reset has either expired or is not valid.</h5>
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
                                    <Form.Control type="password" placeholder="Enter new password" value={password} onChange={(e) => setPassword(e.target.value)}/>
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