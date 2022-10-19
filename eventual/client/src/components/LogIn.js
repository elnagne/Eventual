import { Form, Button } from "react-bootstrap";
import { useLayoutEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import Register from "./Register";
import { RegisterContext } from "./RegisterContext";
import "./LogIn.css";
import userInfo from "./userInfo";

const LogIn = () => {
  const [errorMessage, setErrorMessage] = useState("");
  let navigate = useNavigate();
  const { isModalOpen, setModalOpen } = useContext(RegisterContext);

  useLayoutEffect(() => {
    fetch("/isUserAuth", {
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => (data.isLooggedIn ? navigate.push("/") : null))
      .catch((err) => setErrorMessage(err));
  }, [navigate]);

  // move to the home page if successful

  const onSubmit = async (e) => {
    e.preventDefault();

    // Grab the password and email and login
    let pw = document.querySelector("#pw").value;
    let email = document.querySelector("#email").value;
    document.querySelector("#signin-form").reset();
    await fetch("http://localhost:5000/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ pw: pw, email: email }),
    })
      .then((response) => response.json())
      .then((data) => {
        //console.log(data);
        if (data.content === "") {
          alert("Please fill out the form");
          data.isValid = false;
        } else if (!data.isValid) {
          // not valid case

          alert(data.content);
          data.isValid = false;
        } else {
          // valid case

          localStorage.setItem("token", data.token);
          // console.log(data.payload);

          //create a pop up to welcome the user then navigate to home page
          navigate("/");
        }
      })
      .catch((error) => {
        window.alert(error);
        return;
      });
  };

  return (
    <>
      <div>
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
      </div>

      <div className="embed-responsive embed-responsive-4by3">
        <img
          className="img"
          alt=""
          src={process.env.PUBLIC_URL + "img/people.png"}
        ></img>
      </div>
      <Register trigger={isModalOpen} setTrigger={setModalOpen} />
    </>
  );
};

export default LogIn;
