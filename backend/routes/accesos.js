const express= require('express');
const pool = require('../connection');

const router = express.Router();

(async () => {
    try {
      const connection = await pool.getConnection();
      //console.log('Connected to the MySQL server.');
   
        router.get('/recibirAccesos', async (req, res)=>{
          let user =req.query;
          query = "SELECT luz1, luz2, luz3, puerta1, puerta2, puerta3, temperatura, alarma FROM invitado WHERE cedula = ?";
          let rta = await connection.query(query, [user.cedula]);
          console.log(rta[0][0]);
          res.status(200).send(rta[0][0]);
          })
      connection.release();
    } catch (error) {
      console.error('Error connecting to the MySQL server:', error);
    }
  })();

 




  module.exports = router;