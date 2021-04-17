const mongoose =require('mongoose');
const {Schema} =mongoose;
let rolV={
    values:['Admin','Usuario'],
    message:'{VALUE} no es un rol'
};
let sexoV={
    values:['Hombre','Mujer'],
    message:'{VALUE} no es un rol'
};
const usuarioShema =Schema({
    PrimerNombre:{type:String, require:true,maxlength: 30},
    PrimerApellido:{type:String,require:true,maxlength: 30},
    SegundoApellido:{type:String,require:true,maxlength: 30},
    email:{type:String, unique:true ,trim: true,require:true},
    password:{type:String, require:true},
    imagen:{type:Array, require:false },
    role:{type:String, default:'Usuario',enum:rolV},
    Sexo:{type:String, enum:sexoV,require:false},
    Edad:{type:Date, require:false},
    Estado:{type:Boolean, default:true},
    Google:{type:Boolean, default:false},
    Telefono:{type:String, require:false},
    Cart: {type:Array, default:[]},         
    History:{type:Array,default:[]},
            
});
module.exports=mongoose.model('usuarioModel',usuarioShema);