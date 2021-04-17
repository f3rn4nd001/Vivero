const express =require('express');
const ProductoRoutes = express.Router();
const {verificarToken} = require('../Mid/Token');
const ProductosController=require('../Controllers/ProductosController');
const ProductoController = require('../Controllers/ProductosController');

ProductoRoutes.MostraTodosProductos=(ProductosController.GetProductos);
ProductoRoutes.AgreagarProductos=(ProductosController.AgregarProducto);
ProductoRoutes.MostarProductosInicio=(ProductosController.GetProductosInicio);
ProductoRoutes.EliminarProductoR=(ProductosController.EliminarProducto);
ProductoRoutes.Rosales=(ProductosController.Rosales);
ProductoRoutes.Plantas_de_Exterior=(ProductosController.GetPlantas_de_Exterior);
ProductoRoutes.Mostarproducto=(ProductosController.Mostarproducto);
ProductoRoutes.MostarEditarProductos=(ProductosController.MostarEditarProductos);

ProductoRoutes.EditarProductos=(ProductosController.EditarProductos);
ProductoRoutes.Semillas=(ProductosController.Semillas);
ProductoRoutes.Deserticas=(ProductosController.Deserticas);
ProductoRoutes.Bulbos=(ProductosController.bulbos);
ProductoRoutes.Arbusto=(ProductosController.Arbusto);
ProductoRoutes.Flutales_y_Citricos=(ProductosController.Flutales_y_Citricos);

ProductoRoutes.Plantas_Horticolas=(ProductosController.Plantas_Horticolas);
ProductoRoutes.OtoñoInvierno=(ProductosController.OtoñoInvierno);
ProductoRoutes.ConFlor=(ProductoController.ConFlor);
ProductoRoutes.Verde=(ProductoController.Verde);
ProductoRoutes.PlantasInterior=(ProductosController.PlantasInterior);
ProductoRoutes.Jardineria=(ProductoController.Jardineria);
ProductoRoutes.Decoacion=(ProductosController.Decoacion);

module.exports = ProductoRoutes;

