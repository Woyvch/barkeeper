const express = require("express");
const serveStatic = require("serve-static");
const path = require("path");
const port = process.env.PORT || 8080;

//if (process.env.NODE_ENV === 'development') require('dotenv').config();

// Connection to the database
const { Client } = require('pg');
const client = new Client({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false }
});
client.connect();
client.query('SELECT table_schema,table_name FROM information_schema.tables;', (err, res) => {
  if (err) throw err;
  for (let row of res.rows) {
    console.log(JSON.stringify(row));
  }
  client.end();
});

// Webapplication
const app = express();
//here we are configuring dist to serve app files
app.use("/", serveStatic(path.join(__dirname, "/dist")));
// this * route is to serve project on different page routes except root `/`
app.get(/.*/, function (req, res) {
  res.sendFile(path.join(__dirname, "/dist/index.html"));
});

app.listen(port);
console.log(`app is listening on port: ${port}`);
