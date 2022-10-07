const express = require("express");

const searchRoutes = express.Router();

// Used for connecting to the database
const dbo = require("../db/conn");

// Used for converting id from string to ObjectId for the _id attribute
const ObjectId = require("mongodb").ObjectId;

// Getting every event
searchRoutes.route("/search").get((req, res) => {
  let db_connect = dbo.getDb("eventual");

  db_connect
    .collection("testEvents")
    .find({})
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

// Find the name of a user given their id
searchRoutes.route("/search/name/:id").get((req, res) => {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId(req.params.id) };
  db_connect.collection("mockUsers").findOne(myquery, function (err, result) {
    if (err) throw err;
    res.json(result);
  });
});

// Export searchRoutes Router so we can use we different CRUD operations established in this file in server.js (see server.js line 10s)
module.exports = searchRoutes;
