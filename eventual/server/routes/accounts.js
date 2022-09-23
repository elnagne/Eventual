const express = require("express");

// This router will act as a controller for accounts
const accountsRoutes = express.Router();

// Used for connecting to the database
const dbo = require("../db/conn");

// Used for converting id from string to ObjectId for the _id attribute
const ObjectId = require("mongodb").ObjectId;

// Creating a new account
accountsRoutes.route("/accounts/add").post((req, response) => {
    let dbConnect = dbo.getDb();
    let account =  {
        username: req.body.username,
        password: req.body.password,
        email: req.body.email,
        name: req.body.name
    };
    dbConnect.collection("accounts").insertOne(account, (err, res) => {
        if (err) throw err;
        response.json(res);
    });
});

module.exports = accountsRoutes;