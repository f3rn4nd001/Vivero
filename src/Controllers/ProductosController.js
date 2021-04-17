const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const productoModel = require('../Model/ProductosModel');
const UsuarioModel = require('../Model/UsuariosModel');
const ProductoController ={}

ProductoController.Decoacion=async(req,res)=>{
    return res.json( await productoModel.find().where('Categoria').equals('Decoraciones de Jardin'));

}

ProductoController.Jardineria =async(req,res)=>{
    return res.json( await productoModel.find().where('Categoria').equals('Jardineria'));
}

ProductoController.PlantasInterior=async(req,res)=>{
    return res.json( await productoModel.find().where('Categoria').equals('Plantas de Interior'));
}

ProductoController.ConFlor=async(req,res)=>{
    return res.json( await productoModel.find().where('Tipo').equals('Plantas con Flor'));
}

ProductoController.Verde=async(req,res)=>{
    return res.json( await productoModel.find().where('Tipo').equals('Plantas Verdes'));

}

ProductoController.OtoñoInvierno= async(req,res)=>{
    return res.json( await productoModel.find().where('Tipo').equals('Otoño-Invierno'));
}

ProductoController.Flutales_y_Citricos = async(req,res)=>{
    return res.json( await productoModel.find().where('Tipo').equals('Flutales y Citricos'));
}


ProductoController.Plantas_Horticolas = async(req,res)=>{
    return res.json( await productoModel.find().where('Tipo').equals('Plantas Horticolas'));
}

ProductoController.Arbusto = async(req,res)=>{
    return res.json( await productoModel.find().where('Tipo').equals('Arbusto'));
}

ProductoController.bulbos = async (req, res)=>{    
    return res.json( await productoModel.find().where('Tipo').equals('Bulbos'));
} 

ProductoController.Semillas=async(req,res)=>{
    return res.json( await productoModel.find().where('Tipo').equals('Semillas'));
}

ProductoController.Deserticas = async(req,res)=>{
    return res.json( await productoModel.find().where('Tipo').equals('Desérticas'));
}

ProductoController.GetProductos= async (req, res)=>{
    return res.json( await productoModel.find());
} 

ProductoController.MostarEditarProductos =async(req, res)=>{
    res.json( await productoModel.find().where('_id').equals(req.params.id));
}

ProductoController.Mostarproducto= async (req, res)=>{ 
    res.json( await productoModel.find().where('_id').equals(req.params.id));
} 

ProductoController.Rosales= async (req, res)=>{    
    return res.json( await productoModel.find().where('Tipo').equals('Rosales'));
} 



ProductoController.GetPlantas_de_Exterior=async(req,res)=>{
    return res.json( await productoModel.find().where('Categoria').equals('Plantas de Exterior'));
}


ProductoController.GetProductosInicio= async (req, res)=>{
    return res.json( await productoModel.find()
    //.skip(3)
    .limit(4)
    );
}

ProductoController.AgregarProducto = async (req, res) => {
    const errors = [];
    const guardado = [];
    const idToken = await UsuarioModel.findOne({_id:req.usuarioToken});
   
    if(idToken.role==='Admin'){        
        
        const {Nombre,Precio,Imagen,Descripcion,Categoria,Tipo,Stok,Altura,Ancho}=(req.body);
        if(!Nombre){
            res.send({message: 'El campo Nombre no puede estar vacio','success':false,});
            errors.push({ text: 'El campo Nombre no puede estar vacio'});
        }
        if(!Precio){
            res.send({message: 'El campo Precio no puede estar vacio','success':false,});
            errors.push({ text: 'El campo Precio no puede estar vacio'});
        }
        if(!Categoria){
            res.send({message: 'El campo Categoria no puede estar vacio','success':false,});
            errors.push({ text: 'El campo Categoria no puede estar vacio'});
        }
        if(!Tipo){
            res.send({message: 'El campo Tipo no puede estar vacio','success':false,});
            errors.push({ text: 'El campo Tipo no puede estar vacio'});
        }
        if(!Stok){
            res.send({message: 'El campo Stok no puede estar vacio','success':false,});
            errors.push({ text: 'El campo Stok no puede estar vacio'});
        }
        if(!Imagen){
            res.send({message: 'El campo Imagen no puede estar vacio','success':false,});
            errors.push({ text: 'El campo Imagen no puede estar vacio'});
        }
        if(typeof Nombre !== 'string'){
            res.send({'success':false,message: 'El Nombre tiene que ser letras'});
            errors.push({ text: 'El Nombre re tiene que ser letras'});
        }
        if(typeof Categoria !== 'string'){
            res.send({'success':false,message: 'El Categoria tiene que ser letras'});
            errors.push({ text: 'El Categoria re tiene que ser letras'});
        }
        if(typeof Tipo !== 'string'){
            res.send({'success':false,message: 'El Tipo tiene que ser letras'});
            errors.push({ text: 'El Tipo re tiene que ser letras'});
        }
        if(!/^[0-9]+$/i.test(Precio)){
            res.send({'success':false,message: 'El campo Precio No puede tener letras'});
            errors.push({ text: 'El campo campo Precio no puede estar vacio'});
        }
        if(!/^[0-9]+$/i.test(Stok)){
            res.send({'success':false,message: 'El campo Existencia No puede tener letras'});
            errors.push({ text: 'El campo campo Existencia no puede estar vacio'});
        }
        if (errors.length > 0) {
            console.log({errors,});
        } 
        else {
        const productos = await new productoModel({Nombre,Precio,Imagen,Descripcion,Categoria,Tipo,Stok,Ancho,Altura});
        await productos.save()
        res.send({'success':true,message: 'Producto Guardado Con exito'});

        }
    }
    else{
        res.send({'success':false,message: 'No tiene permitido agregar productos'});
        errors.push({ text: 'No tiene permitido agregar productos'});
        
    }
}


ProductoController.EliminarProducto= async (req,res)=>{
    const idToken = await UsuarioModel.findOne({_id:req.usuarioToken});
   
   
    const {eliminar}=(req.body);
     if(idToken.role==='Admin'){        
        await productoModel.findByIdAndDelete(eliminar);  
        return res.send({message:'Producto eliminado','success':true});
    }
}



ProductoController.EditarProductos=async(req,res)=>{
    
    
    const je=(req.body);
    const producto = await productoModel.findOne({_id:req.params.id});

    const idToken = await UsuarioModel.findOne({_id:req.usuarioToken});
    if(idToken.role==='Admin'){
    if(!je.Imagen){je.Imagen = producto.Imagen;}
    if(!je.Nombre){je.Nombre = producto.Nombre;}
    if(!je.Precio){je.Precio = producto.Precio;}
    if(!je.Descripcion){je.Descripcion = producto.Descripcion;}
    if(!je.Categoria){je.Categoria = producto.Categoria;}
    if(!je.Tipo){je.Tipo = producto.Tipo;}
    if(!je.Stok){je.Stok = producto.Stok;}
    if(!je.Altura){je.Altura = producto.Altura;}
    if(!je.Ancho){je.Ancho = producto.Ancho;}

   
    await productoModel.findByIdAndUpdate(req.params.id, je);
    return res.send({message:'Producto editado','success':true});
    }
    else{
        return res.send({message:'No cuentas con los permisos necesarios','success':false});
   
    }
    
}


module.exports=ProductoController;