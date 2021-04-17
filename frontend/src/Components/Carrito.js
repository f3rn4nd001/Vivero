import React, { Component } from 'react'
import axios from 'axios';
import './css/Carrito.css';import swal from 'sweetalert';
import { Alert, AlertTitle } from '@material-ui/lab';
import { Fragment } from 'react';
export default class Carrito extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productosB:[],
    }
  }

  onSubmitMasProducto = async (mproducto) => {
    let arr_producto = []; 
    var a  = localStorage.getItem('carrito');
    let insert = 1;
    let contador = 0;
    let index = 0;
    var PrecioTotal = 0;
    if (a){
      arr_producto = JSON.parse(a);
    }
    for ( let item of arr_producto ){
      if(item._id === mproducto._id){
        insert = 0; 
        mproducto=item;
        index=contador;
      }
      contador ++;
    }
    if(insert === 1 ){
      mproducto.cantidad = 1;
      mproducto.PrecioTotal = mproducto.Precio;
      arr_producto.push(mproducto)
    }
    else{
      if(mproducto.Stok < (mproducto.cantidad + 1) ){
           swal({icon: "info",timer:3000,text:'Cantidad maxima en existencia guardados'});
      }
      else{
      mproducto.cantidad = mproducto.cantidad + 1;
      mproducto.PrecioTotal = mproducto.PrecioTotal + mproducto.Precio;
      arr_producto[index] = mproducto;
      }
    }
    localStorage.setItem('carrito',JSON.stringify(arr_producto));
    this.onSubmitProductoMostrar();
  }
  
  onSubmitMenosProducto= async (mproducto)=>{
    let arr_producto = []; 
    var a  = localStorage.getItem('carrito');
    let insert = 1;
    let contador = 0;
    let index = 0;
    var PrecioTotal = 0;
    if (a){
      arr_producto = JSON.parse(a);
    }
    for ( let item of arr_producto ){
      if(item._id === mproducto._id){
        insert = 0; 
        mproducto=item;
        index=contador;
      }
      contador --;
    }
    if(insert === 1 ){
      mproducto.cantidad = 1;
      mproducto.PrecioTotal = mproducto.Precio;
      arr_producto.push(mproducto)
    }
    else{
      if(mproducto.cantidad < 2 ){
       swal({icon: "info",timer:3000,text:'Cantidad minima alcanzada'});
      }
      else{
      mproducto.cantidad = mproducto.cantidad - 1;
      mproducto.PrecioTotal = mproducto.PrecioTotal - mproducto.Precio;
      arr_producto[index] = mproducto;
      }
    }
    localStorage.setItem('carrito',JSON.stringify(arr_producto));
    this.onSubmitProductoMostrar();
  }

  onSubmitProductoMostrar = async ()=> {
    let arr_producto = []; 
    var a  = localStorage.getItem('carrito');
    if (a){
      arr_producto = JSON.parse(a);
    }
    this.setState({productosB: arr_producto});
  }
  
  onSubmitEliminarProducto = async (mproducto)=>{
    let arr_producto = []; 
    var a  = localStorage.getItem('carrito');
    let insert = 1;
    let contador = 0;
    let index = 0;
    var PrecioTotal = 0;
    if (a){
      arr_producto = JSON.parse(a);
    }
    for ( let item of arr_producto ){
      if(item._id === mproducto._id){
        insert = 0; 
        mproducto=item;
        index=contador;
      }
      contador ++;
    }
    if(insert === 0 ){
      arr_producto.splice(index,1) 
    }
    
    
    localStorage.setItem('carrito',JSON.stringify(arr_producto));
    this.onSubmitProductoMostrar();
  }
  
  render() {
    return (
      <div class="row" onMouseMove={this.onSubmitProductoMostrar}  style={{backgroundSize:'contain',backgroundImage:"url()",backgroundColor:'rgb(249 255 223)'}}> 
      <div id='mySection' ></div>
       
        <div class="row"   style={{marginLeft:'10px',minHeight:"670px"}} > 
          <table class="listado">
            <thead> 
              <tr>
                <th><h1>Imagen</h1></th><hr width="1" size="500"/>
                <th><h1>Nombre</h1></th><hr width="1" size="500"/>
                <th><h1>Tipo</h1></th><hr width="1" size="500"/>
                <th><h1>Cantidad</h1></th><hr width="1" size="500"/>
                <th><h1>Precio </h1></th><hr width="1" size="500"/>
                <th> <h1>Total</h1></th><hr width="1" size="500"/>
                <th><h1>Eliminar</h1></th>
              </tr>
            </thead>
            {this.state.productosB.length === 0 ? <div><h1>El carrito se encuentra vacío</h1></div>:<Fragment>
            {this.state.productosB.map(mproducto => (
            <tbody key={mproducto._id}>
              <td><img src={mproducto.Imagen} style={{minWidth:'100px',minHeight:'100px',maxHeight:'100px',maxWidth:'100px'}}></img></td><hr width="1" size="500"/>
              <td>{mproducto.Nombre}</td><hr width="1" size="500"/>
              <td>{mproducto.Tipo}</td><hr width="1" size="500"/>
              <td>{mproducto.cantidad}
                <td class="icono2" onClick={() =>this.onSubmitMasProducto(mproducto)}>
                  <a>
                    <svg style={{color:'green'}} xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" class="bi bi-plus-square" viewBox="0 0 16 16">
                      <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
                      <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                    </svg>
                  </a>
                </td> 
                <td class="icono2" onClick={() =>this.onSubmitMenosProducto(mproducto)}>
                  <a>
                    <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" class="bi bi-dash-square" viewBox="0 0 16 16">
                      <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
                      <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8z"/>
                    </svg>
                  </a>
                </td>
              </td><hr width="1" size="500"/>
              <td>{mproducto.Precio}</td><hr width="1" size="500"/>
              <td>{mproducto.PrecioTotal}</td><hr width="1" size="500"/>
              <td class="icono" onClick={() =>this.onSubmitEliminarProducto(mproducto)}>
                <a>
                  <svg xmlns="http://www.w3.org/2000/svg" width="26" height="36" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                    <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                  </svg>
                </a>
              </td>  
            </tbody>
          ))} </Fragment> }
         
        </table> 
        </div>
      </div>
    )
  }
}