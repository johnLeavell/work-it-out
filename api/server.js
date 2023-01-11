require("dotenv").config();

const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3000;
const routes = require("./routes/");
const connectDB = require("./config/config.js");
const mongoose = require("mongoose");
const { notFound, errorHandler } = require("./utils/errorHandler");

mongoose.Promise = global.Promise;

connectDB();

app.use("/", routes);
app.use(notFound);
app.use(errorHandler);
app.listen(port, () => {
  console.log(`Node server is listening on port ${port}`);
});
