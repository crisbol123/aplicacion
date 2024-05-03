const express= require('express');
const pool = require('../connection');

const router = express.Router();

router.post('/crear-admin-local', async (req, res)=>{
    try {
      const connection = await pool.getConnection();
      console.log('Connected to the MySQL server.');

      
      router.post('/crear-admin-local', async (req, res)=>{
        let admin=req.body;
        
        query="select cedula, nombre, contraseña, numero, correo from local where cedula=?";
        
        connection.query(query,[admin.cedula],(err, results)=>{
        console.log('aslmlkadlknsadlk');
          if(!err){
            if(results==""){
              query="insert into local(cedula, nombre, contraseña, numero, correo) value (?,?,?,?,?)";            
              let rta= connection.query(query,[admin.cedula,admin.nombre,admin.contraseña,admin.numero,admin.correo],(err,results)=>{
                  if(!err){
                      return res.status(200).json({message:"Successfully registered."},results,rta);
                  }else{
                      return res.status(500).json(err,results,rta);
                  }
              })
            }else{
              return res.status(400).json({message:"ID already exist"});
              
            }            
          }else{
            return res.status(500).json(err);
          }  

        })
   
        
      connection.release();
    } catch (error) {
      console.error('Error connecting to the MySQL server:', error);
    }
  });

 




  module.exports = router;