const express = require("express");
const app = express();
const cors = require("cors");
require("dotenv").config({ path: "./config.env" });
const port = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());

// different routes - for now we just have accounts (accounts.js), when adding more accounts add it here
app.use(require("./routes/accounts"));
app.use(require("./routes/search"));

// get driver connection
const dbo = require("./db/conn");

// app.listen starts a server using the express app created on line 2 (see express docs for more info)
app.listen(port, () => {
  // perform a database connection when server starts
  dbo.connectToServer(function (err) {
    if (err) console.error(err);

  });
  console.log(`Server is running on port: ${port}`);
});