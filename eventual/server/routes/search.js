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
    .find({liked_by:{$exists:true}}) //**to be changed**/
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

// Search for events based on filters
searchRoutes.route("/search/filteredSearch").post((req, res) => {
  let db_connect = dbo.getDb("eventual");

  let orderby = req.body.orderby;
  let activeFilters = req.body.filters;
  let startDate = req.body.startDate.length != 0 ? req.body.startDate : "0000-00-00"
  let endDate = req.body.endDate.length != 0 ? req.body.endDate : "9999-99-99";
  let city = req.body.city;
  let query = req.body.womanOnly ? { category: { $in: activeFilters }, woman_only: true, date_of_event: { $gte: startDate, $lte: endDate }}
                                 : { category: { $in: activeFilters }, date_of_event: { $gte: startDate, $lte: endDate }}
  if (city) {
    query['address_data.locality'] = city ;
  }

  let sortQuery ={}
  if (orderby == "oldest"){
    sortQuery = {$natural:1}
  }
  else if (orderby == "newest"){
    sortQuery = {$natural:-1}
  }
  else if (orderby == "likes"){
    sortQuery = {num_likes:-1}
  }
  else if (orderby == "joined"){
    sortQuery = {num_joined:-1}
  }
  if (orderby == "popularity"){
    db_connect
    .collection("testEvents")
    .aggregate([{$match: query},
      {"$addFields":{ "sort_order":{"$add":["$num_joined", "$num_likes"]}}}, 
      {"$sort":{"sort_order":-1}},
      {"$project":{"sort_order":0}}
     ])
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
  }
  else{
    db_connect
    .collection("testEvents")
    .find(query)
    .sort(sortQuery)
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
  }
});

// Find a singular event given their id
searchRoutes.route("/search/events/:id").get((req, res) => {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId(req.params.id) };
  db_connect.collection("testEvents").findOne(myquery, function (err, result) {
    if (err) throw err;
    res.json(result);
  });
});

// Find a user given their id
searchRoutes.route("/search/name/:id").get((req, res) => {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId(req.params.id) };
  db_connect.collection("mockUsers").findOne(myquery, function (err, result) {
    if (err) throw err;
    res.json(result);
  });
});

// Getting every event liked by :id
searchRoutes.route("/search/liked/:id").get((req, res) => {
  let db_connect = dbo.getDb("eventual");
  let myquery = { "liked_by":{$elemMatch:{account_id:ObjectId(req.params.id)}}};
  db_connect
    .collection("testEvents")
    .find(myquery)
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

// Getting every event joined by :id
searchRoutes.route("/search/attending/:id").get((req, res) => {
  let db_connect = dbo.getDb("eventual");
  let myquery = { "attending_user":{$elemMatch:{account_id:ObjectId(req.params.id)}}};
  db_connect
    .collection("testEvents")
    .find(myquery)
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

// Getting every notification by user
searchRoutes.route("/search/my-notifications/:id").get((req, res) => {
  let db_connect = dbo.getDb("eventual");
  // should be objectId but too lazy at this point
  let myquery = {$or:[{ "joined_by":{$elemMatch:{account_id:req.params.id}}},
                      { "liked_by":{$elemMatch:{account_id:req.params.id}}}]};
  db_connect
    .collection("notifications")
    .find(myquery).sort({$natural:-1})
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
});

// Export searchRoutes Router so we can use we different CRUD operations established in this file in server.js (see server.js line 10s)
module.exports = searchRoutes;
