const User = require("../models/users");
const url = process.env.DATABASE_URL || "mongodb://localhost:27017/test";

module.exports = (mongoose) => {
  mongoose
    .connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .catch((error) => console.error("Error connecting to DB: ", error));

  const db = mongoose.connection;
  db.on("error", console.error.bind(console, "connection error:"));

  return db;
};