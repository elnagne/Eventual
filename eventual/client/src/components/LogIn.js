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
      //promise chaining
      //do .then .then or away away
      //first respose is a response promise
      //second .then would be the data
      //.catch is for the error
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        console.log(typeof data);
        console.log(data.content);
        if (data.content === "") {
          console.log(data.content);
        } else if (!data.isValid) {
          // not valid case
          console.log(data.content);
        } else {
          // valid case
          navigate("/");
        }
      })
      .catch((error) => {
        window.alert(error);
        return;
      });

    // move to the home page if successful
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
          <a
            href="/register"
            id="redirectRegister"
            variant="secondary"
            type="submit"
            class="size"
          >
            Register
          </a>
        </div>
      </div>
      <div className="embed-responsive embed-responsive-4by3">
        <img
          class="img"
          alt=""
          src={process.env.PUBLIC_URL + "img/people.png"}
        ></img>
      </div>
    </>
  );
};

export default LogIn;
