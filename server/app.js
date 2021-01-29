require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const sequelize = require('./config/db');
const routes = require('./routes/index');
const PORT = process.env.PORT || 5000;
const IPADDRESS = process.env.IPADDRESS || 'localhost';

sequelize.sync({force:true})
.catch((e) => console.error("Failed to sync database: ", e))

const app = express();
app.use(helmet());
app.use(cors());
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use('/user', routes.user);

app.get('/', (req, res) => {
  res.send("Hello World");
})

app.listen(PORT, IPADDRESS, () => {
  console.log(`Listening at http://${IPADDRESS}:${PORT}`);
})
