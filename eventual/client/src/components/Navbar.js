import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function Navbar() {
  const navigate = useNavigate();
  const [username, setUsername] = useState(null);
  async function logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("userid")
    await naviagate.push("/login");
  }
  useEffect(() => {
    fetch("/isUserAuth", {
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    })
      .then((res) => res.json())
      .then((data) => (data.isLooggedIn ? setUsername(data.username) : null));
  }, []);
  return (
    <div>
      <Link to="/">Home</Link>
      {username ? (
        <div>
          <Link to={"/u/" + username}>Profile</Link>
          <div onClick={logout}>logout</div>
        </div>
      ) : (
        <div>
          <Link to="/login">LogIn</Link>
        </div>
      )}
    </div>
  );
}
export default Navbar;
