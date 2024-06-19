const ViewDrone = 'SELECT * FROM pixelreality.drone';
const PostDrone = 'INSERT INTO pixelreality.drone (nom,description) VALUES (?,?)';
const DeleteDrone = 'DELETE FROM pixelreality.drone WHERE id_drone = ?';
const UpdateDrone = 'UPDATE pixelreality.drone SET nom = ?, description = ? WHERE id_drone = ?  '