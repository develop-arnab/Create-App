"use strict";
const express = require("express");
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");
const fileRoutes = require("./routes/file-upload-routes");
const request = require("request");
const port = process.env.PORT || 8080;
const app = express();
var http = require("http");
app.use(cors());

require("./database")();

app.use(bodyParser.json());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(express.static(path.join(__dirname, "static")));
app.use("/api", fileRoutes.routes);

app.listen(port, () => {
  console.log(`server is listening on url http://localhost:${port}`);
  var clientServerOptions = {
    uri: "http://localhost:8080" + "/api/main",
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };
  request(clientServerOptions, function (error, response, body) {
    // response.send(body)
    // do something with the response
  });
  // var options = {
  //     host: 'http://localhost:8080',
  //     path: '/'
  //   };

  //   var req = http.get(options, function(res) {

  //   });
});
