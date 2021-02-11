require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const bodyParser = require("body-parser");
const passport = require("passport");
const mongoose = require("mongoose");
const path = require("path");

const routes = require("./routes/index");
const PORT = process.env.PORT || 5000;

// connect to the DB
const db = require("./config/db")(mongoose);

// passport strategies
require("./auth/auth");

const app = express();
app.use(helmet());
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      ...helmet.contentSecurityPolicy.getDefaultDirectives(),
      "img-src": ["'self'", "data:", "blob:", "mosaiorama.herokuapp.com"],
    },
  })
);
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/api/auth", routes.auth);
app.use(
  "/api/app",
  passport.authenticate("jwt", { session: false }),
  routes.app
);
app.use(
  "/api/project",
  passport.authenticate("jwt", { session: false }),
  routes.project
);
app.use(
  "/api/password",
  passport.authenticate("jwt", { session: false }),
  routes.password
);
app.use(
  "/api/validate",
  passport.authenticate("jwt", { session: false }),
  routes.validate
);

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "client/build")));
  app.get("/*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client/build", "index.html"));
  });
}

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: err.toString() });
});

app.listen(PORT, () => {
  console.log(`Listening at port: ${PORT}`);
});
