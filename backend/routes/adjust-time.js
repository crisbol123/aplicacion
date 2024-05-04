const express= require('express');
const pool = require('../connection');

const router = express.Router();

(async () =>{
    try {
        const connection = await pool.getConnection();
        console.log('Connected to the MySQL server.');

        router.post('/post', async (req, res) => {
            try {
                const connection = await pool.getConnection();
              // Obtener el estado del cuerpo de la solicitud
                const estado = req.body;
                //console.log(estado);
                if (estado == undefined) {
                    res.status(400).json({ error: "El mensaje no puede estar vacío" });
                    return;
                }

              // Realizar la actualización en la base de datos
              const [results, fields] = await connection.query("UPDATE tiempos SET subida = ?, bajada = ? WHERE id = 1", [estado.columna1,estado.columna2]);
              console.log("Mensaje actualizado correctamente en la base de datos");
      
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
            const [rows, fields] = await connection.query("SELECT * FROM tiempos");
            console.log('Conexión exitosa con la base de datos');
            
            if (rows.length > 0) {
                // Si hay filas en el resultado, obtén los valores de las columnas
                const fila = rows[0]; // Suponiendo que solo hay una fila en la tabla
                //console.log("FILA: ", fila);
                const columna1 = fila.subida; // Reemplaza 'nombre_columna1' con el nombre de tu primera columna
                const columna2 = fila.bajada; // Reemplaza 'nombre_columna2' con el nombre de tu segunda columna
                //console.log("Columna1: ",columna1);
                //console.log("Columna2: ",columna2);
    
                // Envía los valores como respuesta
                res.json({ columna1: columna1, columna2: columna2 });
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