import React, { Component } from 'react';
import { BrowserRouter as Router,Route  } from 'react-router-dom';
import axios from 'axios';
import { Modal } from 'rsuite';
import { decodeToken } from "react-jwt";                    
import Login from './Login';
import Index from './Index';
import Producto from './Producto';
import RegistrarProductos from './RegistrarProductos'
import Estado_pedidos from "./Estado_pedidos";
import Perfil from './Perfil';
import Categorias from './Categorias';
import productos from './Productos';
import EditarProducto from './EditarProducto';
import Sucursales from './Sucursales';
import Productos from './Productos';
import Rosales from './Rosal';
import Bulbo from "./Bulbo";
import Semillas from "./Semillas";
import Plantas_de_Exterior from './Plantas_de_Exterior';
import Desérticas from "./Desérticas";
import Flutales_y_Citricos from "./Flutales_y_Citricos";
import Arbusto from "./Arbusto";
import Plantas_Horticolas from "./Plantas_Horticolas";
import OtoñoInvierno from "./OtoñoInvierno";
import ConFlor from "./Planta_Con_Flor";
import Plantas_verdes from "./Plantas_verdes";
import Planta_interior from "./Planta_interior";
import Jardineria from "./Jardineria";
import Decoracion_Jardin from "./Decoracion_Jardin";
import Carrito from "./Carrito";
import PerfilEditar from "./PerfilEditar";
import emailjs from "emailjs-com";
import './css/Index.css';

export default class Navegador extends Component {
    constructor(props) {
        super(props);
        this.state = {
            buscar:'',
            backdrop:false, 
            showlogin:false, 
            Nombre:'',
            Email:'',
            Telefono:'',
            Ciudad:'',
            TeDedicas:'',
            Mensaje:'',
        }
        this.closeLogin= this.closeLogin.bind(this);
        this.openLogin = this.openLogin.bind(this);
    }
    closeLogin() {
        this.setState({ showlogin:false });
    }
    
    openLogin() {
        this.setState({ showlogin:true });
    }

    Cerrarsecion= async e=>{
        e.preventDefault();
        localStorage.removeItem('token');
        window.location.href="/";
    }

    onChangebuscar = (e) =>{ this.setState({ buscar:e.target.value })} 
        
    buscador = async e  =>{
        e.preventDefault();
        window.location.href=this.state.buscar;
      }
    
      myFunction() {
        var input, filter, section, div, h3,h1,h2, i;
        input = document.getElementById("myInput");
        filter = input.value.toUpperCase();
        section = document.getElementById("mySection");
        div = section.getElementsByTagName("div");
      
      
      
        for (i = 0; i < div.length; i++) {
          h3 = div[i].getElementsByTagName("h3")[0];
          h2 = div[i].getElementsByTagName("h2")[0];
          h1 = div[i].getElementsByTagName("h1")[0];

          if (h3) {
            var palabrasEnFiltro = filter.split(' ');
            var hallado = 0;
            for (var filtro of palabrasEnFiltro) {
              if (h3.innerHTML.toUpperCase().indexOf(filtro) > -1) {
                hallado++;
              }
            }
      
            if (hallado === palabrasEnFiltro.length) {
              div[i].style.display = "";
            } else {
              div[i].style.display = "none";
            }
      
          }
          if (h2) {
            var palabrasEnFiltro = filter.split(' ');
            var hallado = 0;
            for (var filtro of palabrasEnFiltro) {
              if (h2.innerHTML.toUpperCase().indexOf(filtro) > -1) {
                hallado++;
              }
            }
      
            if (hallado === palabrasEnFiltro.length) {
              div[i].style.display = "";
            } else {
              div[i].style.display = "none";
            }
      
          }
          
          if (h1) {
            var palabrasEnFiltro = filter.split(' ');
            var hallado = 0;
            for (var filtro of palabrasEnFiltro) {
              if (h1.innerHTML.toUpperCase().indexOf(filtro) > -1) {
                hallado++;
              }
            }
      
            if (hallado === palabrasEnFiltro.length) {
              div[i].style.display = "";
            } else {
              div[i].style.display = "none";
            }
      
          }
        }
      
      }

