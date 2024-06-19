// app.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
const droneRoutes = require('./routes/droneRoutes');
const app = express();
const port = 3000;

app.use(express.static('public'));
app.use(express.json());
app.use(cors());

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Credentials", "true");
  res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
  next();
});

app.use('/api', droneRoutes);

app.listen(port, () => {
  console.log(`Serveur backend démarré sur le port ${port}`);
});
