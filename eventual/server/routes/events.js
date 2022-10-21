const express = require('express');

// This router will act as a controller for accounts
const eventsRoutes = express.Router();

// Used for connecting to the database
const dbo = require('../db/conn');

const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

// Creating a new account
eventsRoutes.route('/testEvents/add').post((req, response) => {
  let dbConnect = dbo.getDb();
  let event = {
    event_name: req.body.event_name,
    description: req.body.description,
    author: req.body.author,
    image_url: req.body.image_url,
    email: req.body.email,
    phone: req.body.phone,
    date_of_event: req.body.date_of_event,
    time_of_event: req.body.time_of_event,
    num_slots: req.body.num_slots,
    woman_only: req.body.woman_only,
    location: req.body.location,
    category: req.body.category,
    num_likes: 0,
    num_joined: 0,
    liked_by: [],
    attending_users: [],
  };
  dbConnect.collection('testEvents').insertOne(event, (err, res) => {
    if (err) throw err;
    response.json(res);
  });
});

// Export eventsRoutes Router so we can use we different CRUD operations established in this file in server.js (see server.js line 10s)
module.exports = eventsRoutes;
