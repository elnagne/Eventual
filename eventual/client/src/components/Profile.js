import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import SidebarPro from "./SidebarPro";
import { useNavigate, Navigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import { ThemeContext } from "./ThemeContext";

const Profile = () => {
  const {theme} = useContext(ThemeContext);
  const [isset, setIsset] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [female, setFemale] = useState(false);
 // let navigate = useNavigate();
  const userid = localStorage.getItem("userid");

  // get current user information and populate forms
  const getUser = async (e) => {
    const response = await fetch(
      "http://localhost:5000/users/get-user-info/" + userid,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.ok) {
      await response.json().then((user) => {
        setUsername(user.username);
        setEmail(user.email);
        setFirstName(user.firstName);
        setLastName(user.lastName);
        setFemale(user.female);
   //     navigate("/profile");
      });
    }
  };

  if (isset === false) {
    setIsset(true);
    getUser();
  }

  // update user information on submit click
  const updateProfile = async (e) => {
    e.preventDefault();
     
    const newProfile = {
      username: username,
      email: email,
      name: { first: firstName, last: lastName },
      female: female,
    };
   
    //document.querySelector("flexCheckDisabled").ariaChecked.reset();
    const response = await fetch(
      "http://localhost:5000/users/update/" + userid,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProfile),
      }
    ).catch((error) => {
      window.alert(error);
      return;
    });

    let message = await response.json();
    document.getElementById("profileResponse").innerHTML = message.message;
    window.location.reload();
  };

  // update password
  const updatePassword = async (e) => {
    e.preventDefault();

    const oldPass = {
      password: oldPassword,
    };

    const response = await fetch(
      "http://localhost:5000/users/check-password/" + userid,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(oldPass),
      }
    );

    if (response.ok) {
      const newPass = {
        password: newPassword,
      };

      const res = await fetch(
        "http://localhost:5000/users/updatePassword/" + userid,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newPass),
        }
      );

      let message = await res.json();
      document.getElementById("passwordResponse").innerHTML = message.message;
      setOldPassword("");
      setNewPassword("");
    }
  };
  //handle the changes on checkbox
  const handleChange = () => {

    setFemale(!female);

  };

  return (
    <div className="d-flex">
      <SidebarPro />
      <div className="profileContent" data-theme={theme}>
        <div class="row">
          <Col className="col-xs-12 col-sm-12 col-md-6 justify-content-start p-5">
            <h3>Change Profile Information</h3>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="firstName">
                <Form.Label>First name</Form.Label>
                <Form.Control
                  type="firstname"
                  placeholder="Enter first name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  disabled
                />
              </Form.Group>
              <Form.Group as={Col} controlId="lastName">
                <Form.Label>Last name</Form.Label>
                <Form.Control
                  type="lastname"
                  placeholder="Enter last name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  disabled
                />
              </Form.Group>
            </Row>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="username"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled
              />
            </Form.Group>

            <div class="form-check">
              <input
                class="form-check-input"
                type="checkbox"
                value=""
                id="flexCheckDisabled"
                onChange={handleChange}
                disabled
              />
              {!female ? (
                <div class="form-check">
                  <label class="form-check-label" for="flexCheckDisabled">
                    I identify as Female
                  </label>
                </div>
              ) : (
                <label class="form-check-label" for="flexCheckDisabled">
                  I identify as non-Female
                </label>
              )}
            </div>

            <div class="col-xs-3">
              <Button
                variant="primary"
                className="me-1"
                type="Edit"
                onClick={toggleForms}
              >
                Edit
              </Button>

              <Button
                variant="primary"
                className="me-1"
                type="submit"
                id="submit"
                onClick={updateProfile}
                
              >
                Submit
              </Button>

            
              <span className="m-3" id="profileResponse">
                {""}
              </span>
            </div>
          </Col>
          <Col className="col-xs-12 col-sm-12 col-md-6 justify-content-start p-5">
            <h3>Change Password</h3>
            <Row className="mb-3">
              <Form.Group className="mb-3" controlId="formOldPassword">
                <Form.Label>Enter Current Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Old Password"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  disabled
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formNewPassword">
                <Form.Label>Enter New Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="New Password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  disabled
                />
              </Form.Group>
              <div class="col-xs-3">
                <Button
                  variant="primary"
                  className="me-1"
                  type="Edit"
                  onClick={togglePassword}
                >
                  Edit
                </Button>
                <Button
                  variant="primary"
                  className="me-1"
                  type="submit"
                  id="submitPassword"
                  onClick={updatePassword}
                >
                  Submit
                </Button>
                <span className="m-3" id="passwordResponse">
                  {""}
                </span>
              </div>
            </Row>
          </Col>
        </div>
      </div>
    </div>
  );
};

// toggles enabled and disabled for profile forms
function toggleForms() {
  document.getElementById("firstName").disabled =
    !document.getElementById("firstName").disabled;
  document.getElementById("lastName").disabled =
    !document.getElementById("lastName").disabled;
  document.getElementById("formBasicEmail").disabled =
    !document.getElementById("formBasicEmail").disabled;
  document.getElementById("formBasicUsername").disabled =
    !document.getElementById("formBasicUsername").disabled;
  document.getElementById("flexCheckDisabled").disabled =
    !document.getElementById("flexCheckDisabled").disabled;
}

// toggles enabled and disabled for password forms
function togglePassword() {
  document.getElementById("formOldPassword").disabled =
    !document.getElementById("formOldPassword").disabled;
  document.getElementById("formNewPassword").disabled =
    !document.getElementById("formNewPassword").disabled;
}

export default Profile;
