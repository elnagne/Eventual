const express = require("express");

// This router will act as a controller for users
const usersRoutes = express.Router();

// Used for connecting to the database
const dbo = require("../db/conn");

// Used for converting id from string to ObjectId for the _id attribute
const ObjectId = require("mongodb").ObjectId;

// Creating a new user
usersRoutes.route("/users/add").post((req, response) => {
    let user =  {
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        name: req.body.name
    };
    let dbConnect = dbo.getDb();
    dbConnect.collection("mockUsers").insertOne(user, (err, res) => {
        // Throw error if found
        if (err) throw err;
        // Otherwise just re-use MongoDB's response
        response.json(res);
    });
});

// Export usersRoutes Router so we can use we different CRUD operations established in this file in server.js (see server.js line 10s)
module.exports = usersRoutes;