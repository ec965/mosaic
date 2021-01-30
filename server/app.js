require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const sequelize = require('./config/db');
const routes = require('./routes/index');
const passport = require('passport');
const PORT = process.env.PORT || 5000;
const IPADDRESS = process.env.IPADDRESS || 'localhost';

// passport strategies
require('./auth/auth'); 

sequelize.sync({force:false})
.catch((e) => console.error("Failed to sync database: ", e))

const app = express();
app.use(helmet());
app.use(cors());
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use('/auth', routes.auth);
app.use('/app', passport.authenticate('jwt', {session: false}), routes.app);

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({message: "An error occured."});
})
app.get('/', (req, res) => {
  res.send("Hello World");
})

app.listen(PORT, IPADDRESS, () => {
  console.log(`Listening at http://${IPADDRESS}:${PORT}`);
})
