import { useEffect, useState } from "react";
import { Card } from "react-bootstrap";

const EventComment = ({ userid, comment }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
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
        user.firstName.length > 0 &&
          setFirstName(
            user.firstName[0].toUpperCase() + user.firstName.substring(1)
          );
        user.lastName.length > 0 &&
          setLastName(
            user.lastName[0].toUpperCase() + user.lastName.substring(1)
          );
      });
    }
  };

  return (
    <Card className="eventCard">
      <Card.Body>
        <Card.Title>
          {firstName.length > 0 && lastName.length > 0
            ? `${firstName} ${lastName}:`
            : "Deleted User:"}
        </Card.Title>
        <Card.Text>{comment}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default EventComment;
