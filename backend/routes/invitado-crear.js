const express = require('express');
const pool = require('../connection');

const router = express.Router();

router.post('/post', async (req, res) => {

    //console.log("Hello motherfucker");

    try {
        //console.log("Motherfucker");
        const connection = await pool.getConnection();
        // Obtener el objeto 'estado' del cuerpo de la solicitud
        const estado = req.body.estado;
        //console.log("Estado",estado);

        // Verificar si el objeto 'estado' está vacío
        if (!estado) {
            res.status(400).json({ error: "El mensaje no puede estar vacío" });
            return;
        }

        // Obtener la cédula del estado
        const cedula = estado.cedula;
        //console.log("Cedula: ",cedula);

        // Verificar si la cédula ya existe en la base de datos
        const query1 = "SELECT cedula FROM invitado WHERE cedula = ?";
        const [rows, fields] = await connection.query(query1, [cedula]);

        // Verificar si ya existe un registro con la misma cédula
        if (rows.length > 0) {
            // Si ya existe, devolver un mensaje de error
            return res.status(400).json({ message: "La cédula ya está registrada" })
        }

        // Si no existe, realizar la inserción en la base de datos
        const columns = Object.keys(estado);
        //console.log(columns);
        const values = Object.values(estado);

        const query2 = `INSERT INTO smart_home.invitado (${columns.join(', ')}) VALUES (${Array(columns.length).fill('?').join(', ')})`;
        const [results, fields2] = await connection.query(query2, values);
        res.json({ respuesta: "Mensaje insertado correctamente en la base de datos" })

        // Liberar la conexión a la base de datos
        connection.release();
    } catch (error) {
        console.error("Error al insertar mensaje en la base de datos:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});

module.exports = router;