    onChangeNombre = (e) => { this.setState({ Nombre:e.target.value })};
    onChangeEmail = (e) => {this.setState({ Email:e.target.value })}
    onChangeNúmeroTelefono = (e) => {this.setState({ Telefono:e.target.value })}
    onChangeCiudad = (e) => {this.setState({ Ciudad:e.target.value })}
    onChangeTeDedicas = (e) => {this.setState({ TeDedicas:e.target.value})}
    onChangeMensaje = (e) => {this.setState({ Mensaje:e.target.value})}


    onSubmitGmail = async e => {
        e.preventDefault();
        emailjs.sendForm('service_w2u35b4', 'template_e8cnj79', e.target, 'user_TKMZ7Pi1KzUmLQmLXTA1d')
      .then((result) => {
          console.log(result.text);
      }, (error) => {
          console.log(error.text);
      });
        }

    render() {
        const { backdrop, showRegistro,showlogin } = this.state;
        let $RutaPerfil = null;
        let $RutaProductos = null;
        let $RutaPerfilAgregar =null;
        let $RutaPerfilEditarEliminar = null;
        let $RutaEditarProducto = null;
        let $buscador = null;
        let $Agregar_productos = null;
        let $Editar_productos = null;
        let tokenDes = decodeToken(localStorage.getItem('token'));
        let $tokenAll = null;
        let $cerrar_secion= null;       

        if(tokenDes){
            if(tokenDes.role === 'Admin'){
                $Agregar_productos=(
                    <li class=" main-menu"> 
                        <a href="/AddProducto"> <i class="fa  " >
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="36" fill="currentColor" class="bi bi-plus-circle-fill" viewBox="0 0 16 16">
                            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z"/>
                            </svg>
                            </i>
                            <span style={{fontSize:17}} class="nav-text">Agregar productos</span>
                        </a>
                    </li>     
                );
                
                $Editar_productos=(
                    <li class=" main-menu"> 
                        <a href="/EditarProducto">
 
                            <span style={{fontSize:18}} class="fa nav-text">Eliminar, Editar productos</span>
                        </a>
                    </li>  
                );
                
                
                
                $cerrar_secion=(
                   <div>
                        <li>
                            <a href="/">
                                <i class="fa fa-group fa-2x "></i>
                                <span style={{fontSize:17}} class="nav-text">Iniciar sesión </span>
                            </a>
                        </li>  
                        <li> 
                            <a onClick={this.Cerrarsecion}>
                                <i class="fa"> 
                                    <svg xmlns="http://www.w3.org/2000/svg" width="19" height="35" fill="currentColor" class="bi bi-door-open-fill" viewBox="0 0 16 16">
                                        <path d="M1.5 15a.5.5 0 0 0 0 1h13a.5.5 0 0 0 0-1H13V2.5A1.5 1.5 0 0 0 11.5 1H11V.5a.5.5 0 0 0-.57-.495l-7 1A.5.5 0 0 0 3 1.5V15H1.5zM11 2h.5a.5.5 0 0 1 .5.5V15h-1V2zm-2.5 8c-.276 0-.5-.448-.5-1s.224-1 .5-1 .5.448.5 1-.224 1-.5 1z"/>
                                    </svg>
                                </i>
                                <span class="nav-text" style={{fontSize:17}}> Cerrar sesión </span>
                            </a>
                       </li>
                    </div> 
                );
                
                $tokenAll = (  
                    <div>
                    <li class="has-subnav main-menu">
                    
                    <a href="/perfil">
                        <i class="fa ">
                            <svg xmlns="http://www.w3.org/2000/svg" width="19" height="35" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16">
                                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                                <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
                            </svg>
                        </i>
                        <span style={{fontSize:17}} class="nav-text">Perfil</span>
                    </a>
                    <div class="area2"></div>
                        <nav class="main-menu2">
                            <ul class="logout">
                               
                                <li class=" main-menu">        
                                    <a style={{display:"block"}} href="PerfilEditar">
                                    
                                        <span style={{fontSize:18,width:'63%',textAlign:"center"}} class="fa nav-text">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-person-lines-fill" viewBox="0 0 16 16">
                                        <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-5 6s-1 0-1-1 1-4 6-4 6 3 6 4-1 1-1 1H1zM11 3.5a.5.5 0 0 1 .5-.5h4a.5.5 0 0 1 0 1h-4a.5.5 0 0 1-.5-.5zm.5 2.5a.5.5 0 0 0 0 1h4a.5.5 0 0 0 0-1h-4zm2 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1h-2zm0 3a.5.5 0 0 0 0 1h2a.5.5 0 0 0 0-1h-2z"/>
                                        </svg>  Editar,Eliminat usuario</span>
                                        </a>
                                </li>
                            </ul>
                        </nav>
                    </li>
                    <li class="has-subnav main-menu">
                    
                       
                        </li>
                    </div>
                );
                
                $RutaPerfil=(
                    <Route path='/Perfil' component={Perfil}></Route>
                );
                
               

                $RutaPerfilEditarEliminar=(
                    <Route path='/PerfilEditar' component={PerfilEditar}></Route>
                );
                $RutaProductos=(
                    <Route path='/AddProducto' component={RegistrarProductos}></Route>
                );
                
                $RutaEditarProducto=(
                    <Route path='/EditarProducto' component={EditarProducto}></Route>
                );
            }
            
            if(tokenDes.role === 'Usuario'){
                
                
                $cerrar_secion=(
                    <div>
                        <li>
                            <a href="/">
                                <i class="fa fa-group fa-2x"></i>
                                <span style={{fontSize:17}} class="nav-text">Iniciar sesión</span>
                            </a>
                        </li>  
                        <li> 
                            <a onClick={this.Cerrarsecion}>
                                <i class="fa"> 
                                    <svg xmlns="http://www.w3.org/2000/svg" width="19" height="35" fill="currentColor" class="bi bi-door-open-fill" viewBox="0 0 16 16">
                                        <path d="M1.5 15a.5.5 0 0 0 0 1h13a.5.5 0 0 0 0-1H13V2.5A1.5 1.5 0 0 0 11.5 1H11V.5a.5.5 0 0 0-.57-.495l-7 1A.5.5 0 0 0 3 1.5V15H1.5zM11 2h.5a.5.5 0 0 1 .5.5V15h-1V2zm-2.5 8c-.276 0-.5-.448-.5-1s.224-1 .5-1 .5.448.5 1-.224 1-.5 1z"/>
                                    </svg>
                                </i>
                                <span style={{fontSize:17}} class="nav-text" > Cerrar sesión </span>
                            </a>
                       </li>
                    </div> 
                );
                
                $tokenAll = ( 
                    <a href="/perfil">
                        <i class="fa ">
                            <svg xmlns="http://www.w3.org/2000/svg" width="19" height="35" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16">
                                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                                <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
                            </svg>
                        </i>
                        <span style={{fontSize:17}} class="nav-text">Perfil</span>
                    </a>
                );
                
                $RutaPerfil=(
                    <Route path='/Perfil' component={Perfil}></Route>
                );
            }
        
        }
        
        else{
        $tokenAll = (<a></a>);
        
    
        $cerrar_secion=(
            <li>
                <a href="/">
                    <i class="fa fa-group fa-2x"></i>
                    <span style={{fontSize:17}} class="nav-text">Iniciar sesión </span>
                </a>
            </li>  
        );
    }
        return (
            <html >
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css"/>
                <body  style={{background:"linear-gradient(175deg, #d5fd13 0, #c8ef27 7.14%, #b8f305 14.29%, #afeb08 21.43%, #93d301 28.57%, #9fde01 35.71%, #85e700 42.86%, #c5ed0c 50%, #abf22c 57.14%, #8ff743 64.29%, #b5f612 71.43%, #9eda02 78.57%, #c6ff02 85.71%, 92.86%, #c6ff08 100%)",backgroundColor:'rgb(100,100,100',backgroundBlendMode:'soft-light'}}>
                    <div class="area"></div>
                    <nav class="main-menu" style={{background:"linear-gradient(175deg, #d5fd13 0, #c8ef27 7.14%, #b8f305 14.29%, #afeb08 21.43%, #93d301 28.57%, #9fde01 35.71%, #85e700 42.86%, #c5ed0c 50%, #abf22c 57.14%, #8ff743 64.29%, #b5f612 71.43%, #9eda02 78.57%, #c6ff02 85.71%, 92.86%, #c6ff08 100%)"}}>
                        <ul>
                            <li class="has-subnav">
                                <a href="/PIndexReact">
                                    <i class="fa ">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="35" fill="currentColor" class="bi bi-house-fill" viewBox="0 0 16 16">
                                            <path fill-rule="evenodd" d="M8 3.293l6 6V13.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5V9.293l6-6zm5-.793V6l-2-2V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5z"/>
                                            <path fill-rule="evenodd" d="M7.293 1.5a1 1 0 0 1 1.414 0l6.647 6.646a.5.5 0 0 1-.708.708L8 2.207 1.354 8.854a.5.5 0 1 1-.708-.708L7.293 1.5z"/>
                                        </svg>
                                    </i>
                                    <span style={{fontSize:17}} class="nav-text">Inicio</span>
                                </a>
                            </li>
                            
                            <li class="has-subnav">
                                <a href='/Carrito'>
                                    <i class="fa"> 
                                        <svg xmlns="http://www.w3.org/2000/svg" width="22" height="35" fill="currentColor" class="bi bi-truck" viewBox="0 0 16 16">
                                            <path d="M0 3.5A1.5 1.5 0 0 1 1.5 2h9A1.5 1.5 0 0 1 12 3.5V5h1.02a1.5 1.5 0 0 1 1.17.563l1.481 1.85a1.5 1.5 0 0 1 .329.938V10.5a1.5 1.5 0 0 1-1.5 1.5H14a2 2 0 1 1-4 0H5a2 2 0 1 1-3.998-.085A1.5 1.5 0 0 1 0 10.5v-7zm1.294 7.456A1.999 1.999 0 0 1 4.732 11h5.536a2.01 2.01 0 0 1 .732-.732V3.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5v7a.5.5 0 0 0 .294.456zM12 10a2 2 0 0 1 1.732 1h.768a.5.5 0 0 0 .5-.5V8.35a.5.5 0 0 0-.11-.312l-1.48-1.85A.5.5 0 0 0 13.02 6H12v4zm-9 1a1 1 0 1 0 0 2 1 1 0 0 0 0-2zm9 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2z"/>
                                        </svg>
                                    </i>
                                    <span style={{fontSize:17}} class="nav-text">Carrito</span>
                                </a>
                            </li>
                            
                        

                            <li class="has-subnav main-menu">
                                <a href="/Productos">
                                   <i class="fa">
                                       <svg xmlns="http://www.w3.org/2000/svg" width="22" height="30" fill="currentColor" class="bi bi-image-alt" viewBox="0 0 16 16">
                                            <path d="M7 2.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0zm4.225 4.053a.5.5 0 0 0-.577.093l-3.71 4.71-2.66-2.772a.5.5 0 0 0-.63.062L.002 13v2a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-4.5l-4.777-3.947z"/>
                                        </svg>
                                    </i>
                                    <span style={{fontSize:17}} class="nav-text">Productos</span>
                                </a>
                                <div class="area2"></div>
                                <nav class="main-menu2">
                                    <ul class="logout">
                                        <li class=" main-menu">        
                                            <a style={{display:"block"}} href="/Plantas_de_Exterior/">
                                            
                                                <span style={{fontSize:18,width:'63%',textAlign:"center"}} class="fa nav-text"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-brightness-high-fill" viewBox="0 0 16 16">
                                                    <path d="M12 8a4 4 0 1 1-8 0 4 4 0 0 1 8 0zM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0zm-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zM4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z"/>
                                                </svg>  Plantas de Exterior</span>
                                                <nav class="main-menu2">
                                                    <ul class="logout">
                                                        <li class=" main-menu">        
                                                            <a  href="/OtoñoInvierno">
                                                                <span style={{fontSize:18,width:'39%'}} class="fa nav-text">Otoño-Invierno</span>
                                                            </a>
                                                        </li>

                                                        <li class=" main-menu">        
                                                            <a  href="/Plantas_Horticolas">
                                                                <span style={{fontSize:18,width:'39%'}} class="fa nav-text">Plantas Hortícolas</span>
                                                            </a>
                                                        </li>
                                                        
                                                        <li class=" main-menu">        
                                                            <a  href="/Arbusto">
                                                                <span style={{fontSize:18,width:'29%'}} class="fa nav-text">Arbusto</span>
                                                            </a>
                                                        </li>
                                                        
                                                        <li class=" main-menu">        
                                                            <a  href="/Flutales_y_Citricos">
                                                                <span style={{fontSize:18,width:'29%'}} class="fa nav-text">Frutales y Cítricos</span>
                                                            </a>
                                                        </li>
                                                        
                                                        <li class=" main-menu">        
                                                            <a href="/Rosales">
                                                                <span style={{fontSize:18,width:'29%'}} class="fa nav-text">Rosales</span>
                                                            </a>
                                                        </li>
                                                
                                                        <li class=" main-menu">        
                                                            <a  href="/Desérticas">
                                                                <span style={{fontSize:18,width:'29%'}} class="fa nav-text">Desérticas</span>                                                            
                                                            </a>
                                                        </li>
                                            
                                                        <li class=" main-menu">        
                                                            <a  href="/Semillas">
                                                                <span style={{fontSize:18,width:'29%'}} class="fa nav-text">Semillas  </span>
                                                            </a>
                                                        </li>
                                            
                                                        <li class=" main-menu">        
                                                            <a href="/Bulbos">
                                                                <span style={{fontSize:18,width:'25%'}} class="fa nav-text">Bulbos</span>
                                                            </a>
                                                        </li>
                                                    </ul>
                                                </nav>
                                            </a>
                                        </li>
                                    
                                        <li class=" main-menu"> 
                                            <a style={{display:"block"}} href="/Planta_interior">
                                                <span style={{fontSize:18,width:'35%'}} class="fa nav-text"><svg xmlns="http://www.w3.org/2000/svg" width="40" height="20" fill="currentColor" class="bi bi-cloud-fill" viewBox="0 0 16 16">
                                                <path d="M4.406 3.342A5.53 5.53 0 0 1 8 2c2.69 0 4.923 2 5.166 4.579C14.758 6.804 16 8.137 16 9.773 16 11.569 14.502 13 12.687 13H3.781C1.708 13 0 11.366 0 9.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383z"/>
                                                </svg>Plantas de Interior</span>
                                                <nav class="main-menu2">
                                                    <ul class="logout">
                                                        <li class=" main-menu">        
                                                            <a  href="/ConFlor">
                                                                <span style={{fontSize:18,width:'39%'}} class="fa nav-text">Plantas con Flor</span>
                                                            </a>
                                                        </li>
                                                    
                                                        <li class=" main-menu">        
                                                            <a href="/Plantas_verdes">
                                                                <span style={{fontSize:18,width:'39%'}} class="fa nav-text">Plantas Verdes</span>
                                                            </a>
                                                        </li>
                                                    </ul>
                                                </nav>
                                            </a>
                                        </li>
                                    
                                        <li class=" main-menu"> 
                                            <a href="/Jardineria">
                                                <span style={{width:'30%',fontSize:18}} class="fa nav-text"><svg xmlns="http://www.w3.org/2000/svg" width="50" height="20" fill="currentColor" class="bi bi-wallet-fill" viewBox="0 0 16 16">
                                                <path d="M1.5 2A1.5 1.5 0 0 0 0 3.5v2h6a.5.5 0 0 1 .5.5c0 .253.08.644.306.958.207.288.557.542 1.194.542.637 0 .987-.254 1.194-.542.226-.314.306-.705.306-.958a.5.5 0 0 1 .5-.5h6v-2A1.5 1.5 0 0 0 14.5 2h-13z"/>
                                                <path d="M16 6.5h-5.551a2.678 2.678 0 0 1-.443 1.042C9.613 8.088 8.963 8.5 8 8.5c-.963 0-1.613-.412-2.006-.958A2.679 2.679 0 0 1 5.551 6.5H0v6A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-6z"/>
                                                </svg>Jardinería</span>
                                            </a>
                                        </li>
                                    
                                        <li class=" main-menu"> 
                                            <a href="/Decoracion_Jardin">
                                                <span style={{fontSize:18,width:'35%'}} class="fa nav-text"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-easel-fill" viewBox="0 0 16 16">
                                                    <path d="M8.473.337a.5.5 0 0 0-.946 0L6.954 2H2a1 1 0 0 0-1 1v7a1 1 0 0 0 1 1h1.85l-1.323 3.837a.5.5 0 1 0 .946.326L4.908 11H7.5v2.5a.5.5 0 0 0 1 0V11h2.592l1.435 4.163a.5.5 0 0 0 .946-.326L12.15 11H14a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1H9.046L8.473.337z"/>
                                                </svg>Decoracion de Jardin</span>
                                            </a>
                                        </li>
                                        {$Agregar_productos}
                                        {$Editar_productos}
                                    </ul>
                                </nav>
                            </li>
                 
                         
                            <li class="has-subnav main-menu">
                                <a >
                                   <i class="fa">
                                   <svg xmlns="http://www.w3.org/2000/svg" width="22" height="30" fill="currentColor" class="bi bi-columns" viewBox="0 0 16 16">
                                        <path d="M0 2a1 1 0 0 1 1-1h14a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V2zm8.5 0v8H15V2H8.5zm0 9v3H15v-3H8.5zm-1-9H1v3h6.5V2zM1 14h6.5V6H1v8z"/>
                                    </svg>
                                    </i>
                                    <span style={{fontSize:17}} class="nav-text">Redes sociales</span>
                                </a>
                                <div class="area2"></div>
                                <nav class="main-menu2">
                                    <ul class="logout">
                                        <li class=" main-menu">        
                                            <a style={{display:"block"}} onClick={this.openLogin} >
                                            
                                                <span style={{fontSize:18,width:'63%',textAlign:"center"}} class="fa nav-text"><svg xmlns="http://www.w3.org/2000/svg" width="30" height="20" fill="currentColor" class="bi bi-envelope-fill" viewBox="0 0 16 16">
                                                    <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555zM0 4.697v7.104l5.803-3.558L0 4.697zM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757zm3.436-.586L16 11.801V4.697l-5.803 3.546z"/>
                                                </svg>Gmail</span>
                                            </a>
                                        </li>
                                        <li class=" main-menu">        
                                            <a style={{display:"block"}} href="https://www.facebook.com/viveromzo">
                                            
                                                <span style={{fontSize:18,width:'63%',textAlign:"center"}} class="fa nav-text"><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-facebook" viewBox="0 0 16 16">
                                                    <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z"/>
                                                </svg>  Facebook</span>
                                            </a>
                                        </li>
                                        <li class=" main-menu">        
                                            <a style={{display:"block"}} href="#">
                                            
                                                <span style={{fontSize:18,width:'63%',textAlign:"center"}} class="fa nav-text">
                                                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-whatsapp" viewBox="0 0 16 16">
                                                    <path d="M13.601 2.326A7.854 7.854 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.933 7.933 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.898 7.898 0 0 0 13.6 2.326zM7.994 14.521a6.573 6.573 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.557 6.557 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592zm3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.099-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.729.729 0 0 0-.529.247c-.182.198-.691.677-.691 1.654 0 .977.71 1.916.81 2.049.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943-.049-.084-.182-.133-.38-.232z"/>
                                                </svg>  whatsapp</span>
                                            </a>
                                        </li>
                                    </ul>
                                </nav>
                            </li>
            


                            <li class="has-subnav ">
                                <a href="sucursales">
                                    <i class="fa ">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="21" height="36" fill="currentColor" class="bi bi-geo-alt-fill" viewBox="0 0 16 16">
                                            <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"/>
                                        </svg>
                                    </i>
                                    <span style={{fontSize:17}} class="nav-text">Sucursales </span>
                                </a>
                            </li>
                            <li class="has-subnav ">
                                {$tokenAll}
                            </li>
                            <form  onSubmit={this.buscador}>
                                <div>
                                    <li class="has-subnav "> 
                                        <i class="fa fas fa-search" style={{height:"50px"}}> 
                                            <div class="arama-kutusu" style={{width:"0px"}}>
                                                <input class="arama-buton arama-yazi " id="myInput" onChange={this.onChangebuscar} onKeyUp={this.myFunction}  list="datalist1" type="text"style={{maxWidth:"130px",minWidth:'128px',  borderRadius:"28px", padding: "8px 15px"}}  />
                                                <datalist id="datalist1">
                                                <option value="PIndexReact">Inicio</option>
                                                <option value="PIndexReact">Orgullosamente</option>
                                                <option value="PIndexReact">Mexicanos</option>
                                                <option value="Carrito">Carrito</option>
                                                <option value="Bulbos">Bulbos</option>
                                                <option value="Semillas">Semillas</option>
                                                <option value="Desérticas">Desérticas</option>
                                                <option value="Rosales">Rosales</option>
                                                <option value="Flutales_y_Citricos">Flutales y Citricos</option>
                                                <option value="Plantas_Horticolas">Horticolas</option>
                                                <option value="OtoñoInvierno">Otoño Invierno</option>
                                                <option value="ConFlor">Pantas con Flor</option>
                                                <option value="Plantas_verdes"> Planta Verde</option>
                                                <option value="Arbusto">Arbusto</option>
                                                <option value="Plantas_de_Exterior">Plantas de Exterior</option>
                                                <option value="Planta_interior">Panta de Interiror</option>
                                                <option value="PIndexReact">Cuidado de las plantas</option>
                                                <option value="PIndexReact">plagas y enfermedades</option>
                                                <option value="Categorias">Cuidado de plantas</option>
                                                <option value="sucursales">Sucursales</option>
                                                <option value="Productos">Productos</option>
                                                <option value="Perfil">Perfil</option>
                                                <option value="/">Iniciar sesión</option>
                                            </datalist>
                                            </div>
                                        </i>
                                    </li>
                                </div>     
                            </form>
                            
                            {$cerrar_secion}

                        </ul>
                    </nav>
                    
                    <div class="container" >
                  
                        <Router> 
                           <Route path="/PIndexReact"  component={Index}/>
                            <Route path="/" exact component={Login}/>
                           
                            <Route path='/Producto' component={Producto}></Route>
                            {$RutaPerfil}
                            {$RutaPerfilEditarEliminar}
                            {$RutaProductos}
                            {$RutaEditarProducto}
                            <Route path='/Productos' component={Productos}></Route>
                            <Route path='/sucursales' component={Sucursales}></Route>
                            <Route path='/Categorias' component={Categorias}></Route>
                            <Route path='/Rosales' component={Rosales}></Route>
                            <Route path='/Plantas_de_Exterior/' component={Plantas_de_Exterior}></Route>
                            <Route path='/Bulbos' component={Bulbo}></Route>
                            <Route path='/Semillas' component={Semillas}></Route>
                            <Route path='/Desérticas' component={Desérticas}></Route>
                            <Route path='/Flutales_y_Citricos' component={Flutales_y_Citricos}></Route>
                            <Route path='/Arbusto' component={Arbusto}></Route>
                            <Route path='/Plantas_Horticolas' component={Plantas_Horticolas}></Route>
                            <Route path='/OtoñoInvierno' component={OtoñoInvierno}></Route>
                            <Route path='/ConFlor' component={ConFlor}></Route>
                            <Route path='/Plantas_verdes' component={Plantas_verdes}></Route>
                            <Route path='/Planta_interior' component={Planta_interior}></Route>
                            <Route path='/Jardineria' component={Jardineria}></Route>
                            <Route path='/Decoracion_Jardin' component={Decoracion_Jardin}></Route>
                            <Route path='/Carrito' component={Carrito}></Route>
                            <Route path='/Estado_pedidos' component={Estado_pedidos}></Route>
                        </Router>

                    </div>
                    
                    
                    <Modal  className='fondo' style={{ minHeight:"570px"}}backdrop={backdrop} show={this.state.showlogin} onHide={this.closeLogin}>
                        <div className='gmail' >
                            <header style={{marginBottom:"30px" ,textAlign:"center",marginLeft:"8%", maxWidth:"86%"}} class="Container">
                                <div style={{padding:"0 50px"}} ><h2 style={{marginTop:"1em"}}>Contáctanos </h2></div>
                            </header>
                   
                            <div style={{marginLeft:"86%", marginTop:'-9%'}} class="col-1 "> 
                                <svg  onClick={this.closeLogin} style={{right:"20px"}} xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" class=" bi bi-x-circle" viewBox="0 0 16 16">
                                    <path style={{color:"white"}} d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                                </svg>
                            </div>
                    
                            <div style={{marginLeft:"17% "}} class="col-8"> 
                                <form onSubmit={this.onSubmitGmail} class="row g-3"  style={{marginBottom:"2.4em",marginTop:"2.4em"}}>
                                    <div class="col-md-6">
                                        <label  class="form-label">Tu nombre</label>
                                        <input name='nombre' type="text" class="form-control" />
                                    </div>
                                    <div class="col-md-6">
                                        <label  class="form-label">Email</label>
                                        <input name='email'type="text" class="form-control" />
                                    </div>
                                    <div class="col-6">
                                        <label class="form-label">Número de teléfono</label>
                                        <input name='tel' type="text" class="form-control" />
                                    </div>
                                    <div class="col-6">
                                        <label for="inputAddress2" class="form-label">A qué te dedicas</label>  
                                        <input  type="text" id='' class="form-control" name='teDedicas' list="dedicas" />
                                        <datalist id="dedicas">
                                            <option value="Florista">Florista</option>
                                            <option value="Distribuidor">Distribuidor</option>
                                            <option value="Organisador de fiestas">Organisador de fiestas</option>
                                            <option value="Vivero">Vivero</option>
                                            <option value="Otros">Otros</option>
                                        </datalist>
                                    </div>
                                    <div class="col-md-4">
                                        <label  class="form-label">Ciudad</label>
                                        <input name='ciudad' type="text" class="form-control" />
                                    </div>
                                    <div style={{display:"inline-block" ,minWidth:"100px"}} class="col-md-8">
                                        <label  class="form-label">Tu mensaje</label>
                                        <textarea name='message' class="form-control" rows="2" id="comment"></textarea>
                                    </div>
                                    <br/>
                                    <div style={{marginTop:"2em",marginLeft:"5em"}} class="col-8">
              <button style={{width:"82%",color:'green', height:"110%", borderRadius:10}} type="submit" class=" ">Enviar
                <svg xmlns="http://www.w3.org/2000/svg" width="26" height="20" fill="currentColor" class="bi bi-check2" viewBox="0 0 16 16">
                  <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/>
                </svg>
              </button>
            </div> 
                                </form>
                            </div>
                        </div>
                    </Modal>
              
            </body>
        </html>
        )
    }
}
