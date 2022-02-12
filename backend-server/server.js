// load .env data into process.env
require("dotenv").config();

// Web server config
const PORT = process.env.PORT || 8080;
const express = require("express");
const app = express();
const morgan = require("morgan");

// PG database client/connection setup
const { Pool } = require("pg");
const dbParams = require("./lib/db.js");
const db = new Pool(dbParams);
db.connect();

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
// The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan("dev"));

app.use(express.urlencoded({ extended: true }));

// app.use(express.static("public"));

// Routes
const usersRoutes = require("./routes/users");

// Mount all resource routes
app.use("/api/users", usersRoutes(db));

app.get("/", (req, res) => {
  res.send("skadoosh");
});

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
