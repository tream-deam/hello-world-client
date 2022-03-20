// load .env data into process.env
require("dotenv").config();

// Web server config
const PORT = process.env.PORT || 8080;
const express = require("express");
const app = express();

const socketServer = require('./socketServer');

const cors = require("cors");
app.use(cors());

/* Uncomment when DB is required
// PG database client/connection setup
const { Pool } = require("pg");
const dbParams = require("./lib/db.js");
const db = new Pool(dbParams);
db.connect();
*/

app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// Routes
const usersRoutes = require("./routes/users");
// Mount all resource routes
// app.use("/api/users", usersRoutes(db));

// Twilio
const twilio = require("twilio");
const AccessToken = twilio.jwt.AccessToken;
const VideoGrant = AccessToken.VideoGrant;

const twilioAccountSid = process.env.TWILIO_ACCOUNT_SID;
const twilioApiKey = process.env.TWILIO_API_KEY;
const twilioApiSecret = process.env.TWILIO_API_SECRET;

app.get("/token/:identity", (req, res) => {
  const identity = req.params.identity;
  
  // create an access token which we will sign and return to the client,
  // containing the grant we just created
  const token = new AccessToken(
    twilioAccountSid,
    twilioApiKey,
    twilioApiSecret,
    );
    
    token.identity = identity;
    
    // Create Video Grant
    const videoGrant = new VideoGrant({
      room: 'dream-team',
    });
    
    // grant token access to the Video API Features
    token.addGrant(videoGrant);
    
    // serialize the token to a JWT string
    const myToken = token.toJwt();
    console.log('*********************');
    console.log('token:', myToken);
    
  res.send({
    identity,
    myToken
  });
});

const httpServer = app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});

// Handle webSocket connections
socketServer.listen(httpServer);