const express= require('express');
const pool = require('../connection');

const router = express.Router();

(async () =>{
    try {
        const connection = await pool.getConnection();
        //console.log('Connected to the MySQL server.');

        router.get('/get', async (req, res) => {
            try {
                const [rows, fields] = await connection.query("SELECT * FROM invitado");
                console.log('Conexión exitosa con la base de datos');
                //console.log("Datos de la base de datos: ",rows);
                if (rows.length > 0) {
                    //const value = rows[0].estadohogar; // Suponiendo que "estadohogar" es el nombre de la columna que deseas obtener
                    //console.log(value);
                    res.json({ value: rows });
                    //console.log("Si hay datos");
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