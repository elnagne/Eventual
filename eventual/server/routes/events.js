const express = require('express');

// This router will act as a controller for accounts
const eventsRoutes = express.Router();

// Used for connecting to the database
const dbo = require('../db/conn');

const ObjectId = require('mongodb').ObjectId;

const bodyParser = require('body-parser');
const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

const got = require('got');
const { response } = require('express');
const psApiKey = process.env.POSITIONSTACK_API_KEY;

// sends email to all users who have joined _id = id event with event_name as subject and text as formatted event information
async function send_event(id, update) {
  const dbConnect = dbo.getDb();
  // TODO switch to non-test events for release

  var sentAll = true;

  dbConnect
  .collection("testEvents")
  .findOne({ _id: ObjectId(id), }).then((event) => {
    console.log(event.attending_users);
    for (const user of event.attending_users) {
      console.log(user.account_id);
      dbConnect.collection("mockUsers").findOne({ _id: ObjectId(user.account_id), }).then((user) => {
        if (user == null) {
            response.status(403).send('Email not found');
        } else {
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                secure: 'true',
                auth: {
                    user: `${process.env.EMAIL}`,
                    pass: `${process.env.PASSWORD}`
                }
            });

            console.log("Creating message");

            text = "";

            if (update)
              text += "This message is because the event you are following has updated their event information\n\n"

            text += "<b>Description: </b>" + event.description + "\n"
                  + "<b>Location: </b>" + event.location + "\n"
                  + "<b>Author: </b>" + event.author + "\n"
                  + "<b>Date: </b>" + event.date_of_event + "\n"
                  + "<b>Time: </b>" + event.time_of_event + "\n"
                  + "<b>Email: </b>" + event.email + "\n"
                  + "<b>Phone number: </b>" + event.phone + "\n"
                  + "<b>Number of Slots: </b>" + event.num_slots + "\n"
                  + "<b>Woman Only: </b>" + event.woman_only + "\n";

            console.log("Creating mail options");

            const mailOptions = {
                from: `${process.env.EMAIL}`,
                to: `${user.email}`,
                subject: event.event_name,
                text: text
            };

            console.log("Sending email");

            transporter.sendMail(mailOptions, (err, response) => {
                if (err) {
                    console.error("Could not send to " + user.email + ":", err);
                    sentAll = false;
                } else {
                    console.log('email sent');
                }
            });
        }
    });
  }});

  if (sentAll)
    return true;
  else
    return false;
}

// Uses the positionstack API to get address data (longitude, latitude, city, country)
async function getAddressData(address) {
  var addressData = null;
  const url =
    'http://api.positionstack.com/v1/forward?access_key=' +
    encodeURIComponent(psApiKey) +
    '&query=' +
    encodeURIComponent(address) +
    '&limit=1'; // Limit the number of results to 1 (for now)
  await got
    .get(url)
    .then((res) => {
      addressData = JSON.parse(res.body);
    })
    .catch((err) => {
      console.log('Positionstack error: ' + err.message);
    });
  return addressData;
}

// Updating a new account
eventsRoutes.route('/testEvents/update/:id').post((req, res) => {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId(req.params.id) };
  db_connect.collection('testEvents').replaceOne(myquery, {
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
    num_likes: req.body.num_likes,
    num_joined: req.body.num_joined,
    liked_by: req.body.liked_by,
    attending_users: req.body.attending_users,
  }).then(() => {
    result = send_event(req.params.id, true);
    if (result)
      res.json("Sent All Emails");
    else
      res.json("Couldn't send all Emails");
  });
});

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

  getAddressData(req.body.location).then((address_data) => {
    console.log(address_data);
    if (address_data && address_data.data && address_data.data.length) {
      event.address_data = address_data.data[0];
    }

    dbConnect.collection('testEvents').insertOne(event, (err, res) => {
      if (err) throw err;
      response.json(res);
    });
  });
});

// Export eventsRoutes Router so we can use we different CRUD operations established in this file in server.js (see server.js line 10s)
module.exports = eventsRoutes;
