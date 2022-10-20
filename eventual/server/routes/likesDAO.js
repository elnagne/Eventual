const express = require("express");
 
// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const likedRoutes = express.Router();
 
// This will help us connect to the database
const dbo = require("../db/conn");
 
// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;
 
 
// This section will help you get a list of all the records.
likedRoutes.route("/liked").get(function (req, res) {
 let db_connect = dbo.getDb("eventual");
 db_connect
   .collection("testEvents") 
   .find({})
   .toArray(function (err, result) {
     if (err) throw err;
     res.json(result);
   });
});

likedRoutes.route("/liked/add_like").post(function (req, response) {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId( req.body.event_id)};
  let newvalues = {
    $inc: {
      num_likes:1
    },
  };
  let likevalues = {
    event_id:ObjectId( req.body.event_id),
    account_id:ObjectId(req.body.account_id)
  };
  db_connect 
  .collection("testLikes")
  .insertOne(likevalues, function (err, res) {
    if (err) throw err;
  });

  db_connect
    .collection("testEvents")
    .update({ _id: ObjectId( req.body.event_id)},
    {$push:{"liked_by":{account_id:req.body.account_id}}});

  db_connect
    .collection("testEvents")
    .updateOne(myquery, newvalues, function (err, res) {
      if (err) throw err;
      console.log("1 document liked");
      response.json(res);
    });
  
});

likedRoutes.route("/liked/add_dislike").post(function (req, response) {

  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId( req.body.event_id)};
  let newvalues = {
    $inc: {
      num_likes: -1
    }
  };

  let likevalues = {
    event_id:ObjectId( req.body.event_id),
    account_id:ObjectId(req.body.account_id)
  };

  db_connect
    .collection("testLikes")
    .remove(likevalues, function (err, res) {
      if (err) throw err;
    });

  db_connect
    .collection("testEvents")
    .update({ _id: ObjectId( req.body.event_id)},
    {$pull:{"liked_by":{account_id:req.body.account_id}}});

  db_connect
    .collection("testEvents")
    .updateOne(myquery, newvalues, function (err, res) {
      if (err) throw err;
      console.log("1 document disliked");
      response.json(res);
    });
});

likedRoutes.route("/liked/:id").get(function (req, res) {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId( req.params.id )};
  db_connect
      .collection("testEvents")
      .findOne(myquery, function (err, result) {
        if (err) throw err;
        res.json(result);
      });
});
module.exports = likedRoutes;