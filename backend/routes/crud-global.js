const express= require('express');
const pool = require('../connection');

const router = express.Router();

(async () => {
    try {
      const connection = await pool.getConnection();
      console.log('Connected to the MySQL server.');

      router.post('/crear-admin-local', async (req, res)=>{
        let admin=req.body;
        query="select cedula, nombre, contraseña, numero, correo from local where cedula=?";
        
        
        query="select cedula, nombre, contraseña, numero, correo from local where cedula=?";
              //query="insert into local(cedula, nombre, contraseña, numero, correo) value (?,?,?,?,?)";            
        let rta= await connection.query(query,[admin.cedula]);    
        console.log(rta[0]);
        if(rta[0].length>0){
          return res.status(200).json({message:"Cedula ya registrada"});
        }
        query="insert into local(cedula, nombre, contraseña, numero, correo) value (?,?,?,?,?)"; 
        rta= await connection.query(query,[admin.cedula,admin.nombre,admin.contraseña,admin.numero,admin.correo]);
        

        res.status(200).json({message:"Successfully registered."});
              
              
      // Liberar la conexión a la base de datos
      connection.release();  
      
    } catch (error) {
      console.error('Error connecting to the MySQL server:', error);
    }
  });

 




  module.exports = router;