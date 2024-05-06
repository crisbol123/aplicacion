const express = require('express');
const pool = require('../connection');

const router = express.Router();

router.post('/post', async (req, res) => {
    try {
        const connection = await pool.getConnection();
        const cedula = req.body.cedula; // Obtener la cédula del cuerpo de la solicitud

        // Verificar si la cédula está presente en la solicitud
        if (!cedula) {
            return res.status(400).json({ error: "La cédula es requerida para eliminar el usuario" });
        }

        // Ejecutar la consulta para eliminar el usuario
        const query = "DELETE FROM smart_home.invitado WHERE cedula = ?";
        const [results, fields] = await connection.query(query, [cedula]);

        // Verificar si se eliminó correctamente el usuario
        if (results.affectedRows === 0) {
            // Si no se encontró ningún usuario con la cédula proporcionada
            return res.status(404).json({ message: "No se encontró ningún usuario con la cédula proporcionada" });
        }

        // Si se eliminó correctamente el usuario
        res.json({ message: "Usuario eliminado correctamente" });

        // Liberar la conexión a la base de datos
        connection.release();
    } catch (error) {
        console.error("Error al eliminar usuario:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});

module.exports = router;
