const express = require('express');
const pool = require('../connection');

const router = express.Router();

router.post('/post', async (req, res) => {

    try {
        const connection = await pool.getConnection();
        const estado = req.body.estado;

        if (!estado) {
            res.status(400).json({ error: "El mensaje no puede estar vacío" });
            return;
        }

        // Verificar si la cédula ya existe en la base de datos
        const query1 = "SELECT cedula FROM invitado WHERE cedula = ?";
        const [rows, fields] = await connection.query(query1, [estado.cedula]);

        if (rows.length === 0) {
            // Si la cédula no existe, devolver un mensaje de error
            res.status(400).json({ error: "La cédula no está registrada" });
            return;
        }

        // Realizar la actualización en la base de datos
        //const query2 = "UPDATE smart_home.invitado SET nombre = ?, contrasena = UNHEX(SHA2(?, 256)), numero = ?, correo = ?, alarma = ?, luz1 = ?, luz2 = ?, luz3 = ?, puerta1 = ?, puerta2 = ?, puerta3 = ?, temperatura = ? WHERE cedula = ?";
        const query2 = "UPDATE smart_home.invitado SET nombre = ?, numero = ?, correo = ?, alarma = ?, luz1 = ?, luz2 = ?, luz3 = ?, puerta1 = ?, puerta2 = ?, puerta3 = ?, temperatura = ? WHERE cedula = ?";

        const { cedula, ...restoEstado } = estado; // excluyendo la cédula
        const values = [
            restoEstado.nombre,
            //restoEstado.contrasena,
            restoEstado.numero,
            restoEstado.correo,
            restoEstado.alarma,
            restoEstado.luz1,
            restoEstado.luz2,
            restoEstado.luz3,
            restoEstado.puerta1,
            restoEstado.puerta2,
            restoEstado.puerta3,
            restoEstado.temperatura,
            cedula // pasando la cédula separadamente
        ];

        await connection.query(query2, values);
        
        res.status(200).send({ message: "Actualización exitosa" });

        // Liberar la conexión a la base de datos
        connection.release();
    } catch (error) {
        console.error("Error al actualizar en la base de datos:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});

module.exports = router;
