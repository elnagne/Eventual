const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });
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
// User login
// userRoutes.route("/users/login").post(async (req, res) => {
//   if (!("email" in req.body))
//     return res.status(400).json({ message: "email is missing" });
//   if (!("pw" in req.body))
//     return res.status(400).json({ message: "password is missing" });

//   const dbConnect = dbo.getDb();

//   let pw = req.body.pw;
//   let email = req.body.email;

//   dbConnect
//     .collection("mockUsers")
//     .findOne({ email: email }, function (err, user) {
//       if (err) return res.status(500).json(err);
//       if (!user) return res.status(401).json({ message: "access denied" });

//       bcrypt.compare(pw, user.password).then((valid) => {});
//       if (valid) {
//         const payload = {
//           id: user._id,
//           username: user.username,
//           email: user.email,
//         };
//         //create a token to send to the front end
//         jwt.sign(
//           payload,
//           process.env.JWT_SECRET,
//           { expiresIn: 3600 },
//           (err, token) => {
//             // bearer = t.split(" ")[0];
//             // to = t.split(" ")[1];
//             // console.log("token:"+to);
//             // console.log("BEARER:"+bearer );
//             if (err) return res.json({ message: err });
//             return res.json({
//               message: "Success",
//               token: "Bearer " + token,
//             });
//           }
//         );

//         // return res.json({ content: user.username, isValid: true });
//       } else {
//         return res.status(401).json({ message: "Incorrect email or Password" });
//       }
//     });
// });
//Accessing current user
userRoutes.get("/isUserAuth", verifyJWT, (req, res) => {
  console.log("YOL777777OOOOOO");
  console.log(req.user.username);
  return res.json({ isLoggedIn: true, username: req.user.username });
});

//Sign JSON Web Token / Login
function verifyJWT(req, res, next) {
  console.log("YOLOOOOOO");
  const token = req.headers["x-access-token"]?.split(" ")[1];
  console.log(token);
  if (token) {
    jwt.verify(token, process.env.PASSPORTSECRET, (err, decoded) => {
      if (err)
        return res.json({
          isloggedIn: false,
          message: "Authentication failed",
        });
      req.user = {};
      req.user.id = decoded.id;
      req.user.username = decoded.username;
      next();
    });
  } else {
    res.json({ message: "Invalid token", isLoggedIn: false });
  }
}
module.exports = userRoutes;
