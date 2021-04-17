const express =require('express');
const router = express.Router();
const {verificarToken} = require('../Mid/Token');
const UsuarioRoutes = require('./UsuariosRoutes');
const ProductoRoutes = require('./ProductoRoutes');
const Gmail =require('../Mid/Gmail');
const ProductoController = require('../Controllers/ProductosController');


//usuarios
router.get('/Usuarios/Mostrar',UsuarioRoutes.MostrarPerfilel);
router.get('/Usuarios/Perfil',verificarToken,UsuarioRoutes.MostrarPerfil);
router.post('/Usuarios/',UsuarioRoutes.Registrarusuario);
router.post('/Usuarios/Login/',UsuarioRoutes.LogearUsuario);
router.post('/Usuarios/Login/Token',UsuarioRoutes.LogearUsuarioToken);
router.delete('/Usuarios/Eliminar',verificarToken,UsuarioRoutes.Eliminarusuario);
router.put('/Usuarios/EditarUsuario/:id',verificarToken,UsuarioRoutes.Editarusuario);
router.put('/Usuarios/EditarUsuarioPerfil/:id',verificarToken,UsuarioRoutes.EditarusuarioPerfil);
//productos

router.get('/Productos/ConFlor',ProductoRoutes.ConFlor);
router.get('/Productos/verde',ProductoRoutes.Verde);
router.get('/Productos/PlantasInterior',ProductoRoutes.PlantasInterior);
router.get('/Productos/Jardineria',ProductoRoutes.Jardineria);
router.get('/Productos/Decoacion',ProductoRoutes.Decoacion);
router.get('/Productos/OtonoInvierno',ProductoController.OtoñoInvierno);
router.get('/Productos/Flutales_y_Citricos',ProductoController.Flutales_y_Citricos);
router.get('/Productos/Deserticas',ProductoController.Deserticas);
router.get('/Productos/Semillas',ProductoRoutes.Semillas);
router.get('/Productos/Arbusto',ProductoRoutes.Arbusto);
router.get('/Productos/Plantas_Horticolas',ProductoRoutes.Plantas_Horticolas);
router.get('/Productos/Bulboss',ProductoRoutes.Bulbos);
router.get('/Productos/',ProductoRoutes.MostraTodosProductos);
router.get('/Productos/Inicio',ProductoRoutes.MostarProductosInicio);
router.get('/Productos/Rosales/',ProductoRoutes.Rosales);
router.get('/Productos/Plantas_de_Exterior',ProductoRoutes.Plantas_de_Exterior);
router.get('/Productos/:id',ProductoRoutes.Mostarproducto);
router.get('/Productos/Editar/:id',ProductoRoutes.MostarEditarProductos);
router.post('/Productos/AddProducto/',verificarToken,ProductoRoutes.AgreagarProductos);

router.delete('/Productos/Eliminar/',verificarToken,ProductoRoutes.EliminarProductoR);

router.put('/Productos/EditarProducto/:id',verificarToken,ProductoRoutes.EditarProductos);

//Gmail

router.post('/Gmail/',Gmail.Enviar);

module.exports = router;