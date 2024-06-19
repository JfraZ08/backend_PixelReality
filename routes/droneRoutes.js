// routes/droneRoutes.js
const express = require('express');
const router = express.Router();
const droneController = require('../controllers/droneController');

router.get('/drones', droneController.getAllDrones);
router.post('/drones', droneController.createDrone);
router.delete('/drones/:id', droneController.deleteDrone);
router.put('/drones/:id', droneController.updateDrone);

module.exports = router;
