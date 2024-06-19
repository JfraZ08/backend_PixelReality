const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
// const bodyParser = require('body-parser');
const mysql = require('mysql2');
const cors = require('cors');
const app = express();
const port = 3000;  // Vous pouvez changer ce port si nécessaire
// const jwt = require('jsonwebtoken');
// const bcrypt = require('bcrypt');

// app.use(bodyParser.json());
app.use(express.static('public'));
app.use(express.json());
app.use(cors());

app.use((req, response, next) => {
  response.setHeader("Access-Control-Allow-Origin", "*");
response.setHeader("Access-Control-Allow-Credentials", "true");
response.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
response.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
  next();
})








const db = mysql.createConnection({
  host: process.env.DB_HOST_DEV,
  user: process.env.DB_USER_DEV,
  password: process.env.DB_PASSWORD_DEV,
  database: process.env.DB_NAME_DEV
});

db.connect((err) => {
  if (err) {
    console.log('Erreur de connexion à la base de données :', err);
  } else {
    console.log('Connecté à la base de données MySQL');
  }
});

// Exemple de route pour obtenir les drones
app.get('/api/drones', (req, res) => {
  let sql = ViewDroneDrone;
  db.query(sql, (err, results) => {
    if (err) {
      res.status(500).send('Erreur lors de la récupération des drones')
    } else {
      res.send(results);
    }
  });
});

app.post('/api/drones', (req, res) => {
  const { nom, description } = req.body ;
  let sql = PostDrone;
  db.query(sql, [nom, description], (err, result) => {
    if(err)
      {
        res.status(500).send('Erreur lors de l\'insertion du drone');
      }
      else 
      {
        res.status(201).send({ id_drone:result.insertId, nom, description});
      }
  })
});

app.delete('/api/drones/:id', (req, res) => {
  const droneId = req.params.id;
  let sql= DeleteDrone;

  db.query(sql, [droneId], (err, result) => {
    if (err) {
      console.log('Erreur lors de la suppression du drone :', err);
      res.status(500).send('Erreur lors de la suppression du drone');
    } else {
      res.status(200).send({message: 'Drone supprimé avec succès'})
    }  
  })
})

app.put('/api/drones/:id', (req, res) => {
  const { id_drone } = req.params;
  const { nom, description } = req.body
  let sql = UpdateDrone;
  db.query(sql, [nom, description, id_drone], (err, result) => {
    if (err) {
      console.log('Errer lors de la mise à jour du drone :', err)
      res.status(500).send('Erreir lors de la mise à jour du drone')
    }
    else {
      res.status(200).send({ message : 'Drone mis à jour avec succès'})
    }
  })
})


app.listen(port, () => {
  console.log(`Serveur backend démarré sur le port ${port}`);
});

// créer un fichier pour récupérer le mail
