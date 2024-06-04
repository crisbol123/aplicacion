const express= require('express');
const pool = require('../connection');

const router = express.Router();

(async () => {
    try {
      const connection = await pool.getConnection();
      //console.log('Connected to the MySQL server.');
   
    
      router.get('/recibirTiempos', async (req, res)=>{
        let alarma =req.query;
        query = "SELECT tluces, tpuertas, talarma, tventilador, tesp FROM consumos WHERE id IN (1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12);"
        let rta = await connection.query(query, [alarma.id]);
        //console.log(rta[0]);
        res.status(200).send(rta[0]);
        });
  


     


            connection.release();
    } catch (error) {
      console.error('Error connecting to the MySQL server:', error);
    }
   
  })();

  module.exports = router;