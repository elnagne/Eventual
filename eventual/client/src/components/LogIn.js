import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
const LogIn = () => {
  let navigate = useNavigate();

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
      .then((data) => console.log(data))
      .catch((error) => {
        window.alert(error);
        return;
      });

    // move to the home page if successful
    // navigate("/");
  };

  return (
    <div>
      <Form className="pageCard" id="signin-form" onSubmit={onSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Email address</Form.Label>
          <Form.Control id="email" type="email" placeholder="Enter email" />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control id="pw" type="password" placeholder="Password" />
        </Form.Group>
        <Button id="submit" variant="primary" type="submit">
          Login
        </Button>
      </Form>
    </div>
  );
};

export default LogIn;
