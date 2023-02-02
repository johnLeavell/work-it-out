require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const { notFound, errorHandler } = require("./utils/errorHandler");
const connectDB = require("./config/config.js");
const routes = require("./routes/");

const app = express();
const port = process.env.PORT || 3000;

connectDB();

app
  .use(bodyParser.urlencoded({ extended: true }))
  .use(bodyParser.json())
  .use(cors())
  .use("/", routes)
  .use(notFound)
  .use(errorHandler)
  .listen(port, () => console.log(`Node server is listening on port ${port}`));
