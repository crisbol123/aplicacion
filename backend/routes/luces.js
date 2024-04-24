const express= require('express');
const pool = require('../connection');

const router = express.Router();

(async () => {
    try {
      const connection = await pool.getConnection();
      console.log('Connected to the MySQL server.');
   
      router.post('/actualizarEstado', async (req, res)=>{
        let alarma = req.body;
        query = "insert into sensor(estado) value (?)";
        let rta = await connection.query(query, [alarma.estado]);
        console.log(rta);
        res.status(200).send({message:"okay",idInsert:rta[0].insertId});
        })
   
        router.get('/recibirEstado', async (req, res)=>{
          let alarma = req.body;
          query = "select estado from sensor where id = ?";
          let rta = await connection.query(query, [alarma.id]);
          console.log(rta);
          
          res.status(200).send({message:"okayy",estado: rta[0][0].estado});
          })
      connection.release();
    } catch (error) {
      console.error('Error connecting to the MySQL server:', error);
    }
  })();


  module.exports = router;