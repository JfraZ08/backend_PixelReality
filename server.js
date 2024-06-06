const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const nodemailer = require('nodemailer');
const path = require('path');
const cors = require('cors');

const app = express();
const port = 3000;  // Vous pouvez changer ce port si nécessaire

app.use(bodyParser.json());
app.use(express.static('public'));
app.use(express.json());

const corpsOptions = {
  origin: 'http://localhost:5173',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  allowedHeaders: ['Content-type', 'Authorization']
};

const ViewDrone = 'SELECT * FROM pixelreality.drone';
const PostDrone = 'INSERT INTO pixelreality.drone (nOM,description) VALUES (?,?)';
const DeleteDrone = 'DELETE FROM pixelreality.drone WHERE id_drone = ?';
const UpdateDrone = 'UPDATE pixelreality.drone SET nom = ?, description = ? WHERE id_drone = ?  '
app.use(cors(corpsOptions));

// Configurer la connexion à la base de données
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '1234',
  database: 'pixelreality'
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
  let sql = ViewDrone;
  console.log(sql);
  db.query(sql, (err, results) => {
    if (err) {
      res.status(500).send('Erreur lors de la récupération des drones')
    } else {
      res.send(results);
    }
  });
});

app.post('/api/drones', (req, res) => {
  console.log(req.body)
  const { nom, description } = req.body ;
  let sql = PostDrone;
  db.query(sql, [nom, description], (err, result) => {
    if(err)
      {
        console.log('Erreur lors de l\'insertion du drone dans la base de donées: ', err);
        res.status(500).send('Erreur lors de l\insertion du drone');
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

// Route pour envoyer un email
app.post('/api/mail', (req, res) => {
  console.log(req.body);
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    auth: {
      user: 'testpixelreality@gmail.com',
      pass: 'TestPixel38+'
    }
  });

  const mailOptions = {
    from: req.body.email,
    to: 'testpixelreality@gmail.com',
    subject: `Message from ${req.body.email}: ${req.body.subject}`,
    text: req.body.message
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.send('error');
    } else {
      console.log('Email sent: ' + info.response);
      res.send('success');
    }
  });
});

// Route pour la page de contact (doit être placée après les autres routes)
app.get('/api/mail', (req, res) => {
  res.sendFile(path.join(__dirname, '../src/views/ContactView.vue')); 
});

app.listen(port, () => {
  console.log(`Serveur backend démarré sur http://localhost:${port}`);
});

// créer un fichier pour récupérer le mail
