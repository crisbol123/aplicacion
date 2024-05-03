const express = require('express');
const pool = require('../connection');

const router = express.Router();

router.post('/post', async (req, res) => {
    try {
        const connection = await pool.getConnection();

        // Obtener el estado del cuerpo de la solicitud
        const estado = req.body.estado;
        //console.log("Estado en el servidor:", estado);

        if (!estado) {
            res.status(400).json({ error: "El mensaje no puede estar vacío" });
            return;
        }

        // Construir la consulta SQL dinámicamente
        const columns = Object.keys(estado);
        const values = Object.values(estado);

        const query = `INSERT INTO smarth_home.invitado (${columns.join(', ')}) VALUES (${Array(columns.length).fill('?').join(', ')})`;

        // Realizar la inserción en la base de datos
        const [results, fields] = await connection.query(query, values);
        res.json({ respuesta: "Mensaje insertado correctamente en la base de datos" });


        // Liberar la conexión a la base de datos
        connection.release();
    } catch (error) {
        console.error("Error al insertar mensaje en la base de datos:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});

module.exports = router;
