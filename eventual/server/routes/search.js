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

// Search for events based on filters
searchRoutes.route("/search/filteredSearch").post((req, res) => {
  let db_connect = dbo.getDb("eventual");

  let activeFilters = req.body.filters;
  let startDate = req.body.startDate.length != 0 ? req.body.startDate : "0000-00-00"
  let endDate = req.body.endDate.length != 0 ? req.body.endDate : "9999-99-99";

  let query = req.body.womanOnly ? { category: { $in: activeFilters }, woman_only: true, date_of_event: { $gte: startDate, $lte: endDate } }
                                 : { category: { $in: activeFilters }, date_of_event: { $gte: startDate, $lte: endDate } }

  db_connect
    .collection("testEvents")
    .find(query)
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

module.exports = searchRoutes;
