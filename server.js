const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');

const app = express();
const port = 3000;


app.use(bodyParser.json());

// Configurer la connexion à la base de données
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: 'pixelreality'
});

db.connect((err) => { // test de la connexion
  if (err) {
    console.log('Erreur de connexion à la base de données :', err);
  } else {
  console.log('Connecté à la base de données MySQL');
  }
});

// Exemple de route pour obtenir les projets
app.get('/api/drones', (req, res) => {
  let sql = 'select*from pixelreality.drone'; // requête permettant de récupéer les infos demandés sur les pages cocnernées
  console.log(sql)
  db.query(sql, (err, results) => {
    if (err) 
      throw err;
    else
    res.send(results);
  });
});

app.listen(port, () => {
  console.log(`Serveur backend démarré sur http://localhost:${port}`);
});
