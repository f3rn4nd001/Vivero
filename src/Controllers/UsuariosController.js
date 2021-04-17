const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UsuarioModel = require('../Model/UsuariosModel');
const UsuarioController ={}


UsuarioController.GetUsuariosperfil = async (req,res)=>{
      
    return res.json( [await UsuarioModel.findOne({_id:req.usuarioToken})]);
    
}

UsuarioController.MostrarPerfilel = async (req,res) =>{
    return res.json( await UsuarioModel.find());
}

UsuarioController.PostUsuarios=async(req,res)=>{
    const {PrimerNombre,PrimerApellido,SegundoApellido,email,password,password_conf,imagen,Sexo,Edad,Telefono}=(req.body);
    console.log( {PrimerNombre,PrimerApellido,SegundoApellido,email,password,password_conf,imagen,Sexo,Edad,Telefono});
    const errors = [];
    const guardado = [];

    if(!PrimerNombre){
        res.send({message: 'El campo del primer nombre no puede estar vacío','success':false,});
        errors.push({ text: 'El campo del primer nombre no puede estar vacío','success':false});
    }

    
    if(!PrimerApellido){
        res.send({message: 'El campo primer apellido  no puede estar vacío','success':false,});
        errors.push({ text: 'El campo primer apellido  no puede estar vacío'});
    }
    
    if (!email) {
        res.send({message: 'El campo email no puede estar vacío','success':false,});
        errors.push({ text: 'El campo email no puede estar vacío','success':false});
    } 
    if(!/^[a-z0-9_.]+@[a-z0-9_.]+\.[a-z0-9_.]+$/i.test(email)){
        throw res.send({'success':false,message: 'El formato de gmail no es válido '});
        errors.push({ text: 'El formato de gmail no es válido '});
    }
  
    if (!password ) {
        res.send({message: 'El campo contraseña no puede estar vacío','success':false,});
        errors.push({ text: 'El campo contraseña no puede estar vacío','success':false});
    } 
    if(password.length<4){
        res.send({message: 'La contraseña tiene que se mayor a 4 dígitos','success':false,});
        errors.push({ text: 'La contraseña tiene que se mayor a 4 dígitos','success':false});        
    }
    if(!password_conf){
        res.send({message: 'La contraseña de verificación no puede estar vacío','success':false,});
        errors.push({ text: 'La contraseña de verificación no puede estar vacío','success':false});
    }
    if(password_conf.length<4){
        res.send({message:'La contraseña de verificación  tiene que se mayor a 4 dígitos','success':false,});
        errors.push({ text: 'La contraseña de verificación  tiene que se mayor a 4 dígitos'});        
    }
    if(password != password_conf){
        res.send({message: 'La contraseña no coincide' ,'success':false});
        errors.push({ text: 'La contraseña no coincide','success':false});
    }  
    if (errors.length > 0) {
        console.log({errors,});
    } 
    else {
        const emailUsuario =await UsuarioModel.findOne({email:email});
        if(emailUsuario) {res.send({message:"El gmail ya fue registrado con anterioridad",'success':false});
        errors.push({message:"El gmail ya fue registrado con anterioridad",'success':false});
        } 
        else {
            res.send({message:'Ya fuistes registrado con éxito :)','success':true});
            guardado.push({message:'Ya fuistes registrado con éxito :)','success':true});
            const usuario = await new UsuarioModel({password:bcrypt.hashSync(password,10),PrimerNombre,PrimerApellido,SegundoApellido,email,imagen,Sexo,Edad,Telefono});
            res.json(await usuario.save());
        } 
    }
}

UsuarioController.GetUsuario= async (req,res)=>{
    const usuario = await UsuarioModel.findById(req.params.id)  
    if(usuario){         
        return res.json(usuario);
    }
    else{
        return res.json('Dato no encontrado');
    }
}


UsuarioController.LogearUsuarioToken =  async (req,res,next)=>{ 
    const {token}=(req.body);
   
    jwt.verify(token,'token-de-desarrollo',(err ,decode)=>{
        if(err){
           console.log('Esta funsion esta desabilitada si no se cuentas registrado');
        }
        else{
            req.usuarioToken=decode.usuario;
        }
     });
    
     const idToken = await UsuarioModel.findOne({_id:req.usuarioToken});
     if(idToken){
        const token =jwt.sign({usuario:idToken._id,role:idToken.role
        },'token-de-desarrollo',{expiresIn: 60*60*24});
        res.send({message:"Token correcto",'Token':token,'success':true})
        }
        else{
            console.log('no res');
            res.send({'success':false})
        }
}

