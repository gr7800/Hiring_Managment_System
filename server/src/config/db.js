const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const connectDB = async () => {
  try {
    const connect = await mongoose.connect(process.env.DB_URL);
    console.log(`Database Connected: ${connect.connection.host}`);
  } catch (err) {
    console.log("Failed to connect to the server");
    console.log(err.message);
    process.exit();
  }
};

module.exports = { connectDB };
