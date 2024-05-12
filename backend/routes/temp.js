const express= require('express');
const pool = require('../connection');

const router = express.Router();

  (async () => {
    try {
      const connection = await pool.getConnection();
      console.log('Connected to the MySQL server.');
        //const connection = await pool.getConnection();
        router.get('/get-data', async (req, res)=>{
            //SELECT * FROM `local` ORDER BY `cedula` ASC
            query="SELECT * FROM temperatura where id=1";
            let rta = await connection.query(query);
            //console.log(rta[0][0]);
            res.status(200).send(rta[0][0]);
            
        });
  
        router.post('/update-data', async (req, res)=>{
            let temp=req.body;
            //UPDATE `temperatura` SET `referencia`='20',`valormedido`='27',`enable`='0' WHERE 1;
            query="UPDATE temperatura SET referencia=?,enable=? WHERE id=1";
            let rta= await connection.query(query,[temp.referencia,temp.enable]);
            //console.log(temp);
            res.status(200).send({message:"Se actualizo correctemente"});  
        });

        
      connection.release();    
    } catch (error) {
      console.error('Error connecting to the MySQL server:', error);
    }
  })();


module.exports = router;