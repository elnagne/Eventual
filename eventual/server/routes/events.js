const express = require('express');
const nodemailer = require('nodemailer');

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
const psApiKey = process.env.POSITIONSTACK_API_KEY;

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
    num_likes: 0,
    num_joined: 0,
    liked_by: [],
    attending_users: [],
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

// sends email to all users in req.body._id event with req.body.subject as subject and req.body.text as message
eventsRoutes.route('/receive-response/:id').post(async (req, response) => {
  const dbConnect = dbo.getDb();
  // TODO switch to non-test events for release

  var sentAll = true;

  dbConnect
  .collection("testEvents")
  .findOne({ _id: ObjectId(req.params.id), }).then((event) => {
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

            const mailOptions = {
                from: `${process.env.EMAIL}`,
                to: `${user.email}`,
                subject: req.body.subject,
                text: req.body.text,
            };

            transporter.sendMail(mailOptions, (err, response) => {
                if (err) {
                    console.error("Could not send to " + user.email + ":", err);
                    sentAll = false;
                } else {
                    response.status(200).json('email sent');
                }
            });
        }
    });
  }});

  if (sentAll)
    response.status(200).json('Sent all emails');
  else
    response.status(404).json('Not all emails sent');
});

// Export eventsRoutes Router so we can use we different CRUD operations established in this file in server.js (see server.js line 10s)
module.exports = eventsRoutes;
