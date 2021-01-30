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

require('./auth/auth');

sequelize.sync({force:true})
.catch((e) => console.error("Failed to sync database: ", e))

const app = express();
app.use(helmet());
app.use(cors());
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use('/login', routes.auth);
app.use('/secure', passport.authenticate('jwt', {session: false}), routes.secure);

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({error: err});
})

app.get('/', (req, res) => {
  res.send("Hello World");
})

app.listen(PORT, IPADDRESS, () => {
  console.log(`Listening at http://${IPADDRESS}:${PORT}`);
})