UsuarioController.PostLoginUsuario =  async (req,res,next)=>{  
    const {email,password}=(req.body);
    const errors = [];
      
    if (!email) {
        res.send({message: 'El campo email no puede estar vacío','success':false,});
        errors.push({ text: 'El campo email no puede estar vacío','success':false});
    if(!/^[a-z0-9_.]+@[a-z0-9_.]+\.[a-z0-9_.]+$/i.test(email)){
        throw res.send({'success':false,message: 'El formato de gmail no es válido'});
        errors.push({ text: 'El formato de gmail no es válido'});
    }
    if (!password ) {
        res.send({message: 'El campo contraseña no puede estar vacío','success':false,});
        errors.push({ text: 'El campo contraseña no puede estar vacío','success':false});
    } 
    if(password.length<4){
        res.send({message: 'La contraseña tiene que se mayor a 4 dígitos','success':false,});
        errors.push({ text: 'La contraseña tiene que se mayor a 4 dígitos','success':false});        
    }
    } if (errors.length > 0) {
        console.log({errors,});
    }
    else{
        const emailUsuario = await UsuarioModel.findOne({email:email});
        if(emailUsuario) {
            if(bcrypt.compareSync(password,emailUsuario.password)){
                const token =jwt.sign({usuario:emailUsuario._id,role:emailUsuario.role
            },'token-de-desarrollo',{expiresIn: 60*60*24});
            res.send({message:"mensaje ",'Token':token,'success':true})
        }
        else{
            res.send({message:"La contraseña no es válida inténtelo de nuevo",'success':false})  
        }
    }
    else{res.send({message:"EL email no es válida",'success':false});
    }}
}    

UsuarioController.Editarusuario=async(req,res)=>{
    const je=(req.body);
    const usuario = await UsuarioModel.findOne({_id:req.params.id});
    const idToken = await UsuarioModel.findOne({_id:req.usuarioToken});
    if(idToken.role==='Admin'){
    if(!je.imagen){je.imagen = usuario.imagen}
    if(!je.PrimerNombre){je.PrimerNombre = usuario.PrimerNombre}
    if(!je.PrimerApellido){je.PrimerApellido = usuario.PrimerApellido}
    if(!je.SegundoApellido){je.SegundoApellido = usuario.SegundoApellido}
    if(!je.email){je.email = usuario.email}
    if(!je.password){je.password = usuario.password}
    if(!je.role){je.role = usuario.role}
    if(!je.Sexo){je.Sexo = usuario.Sexo}
    if(!je.Edad){je.Edad = usuario.Edad}
    if(!je.Telefono){je.Telefono = usuario.Telefono}
    if(je.password !== usuario.password){je.password = bcrypt.hashSync(je.password,10)}
 
    await UsuarioModel.findByIdAndUpdate(req.params.id, je);
    return res.send({message:'El usuario se ha modificado','success':true});
    }
    else{
        return res.send({message:'No cuentas con los permisos necesarios','success':false});
   
    }
}
UsuarioController.DeleteUsuario= async (req,res)=>{  
    const idToken= await UsuarioModel.findOne({_id:req.usuarioToken});
const {eliminar} =(req.body);

    if(idToken.role==='Admin'){          
    const usuario = await UsuarioModel.findById(eliminar);                    
        if(!usuario){res.send({message:'Usuario No encontrado','success':fal});
        }
        else{
            await UsuarioModel.findByIdAndDelete(eliminar);  
            return res.send({message:'Usuario eliminado','success':true});
        }
    }

}

UsuarioController.EditarusuarioPerfil= async(req,res)=>{
    const je=(req.body);

    const usuario = await UsuarioModel.findOne({_id:req.params.id});
    const idToken = await UsuarioModel.findOne({_id:req.usuarioToken});

    if(req.usuarioToken === req.params.id){
        if(!je.imagen){je.imagen = usuario.imagen}
        if(!je.PrimerNombre){je.PrimerNombre = usuario.PrimerNombre}
        if(!je.PrimerApellido){je.PrimerApellido = usuario.PrimerApellido}
        if(!je.SegundoApellido){je.SegundoApellido = usuario.SegundoApellido}
        if(!je.email){je.email = usuario.email}
        if(!je.password){je.password = usuario.password}
        if(!je.role){je.role = usuario.role}
        if(!je.Sexo){je.Sexo = usuario.Sexo}
        if(!je.Edad){je.Edad = usuario.Edad}
        if(!je.Telefono){je.Telefono = usuario.Telefono}
        if(je.password !== usuario.password){je.password = bcrypt.hashSync(je.password,10)}
        await UsuarioModel.findByIdAndUpdate(req.params.id, je);
        return res.send({message:'El usuario se ha modificado','success':true});
    }
    else{
        return res.send({message:'La cuenta no coincide o no fue encontrada','success':false});
    }
}

module.exports=UsuarioController;