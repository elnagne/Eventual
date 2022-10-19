const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// This router will act as a controller for user
const userRoutes = express.Router();

// Used for connecting to the database
const dbo = require("../db/conn");
const { json } = require("express");
const { TopologyDescriptionChangedEvent } = require("mongodb");

// userRoutes.get(
//   "/getUserName",
//   verifyJWT(req, (res) => {
//     res.json({ isLoggedIn: true, username: req.user.username });
//   })
// );

//Accessing current user
router.get("/isUserAuth", verifyJWT, (req, res) => {
  console.log("YOL777777OOOOOO");
  console.log(req.user.username);
  return res.json({ isLoggedIn: true, username: req.user.username });
});

//Sign JSON Web Token / Login
function verifyJWT(req, res, next) {
  console.log("YOLOOOOOO");
  const bearer = req.headers["x-access-token"]?.split(" ")[0];
  const token = req.headers["x-access-token"]?.split(" ")[1];
  console.log(bearer);
  console.log(token);
  if (token) {
    jwt.verify(token, process.env.PASSPORTSECRET, (err, decoded) => {
      if (err)
        return res.json({
          loggedIn: false,
          context: "Authentication failed",
        });
      req.user = {};
      req.user.id = decoded.id;
      req.user.username = decoded.username;
      next();
    });
  } else {
    res.json({ context: "Invalid token", LoggedIn: false });
  }
}
