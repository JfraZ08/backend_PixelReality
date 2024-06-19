// controllers/droneController.js
const droneService = require('../services/droneService');

exports.getAllDrones = (req, res) => {
  droneService.getAllDrones((err, results) => {
    if (err) {
      res.status(500).send('Erreur lors de la récupération des drones');
    } else {
      res.send(results);
    }
  });
};

exports.createDrone = (req, res) => {
  const { nom, description } = req.body;
  droneService.createDrone({ nom, description }, (err, result) => {
    if (err) {
      res.status(500).send('Erreur lors de l\'insertion du drone');
    } else {
      res.status(201).send({ id_drone: result.insertId, nom, description });
    }
  });
};

exports.deleteDrone = (req, res) => {
  const droneId = req.params.id;
  droneService.deleteDrone(droneId, (err) => {
    if (err) {
      res.status(500).send('Erreur lors de la suppression du drone');
    } else {
      res.status(200).send({ message: 'Drone supprimé avec succès' });
    }
  });
};

exports.updateDrone = (req, res) => {
  const droneId = req.params.id;
  const { nom, description } = req.body;
  droneService.updateDrone({ droneId, nom, description }, (err) => {
    if (err) {
      res.status(500).send('Erreur lors de la mise à jour du drone');
    } else {
      res.status(200).send({ message: 'Drone mis à jour avec succès' });
    }
  });
};
