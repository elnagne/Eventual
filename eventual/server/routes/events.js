const express = require('express');

// This router will act as a controller for accounts
const eventsRoutes = express.Router();

// Used for connecting to the database
const dbo = require('../db/conn');

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
eventsRoutes.route('/testEvents/update/:id').post((req, response) => {
  let dbConnect = dbo.getDb();
  let event = dbConnect.collection('testEvents').findOne(req.params.id);
  if (!event) {
    response.status(404).send('data is not found');
  } else {
    event.event_name = req.body.event_name;
    event.description = req.body.description;
    event.author = req.body.author;
    event.image_url = req.body.image_url;
    event.email = req.body.email;
    event.phone = req.body.phone;
    event.date_of_event = req.body.date_of_event;
    event.time_of_event = req.body.time_of_event;
    event.num_slots = req.body.num_slots;
    event.woman_only = req.body.woman_only;
    event.location = req.body.location;
    event.category = req.body.category;
    event.num_likes = 0;
    event.num_joined = 0;
    event.liked_by = [];
    event.attending_users = [];
    event.updateOne();
  }
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
