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
    const dbConnect = dbo.getDb();
    const usersCollection = dbConnect.collection("mockUsers");

    const user = req.body;
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
            res.message = "Successfully registered new user";
            response.json(res);
        });
    }
});

// User login
usersRoutes.route("/users/login").post((req, response) => {
    // TODO: Annabelle
});

// Update user
usersRoutes.route("/users/update/:id").post((req, response) => {
    const dbConnect = dbo.getDb();
    const usersCollection = dbConnect.collection("mockUsers");

    const updatedUser = { $set: req.body };
    const query = { _id: ObjectId(req.params.id) };

    // Do not allow updating passwords here
    if(req.body.hasOwnProperty('password')) {
        // Status 400 indicates a bad request
        response.status(400).json({ message: "Cannot update password using this route. Use /users/updatePassword/:id instead."  });
    } else {
        usersCollection.updateOne(query, updatedUser, (err, res) => {
            if (err) throw err;
            res.message = "Successfully updated user";
            response.json(res);
        })
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
    })
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
    })
});

// Export usersRoutes so we can use we different CRUD operations established here in server.js
module.exports = usersRoutes;