const express= require('express');
const pool = require('../connection');

const router = express.Router();

(async () =>{
    try {
        const connection = await pool.getConnection();
     
        router.post('/post', async (req, res) => {
          try {
              const connection = await pool.getConnection();
      
              // Obtener el estado del cuerpo de la solicitud
              const estado = req.body;
              //console.log("Motherfucker: ",estado);
      
              if (estado == undefined) {
                  res.status(400).json({ error: "El mensaje no puede estar vacío" });
                  return;
              }
              //console.log("Hello motherfucker");
              // Realizar la actualización en la base de datos
              const [results, fields] = await connection.query("UPDATE modos SET estadohogar = ? WHERE id = 1", [estado.estado]);
              console.log("Mensaje actualizado correctamente en la base de datos");

              const [results1, fields1] = await connection.query("UPDATE luces SET estadoluces = 0 WHERE id_bombillo IN (1, 2, 3)");

              const [results2, fields2] = await connection.query("UPDATE puertas SET estado = 0 WHERE id IN (1, 2, 3)");

              res.json({ estado: "Mensaje insertado correctamente en la base de datos" });
          } catch (error) {
              console.error("Error al insertar mensaje en la base de datos:", error);
              res.status(500).json({ error: "Error interno del servidor" });
          } finally {
              if (connection) {
                  connection.release();
              }
          }
      });

      router.post('/postModo0', async (req, res) => {
        try {
            const connection = await pool.getConnection();
    
            // Obtener el estado del cuerpo de la solicitud
            const estado = req.body;
            //console.log("Motherfucker: ",estado);
    
            if (estado == undefined) {
                res.status(400).json({ error: "El mensaje no puede estar vacío" });
                return;
            }
            //console.log("Hello motherfucker");
            // Realizar la actualización en la base de datos
            const [results, fields] = await connection.query("UPDATE modos SET estadohogar = ? WHERE id = 1", [estado.estado]);

            res.json({ estado: "Mensaje insertado correctamente en la base de datos" });
        } catch (error) {
            console.error("Error al insertar mensaje en la base de datos:", error);
            res.status(500).json({ error: "Error interno del servidor" });
        } finally {
            if (connection) {
                connection.release();
            }
        }
    });

        router.get('/get', async (req, res) => {
            try {
                const [rows, fields] = await connection.query("SELECT estadohogar FROM modos");
                console.log('Conexión exitosa con la base de datos');
                if (rows.length > 0) {
                    const value = rows[0].estadohogar; // Suponiendo que "estadohogar" es el nombre de la columna que deseas obtener
                    //console.log(value);
                    res.json({ value: value });
                } else {
                    res.json({ mensaje: 'No se encontraron resultados' });
                }
            } catch (error) {
                console.error('Error al conectar con la base de datos:', error);
                res.status(500).json({ error: 'Error interno del servidor' });
            }
        });
        
        connection.release();
      } catch (error) {
        console.error('Error connecting to the MySQL server:', error);
      }
})();

module.exports = router;