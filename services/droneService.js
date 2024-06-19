// services/droneService.js
const db = require('../config/dbConfig');
const { ViewDrone, PostDrone, DeleteDrone, UpdateDrone } = require('../sql/database');

exports.getAllDrones = (callback) => {
  db.query(ViewDrone, callback);
};

exports.createDrone = (drone, callback) => {
  db.query(PostDrone, [drone.nom, drone.description], callback);
};

exports.deleteDrone = (droneId, callback) => {
  db.query(DeleteDrone, [droneId], callback);
};

exports.updateDrone = (drone, callback) => {
  db.query(UpdateDrone, [drone.nom, drone.description, drone.droneId], callback);
};
