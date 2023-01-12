require("dotenv").config();

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3000;
const routes = require("./routes/");
const connectDB = require("./config/config.js");
const mongoose = require("mongoose");
const { notFound, errorHandler } = require("./utils/errorHandler");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors())

mongoose.Promise = global.Promise;

connectDB();

app.use("/", routes);
app.use(notFound);
app.use(errorHandler);
app.listen(port, () => {
  console.log(`Node server is listening on port ${port}`);
});
