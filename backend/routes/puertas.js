const express= require('express');
const pool = require('../connection');

const router = express.Router();

(async () =>{
    try {
        const connection = await pool.getConnection();
        console.log('Connected to the MySQL server.');
        
        router.post('/post', async (req, res) => {
            let connection;
        
            try {
                connection = await pool.getConnection();
                
                // Obtener el estado y el id del cuerpo de la solicitud
                const estados = req.body;
      
                if (!Array.isArray(estados)) {
                    res.status(400).json({ error: "El cuerpo de la solicitud debe ser un arreglo de objetos" });
                    return;
                }
        
                // Construir la consulta SQL dinámica
                let sql = "UPDATE puertas SET estado = CASE id ";
        
                estados.forEach((estado, index) => {
                    sql += `WHEN ${estado.id} THEN ${estado.estado} `;
                });
        
                sql += "END";
        
                // Ejecutar la consulta SQL
                const [results, fields] = await connection.query(sql);
                console.log("Mensajes actualizados correctamente en la base de datos");
            
                res.json({ mensaje: "Estados de las puertas actualizados correctamente" });
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
                const [rows, fields] = await connection.query("SELECT id,estado FROM puertas");
                console.log('Conexión exitosa con la base de datos');
                console.log(rows);
                if (rows.length > 0) {
                    const value = rows; // Suponiendo que "estadohogar" es el nombre de la columna que deseas obtener
                    //console.log(value.id);
                    res.json(value);
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