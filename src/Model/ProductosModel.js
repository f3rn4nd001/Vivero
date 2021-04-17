const mongoose =require('mongoose');
const {Schema} =mongoose;
let CategoriaV={
    values:['Plantas de Interior','Plantas de Exterior','Decoraciones de Jardin','Jardineria'],
    message:'{VALUE} no es un rol'
};

let TipoV={
    values:['Otoño-Invierno','Plantas Horticolas','Arbusto','Flutales y Citricos','Rosales','Semillas','Bulbos','Plantas con Flor','Plantas Verdes','Tierras','Abonos','Herramientas de Jardineria','Decoraciones de Jardin','Macetas y Jardineras','Huertos','Desérticas' ],
    message:'{VALUE} no es un tipo'
};
const productoShema =Schema({
    Nombre:{type:String, require:true,maxlength: 30},
    Marca:{type:String,require:false,maxlength: 30},
    Precio:{type:Number,require:true},
    Imagen:{type:Array, require:true },
    Descripcion:{type:String,require:false},
    Categoria:{type:String,enum:CategoriaV},
    Tipo:{type:String,enum:TipoV},
    Stok:{type:Number,require:true},
    Altura:{type:Number},
    Ancho:{type:Number},
});
module.exports=mongoose.model('productoModel',productoShema);