const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

// This router will act as a controller for users
const usersRoutes = express.Router();

// Used for connecting to the database
const dbo = require("../db/conn");

// Used for converting id from string to ObjectId for the _id attribute
const ObjectId = require("mongodb").ObjectId;

// Registering a new user
usersRoutes.route("/users/register").post(async (req, response) => {
    const user = req.body;
    
    const dbConnect = dbo.getDb();
    const usersCollection = dbConnect.collection("mockUsers");

    const takenUsername = await usersCollection.findOne({username: user.username});
    const takenEmail = await usersCollection.findOne({email: user.email});

    if (takenUsername || takenEmail) {
        // Status 409 indicates there is an conflict with an existing record in the collection
        response.status(409).json({message: "Username or email is already taken."});
    } else {
        // Hash and salt password before inserting
        user.password = await bcrypt.hash(req.body.password, 10);
        usersCollection.insertOne(user, (err, res) => {
            if (err) throw err;
            // Re-use MongoDB's response
            res.message = "Registered new user";
            response.json(res);
        });
    }
});

usersRoutes.route("/users/login").post((req, response) => {
    // TODO: Annabelle
});

// Export usersRoutes Router so we can use we different CRUD operations established in this file in server.js (see server.js line 10s)
module.exports = usersRoutes;