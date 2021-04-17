const jwt =require('jsonwebtoken');

let verificarToken=(req,res,next)=>{
 
   let token =req.headers.token
   jwt.verify(token,'token-de-desarrollo',(err ,decode)=>{
      if(err){
         console.log('Esta funsion esta desabilitada si no se cuentas registrado');
         return res.status(401).json({
            ok:false,err,
            message: 'Esta funsion esta desabilitada si no se cuentas registrado'
            ,success:false
         });
      }
      else{
         req.usuarioToken=decode.usuario;
         next();
      }
   });
}
   


module.exports={verificarToken}