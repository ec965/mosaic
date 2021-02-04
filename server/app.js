require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const passport = require('passport');
const mongoose = require('mongoose');

const routes = require('./routes/index');
const PORT = process.env.PORT || 5000;
const IPADDRESS = process.env.IPADDRESS || 'localhost';

// connect to the DB
const db = require('./config/db')(mongoose);

// passport strategies
require('./auth/auth');

const app = express();
app.use(helmet());
app.use(cors());
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use('/auth', routes.auth);
app.use('/app', passport.authenticate('jwt', {session: false}), routes.app);
app.use('/project', passport.authenticate('jwt', {session: false}), routes.project)

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({message: err.toString()});
})

app.get('/', (req, res) => {
  res.send("Hello World");
})

app.listen(PORT, IPADDRESS, () => {
  console.log(`Listening at http://${IPADDRESS}:${PORT}`);
})
