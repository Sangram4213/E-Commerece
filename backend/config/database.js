const mongoose = require("mongoose");
const dotenv = require("dotenv").config();

const connectDataBase = () => {
  mongoose
    .connect(process.env.DB_URI)
    .then((data) => {
      console.log(`MongoDB connected with server: ${data.connection.host}`);
    })
};

module.exports = connectDataBase;
