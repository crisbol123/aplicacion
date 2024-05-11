const express= require('express');
const pool = require('../connection');

const router = express.Router();

  (async () => {
    try {
      const connection = await pool.getConnection();
      console.log('Connected to the MySQL server.');
        //const connection = await pool.getConnection();
        console.log('Connected to the MySQL server.');

        router.get('/login', async (req, res)=>{
          
          let admin=req.body;
          query="select cedula global where cedula=?";
          let rta = await connection.query(query);        
          if(rta[0].length>0){
            "SELECT IF(UNHEX(SHA2('SomePassword', 256)) = `contraseña`, '1', '0') AS Resultado FROM `local` WHERE `cedula` = 456411;"
            query="SELECT IF(UNHEX(SHA2('SomePassword', 256)) = contraseña, '1', '0') AS Resultado FROM global WHERE cedula = ?;"
            let rta1 = await connection.query(query); 
            console.log(rta1);
            res.status(200).send("1");
          }else{
            query="select cedula local where cedula=?";
            let rta = await connection.query(query);
            if(rta[0].length>0){
                "SELECT IF(UNHEX(SHA2('SomePassword', 256)) = `contraseña`, '1', '0') AS Resultado FROM `local` WHERE `cedula` = 456411;"
                query="SELECT IF(UNHEX(SHA2('SomePassword', 256)) = contraseña, '1', '0') AS Resultado FROM local WHERE cedula = ?;"
                let rta1 = await connection.query(query); 
                console.log(rta1);
                res.status(200).send("1");
            }else{
                
            } 
          }
        });

        router.get('/buscar', async (req, res)=>{
          //SELECT * FROM `local` ORDER BY `cedula` ASC

          query="SELECT * FROM local ORDER BY cedula ASC";
          let rta = await connection.query(query);
          console.log(rta[0][1]);
          res.status(200).send(rta[0]);
          
        });
        // Liberar la conexión a la base de datos
        connection.release();    
    } catch (error) {
      console.error('Error connecting to the MySQL server:', error);
    }
  })();


  module.exports = router;