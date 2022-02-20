const mongoose = require("mongoose");

var mongoURL = 'mongodb+srv://haripriya9620:gowtham123@cluster0.h2iiz.mongodb.net/pizzahub'

mongoose.connect(mongoURL, { useUnifiedTopology: true, useNewUrlParser: true });

var db = mongoose.connection;

db.on("connected", () => {
  console.log("Mongo DB Connection Successfull");
});

db.on("error", () => {
  console.log(`Mongo DB Connection failed`);
});

module.exports = mongoose;
