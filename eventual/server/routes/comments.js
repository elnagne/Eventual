const express = require("express");
const dbo = require("../db/conn");
const ObjectId = require("mongodb").ObjectId;
const commentsRoutes = express.Router();

// Adding a new comment to an event
commentsRoutes.route("/comments/addComment").post((req, response) => {
    const dbConnect = dbo.getDb();
    const eventsCollection = dbConnect.collection('testEvents');

    const eventId = ObjectId(req.body.eventId);
    const payload = {
        userId: ObjectId(req.body.userId),
        comment: req.body.comment
    }
    
    eventsCollection.update({_id: eventId}, {$push:{"comments":payload}}, (err, res) => {
        if (err) throw err;
        res.message = 'Added comment';
        response.json(res);
    });

});

module.exports = commentsRoutes;