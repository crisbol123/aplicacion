const express= require('express');
const pool = require('../connection');

const router = express.Router();

  (async () => {
    try {
      const connection = await pool.getConnection();
      console.log('Connected to the MySQL server.');
        //const connection = await pool.getConnection();
        console.log('Connected to the MySQL server.');

        router.get('/log', async (req, res)=>{
          
          let admin=req.body;
          query="select cedula from global where cedula=?";
          let rta = await connection.query(query,[admin.cedula]);        
          if(rta[0].length>0){
            //"SELECT IF(UNHEX(SHA2('SomePassword', 256)) = `contraseña`, '1', '0') AS Resultado FROM `local` WHERE `cedula` = 456411;"
            query="SELECT IF(UNHEX(SHA2(?, 256)) = contraseña , '1', '0') AS Resultado FROM global WHERE cedula=?";
            let rta1 = await connection.query(query,[admin.contraseña,admin.cedula]); 
            console.log(rta1[0][0].Resultado);
            if(rta1[0][0].Resultado=="1"){
              //console.log("hola");
              res.status(200).send("global");
            }else{
              res.status(400).send("Credenciales incorrectos");
            }
          }else{
            query="select cedula from local where cedula=?";
            let rta = await connection.query(query,[admin.cedula]);
            if(rta[0].length>0){
                //"SELECT IF(UNHEX(SHA2(SomePassword, 256)) = `contraseña`, '1', '0') AS Resultado FROM `local` WHERE `cedula` = 456411;"
                query="SELECT IF(UNHEX(SHA2(?, 256)) = contraseña , '1', '0') AS Resultado FROM local WHERE cedula=?";
                let rta1 = await connection.query(query,[admin.contraseña,admin.cedula]); 
                console.log(rta1[0][0].Resultado);
                if(rta1[0][0].Resultado=="1"){
                  //console.log("hola");
                  res.status(200).send("local");
                }else{
                  res.status(400).send("Credenciales incorrectos");
                }
            }else{
              res.status(400).send("Credenciales incorrectos");
            } 
          }
        });

        connection.release();    
    } catch (error) {
      console.error('Error connecting to the MySQL server:', error);
    }
  })();


module.exports = router;