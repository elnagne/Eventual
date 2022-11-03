const express = require('express');
// This router will act as a controller for accounts
const notificationsRoutes = express.Router();

// Used for connecting to the database
const dbo = require('../db/conn');

const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

// Creating a new account
notificationsRoutes.route('/notif/add').post((req, response) => {
    let dbConnect = dbo.getDb();
    let event = {
      event_id: req.body.event_id,
      event_name: req.body.event_name,
      time_created: req.body.time_created,
      description: req.body.description,
      title: req.body.title,
      liked_by: req.body.liked_by,
      joined_by: req.body.attending_users,

    };

      dbConnect.collection('notifications').insertOne(event, (err, res) => {
        if (err) throw err;
        response.json(res);
      });
  });

  // Export notificationsRoutes Router so we can use we different CRUD operations established in this file in server.js (see server.js line 10s)
module.exports = notificationsRoutes;