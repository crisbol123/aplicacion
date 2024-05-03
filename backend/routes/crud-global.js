const express= require('express');
const pool = require('../connection');

const router = express.Router();

(async () => {
    try {
      const connection = await pool.getConnection();
      console.log('Connected to the MySQL server.');
      let user=req.body;
        query="select cedula, nombre, contraseña, numero, correo from usuarios where correo=?";


        
      router.post('/actualizarEstadoAlarma', async (req, res)=>{
        let alarma = req.body;
        query="insert into usuarios(cedula, nombre, contraseña, numero, correo) value (?,?,?,?,?)";
        let rta = await connection.query(query, [alarma.estado]);
        console.log(rta);
        res.status(200).send({message:"okay",idInsert:rta[0].insertId});
        })
   
        router.get('/recibirEstadoAlarma', async (req, res)=>{
          let alarma =req.query;
          query = "SELECT estado, fecha_estado FROM alarma ORDER BY id DESC LIMIT 1;";
          let rta = await connection.query(query, [alarma.id]);
          console.log(rta[0][0]);
          res.status(200).send(rta[0][0]);
          })
      connection.release();
    } catch (error) {
      console.error('Error connecting to the MySQL server:', error);
    }
  })();

 




  module.exports = router;