const express= require('express');
const pool = require('../connection');

const router = express.Router();

  (async () => {
    try {
      const connection = await pool.getConnection();
      console.log('Connected to the MySQL server.');
        //const connection = await pool.getConnection();
        console.log('Connected to the MySQL server.');

        router.post('/crear-admin-local', async (req, res)=>{
          
          let admin=req.body;
          query="select cedula, nombre, contraseña, numero, correo from local where cedula=?";            
          let rta= await connection.query(query,[admin.cedula]);    
          console.log(rta[0]);
          if(rta[0].length>0){
            res.status(200).send({message:"Cedula ya registrada"});
          }else{
            query="insert into local(cedula, nombre, contraseña, numero, correo) value (?,?,?,?,?)"; 
            rta= await connection.query(query,[admin.cedula,admin.nombre,admin.contraseña,admin.numero,admin.correo]);
            res.status(200).send({message:"Successfully registered."});
          }
        });

        /*router.get('/buscar', async (req, res)=>{
          let admin=req.body;
          query="select cedula, nombre, contraseña, numero, correo from local where cedula=?";
          let rta = await connection.query(query, [admin.cedula]);
          console.log(rta[0]);
          console.log(rta);
          if(rta[0].length>0){
            res.status(200).send(rta[0]);
          }else{
            res.status(400).send({message:"La cedula ingresada no existe en la base de datos"});
          }
        });*/
        router.get('/buscar', async (req, res)=>{
          //SELECT * FROM `local` ORDER BY `cedula` ASC

          query="SELECT * FROM local ORDER BY cedula ASC";
          let rta = await connection.query(query);
          console.log(rta[0][1]);
          res.status(200).send(rta[0]);
          
        });

        router.post('/actualizar', async (req, res)=>{
          let admin=req.body;
          query="select cedula, nombre, contraseña, numero, correo from local where cedula=?";            
          let rta= await connection.query(query,[admin.cedula]);    
          console.log(rta[0]);
          if(rta[0].length>0){
            query="UPDATE local SET nombre=? , contraseña=? , numero=? , correo=? WHERE cedula=?"
            //UPDATE `local` SET `nombre`='Cristian',`contraseña`='bombom',`numero`='3135489',`correo`='unicauca' WHERE `cedula`='1022579'
            
            rta= await connection.query(query,[admin.nombre,admin.contraseña,admin.numero,admin.correo,admin.cedula]);
            res.status(200).send({message:"Se actualizo correctemente"});
           
          }else{
            res.status(400).send({message:"La cedula ingresada no existe en la base de datos"});
          }
        });

        router.post('/eliminar', async (req, res)=>{
          let admin=req.body;
          query="select cedula, nombre, contraseña, numero, correo from local where cedula=?";            
          let rta= await connection.query(query,[admin.cedula]);    
          console.log(rta[0]);
          if(rta[0].length>0){
            query="DELETE FROM local WHERE cedula=?"
            //UPDATE `local` SET `nombre`='Cristian',`contraseña`='bombom',`numero`='3135489',`correo`='unicauca' WHERE `cedula`='1022579'
            rta= await connection.query(query,[admin.cedula]);
            res.status(200).send({message:"Se elimino correctemente"});
           
          }else{
            res.status(400).send({message:"La cedula ingresada no existe en la base de datos"});
          }
        });



        // Liberar la conexión a la base de datos
        connection.release();    
    } catch (error) {
      console.error('Error connecting to the MySQL server:', error);
    }
  })();


  module.exports = router;