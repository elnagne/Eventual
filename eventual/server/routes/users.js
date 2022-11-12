const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../config.env") });
// This router will act as a controller for users
const usersRoutes = express.Router();

// Used for connecting to the database
const dbo = require("../db/conn");
const { json } = require("express");
const { ObjectID } = require("mongodb");

// Used for converting id from string to ObjectId for the _id attribute
const ObjectId = require("mongodb").ObjectId;

// Registering a new user
usersRoutes.route("/users/register").post(async (req, response) => {
  const dbConnect = dbo.getDb();
  const usersCollection = dbConnect.collection("mockUsers");

  const user = req.body;

  const takenUsername = await usersCollection.findOne({
    username: user.username,
  });
  const takenEmail = await usersCollection.findOne({ email: user.email });

  if (takenUsername || takenEmail) {
    // Status 409 indicates there is an conflict with an existing record in the collection
    response
      .status(409)
      .json({ message: "Username or email is already taken." });
  } else {
    // Hash and salt password before inserting
    user.password = await bcrypt.hash(req.body.password, 10);
    usersCollection.insertOne(user, (err, res) => {
      if (err) throw err;
      res.message = "Successfully registered new user";
      response.json(res);
    });
  }
});

usersRoutes.get("/users/isUserAuth", verifyJWT, (req, res, next) => {
  res.json({ isLoggedIn: true, username: req.user.username });
});
//Sign JSON Web Token / Login
function verifyJWT(req, res, next) {
  const token = req.headers["x-access-token"]?.split(" ")[1];
  if (token) {
    jwt.verify(token, process.env.PASSPORTSECRET, (err, decoded) => {
      if (err) {
        return res.json({
          isloggedIn: false,
          message: "Authentication failed",
        });
      }
      req.user = {};
      req.user.id = decoded.id;
      req.user.username = decoded.username;
      next();
    });
  } else {
    res.json({ message: "Invalid token", isLoggedIn: false });
  }
}
//login
usersRoutes.route("/users/login").post(async (req, res) => {
  if (
    !("email" in req.body) ||
    req.body.email === "" ||
    !("pw" in req.body) ||
    req.body.pw === ""
  ) {
    return res.status(400).json({ message: "missing input field " });
  }

  const dbConnect = dbo.getDb();

  let pw = req.body.pw;
  let email = req.body.email;

  dbConnect
    .collection("mockUsers")
    .findOne({ email: email }, function (err, user) {
      if (err) return res.status(500).json(err);
      if (!user) return res.status(401).json({ message: "access denied" });

      bcrypt.compare(pw, user.password).then((valid) => {
        if (valid) {
          const payload = {
            id: user._id,
            username: user.username,
            email: user.email,
          };
          //create a token to send to the front end
          jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: 3600 },
            (err, token) => {
              if (err) return res.json({ message: err });
              return res.json({
                message: "Success",
                token: "Bearer " + token,
                userid: user._id,
              });
            }
          );

          // return res.json({ content: user.username, isValid: true });
        } else {
          return res
            .status(401)
            .json({ message: "Incorrect email or Password" });
        }
      });
    });
});

// Update user
usersRoutes.route("/users/update/:id").post((req, response) => {
  const dbConnect = dbo.getDb();
  const usersCollection = dbConnect.collection("mockUsers");

  const updatedUser = { $set: req.body };
  const query = { _id: ObjectId(req.params.id) };

  // Do not allow updating passwords here
  if (req.body.hasOwnProperty("password")) {
    // Status 400 indicates a bad request
    response.status(400).json({
      message:
        "Cannot update password using this route. Use /users/updatePassword/:id instead.",
    });
  } else {
    usersCollection.updateOne(query, updatedUser, (err, res) => {
      if (err) throw err;
      res.message = "Successfully updated user";
      response.json(res);
    });
  }
});

// Update user password
usersRoutes.route("/users/updatePassword/:id").post(async (req, response) => {
  const dbConnect = dbo.getDb();
  const usersCollection = dbConnect.collection("mockUsers");

  const updatedHashedPassword = await bcrypt.hash(req.body.password, 10);
  const updatedUser = { $set: { password: updatedHashedPassword } };
  const query = { _id: ObjectId(req.params.id) };

  usersCollection.updateOne(query, updatedUser, (err, res) => {
    if (err) throw err;
    res.message = "Successfully updated password";
    response.json(res);
  });
});

// Delete user
usersRoutes.route("/users/delete/:id").delete((req, response) => {
  const dbConnect = dbo.getDb();
  const usersCollection = dbConnect.collection("mockUsers");

  const query = { _id: ObjectId(req.params.id) };

  usersCollection.deleteOne(query, (err, res) => {
    if (err) throw err;
    res.message = "Successfully deleted user";
    response.json(res);
  });
});

// returns user info from username for profile page
usersRoutes.route("/users/get-user-info/:id").get((req, response) => {
  const dbConnect = dbo.getDb();
  const usersCollection = dbConnect.collection("mockUsers");


  usersCollection
    .findOne({
      _id: ObjectId(req.params.id),
    })
    .then((user) => {

      if (user == null) response.status(404);
      else
        response.status(200).json({
          email: user.email,
          username: user.username,
          firstName: user.name.first,
          lastName: user.name.last,
          female: user.female,
        });
    });
});

// returns if old password submitted is equal to the real password
usersRoutes.route("/users/check-password/:id").post((req, response) => {
  const dbConnect = dbo.getDb();

  dbConnect
    .collection("mockUsers")
    .findOne({ _id: ObjectId(req.params.id) }, function (err, user) {
      if (err) return res.status(500).json(err);
      if (!user) return res.status(401).json({ message: "access denied" });

      bcrypt.compare(req.body.password, user.password).then((valid) => {

        if (valid) response.status(200).send("same");
        else response.status(404).send("not same");
      });
    });
});

// Export usersRoutes so we can use we different CRUD operations established here in server.js
module.exports = usersRoutes;
