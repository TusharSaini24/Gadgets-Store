const mongoose = require("mongoose");

const db = async () => {
  try {
    const host = await mongoose.connect(`${process.env.MONGO_URI}`, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log("connected to mongodb");
  } catch (err) {
    console.log(err);
  }
};

module.exports = db;
