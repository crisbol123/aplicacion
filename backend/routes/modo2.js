const express = require('express');
const pool = require('../connection');

const router = express.Router();

router.post('/post', async (req, res) => {
  let connection;
  try {
    connection = await pool.getConnection();

    // Obtener el estado del cuerpo de la solicitud
    const estado = req.body.estado;
    //console.log("Estado: ",estado);
    
    if(estado == 3){
        await connection.query("UPDATE modos SET estadohogar = ? WHERE id = 1", [estado]);
    }else{
        await connection.query("UPDATE modos SET estadohogar = ? WHERE id = 1", [estado]);
    }

    // Realizar la actualización en la base de datos
    res.json({ mensaje: "Mensaje actualizado correctamente en la base de datos" });
    connection.release();
  } catch (error) {
    console.error("Error al actualizar mensaje en la base de datos:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  } 
   
});

router.get('/get', async (req, res) => {
  let connection;
  try {
    connection = await pool.getConnection();
    const [rows] = await connection.query("SELECT estadohogar FROM modos");
    if (rows.length > 0) {
      const value = rows[0].estadohogar; // Suponiendo que "estadohogar" es el nombre de la columna que deseas obtener
      res.json({ value: value });
    } else {
      res.json({ mensaje: 'No se encontraron resultados' });
    }
    connection.release();
  } catch (error) {
    console.error('Error al conectar con la base de datos:', error);
    res.status(500).json({ error: 'Error interno del servidor' });
  } 
});


module.exports = router;