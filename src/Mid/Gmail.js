
const UsuarioModel = require('../Model/UsuariosModel');
var nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const Gmail = {}

Gmail.Enviar = async (req, res) => {
  const {email} =(req.body);
  const emailUsuario =await UsuarioModel.findOne({email:email});

 if(emailUsuario === null){
  res.send({message:"El gmail no esta registrado",'success':false}) 
 
      }
      else{ 
        const token =jwt.sign({usuario:emailUsuario._id,role:emailUsuario.role
      },'token-de-desarrollo',{expiresIn: 60*60*24});
       var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'f3rn4nd0.v3ntur4@gmail.com',
              pass: 'fiflklmmhfjvpmkq'
            }
          });
          var mensaje = "Hola"+" "+emailUsuario.PrimerNombre+" "+emailUsuario.PrimerApellido+" "+ emailUsuario.SegundoApellido+"  "+ "Puede iniciar sesíon con el token y crear una nueva contraseña en el apartado de perfil :  "+token;
          
          var mailOptions = {
              from: 'f3rn4nd0.v3ntur4@gmail.com',
              to: email,
              subject: 'mensaje de comprobación',
              text: mensaje,
                   };
            
            transporter.sendMail(mailOptions, function(error, info){
              if (error) {
                console.log(error);
              } else {
                res.send({message:"El gmail enviado esta registrado",'success':false})
               }
            });
          }  
    }
module.exports=Gmail;