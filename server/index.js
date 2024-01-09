"use strict";
const express = require("express");
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");
const fileRoutes = require("./routes/file-upload-routes");
const request = require("request");
const port = 8080;
const app = express();
var http = require("http");
app.use(cors());
require("dotenv").config();
require("./database")();

app.use(bodyParser.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(express.static(path.join(__dirname, "static")));
app.use("/create",express.static(path.join(__dirname, "static/html/")));
app.use("/api", fileRoutes.routes);

app.listen(port, () => {
  console.log(`server is listening on url http://localhost:${port}`);
});
