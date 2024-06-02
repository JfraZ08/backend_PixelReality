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
  let sql = 'SELECT * FROM pixelreality.drone';
  console.log(sql);
  db.query(sql, (err, results) => {
    if (err) {
      res.status(500).send('Erreur lors de la récupération des drones')
    } else {
      res.send(results);
    }
  });
});

// Route pour envoyer un email
app.post('/api/mail', (req, res) => {
  console.log(req.body);
  const transporter = nodemailer.createTransport({
    host: '89.234.180.61',
    port: '25',
    secure: false, 
    // auth: {
    //   user: 'contact@jeremyfrazier.fr',
    //   pass: 'JfraZ*111100*'
    // }
  });

  const mailOptions = {
    from: req.body.email,
    to: 'contact@jeremyfrazier.fr',
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
