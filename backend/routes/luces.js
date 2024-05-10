const express= require('express');
const pool = require('../connection');

const router = express.Router();

(async () => {
    try {
      const connection = await pool.getConnection();
      console.log('Connected to the MySQL server.');
   
      router.post('/actualizarEstado', async (req, res) => {
        let luces = req.body;
        query = "UPDATE luces SET estado = ? WHERE id_bombillo = ?";
        let rta = await connection.query(query, [luces.estado, luces.id_bombillo]);
        console.log(rta);
        res.status(200).send({ message: "okay", idInsert: rta[0].insertId });
    })
    
   
        router.get('/recibirEstado', async (req, res)=>{
          let alarma =req.query;
          query = "select t1.id_bombillo, t1.fecha_estado, t1.estado FROM sensor t1 INNER JOIN (SELECT id_bombillo, MAX(id) AS max_id FROM sensor GROUP BY id_bombillo) t2 ON t1.id_bombillo = t2.id_bombillo AND t1.id = t2.max_id ORDER BY t1.id_bombillo";
          let rta = await connection.query(query, [alarma.id]);
          console.log(rta[0]);
          let data_rta =arreglarData(rta[0]);
          res.status(200).send(data_rta);
          })
      connection.release();
    } catch (error) {
      console.error('Error connecting to the MySQL server:', error);
    }
  })();

  function arreglarData(data){
    let retorno = [];
    data.forEach(element => {
      retorno.push({id_bombillo: element.id_bombillo, fecha_estado: element.fecha_estado, estado: element.estado});
    });
return retorno;
  }




  module.exports = router;