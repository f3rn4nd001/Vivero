import React, { Component } from 'react'
import axios from 'axios';
import { Modal,Button } from 'rsuite';
import './css/EditarProducto.css';
import { Input } from '@material-ui/core';
import swal from 'sweetalert';
export default class EditarProducto extends Component {
  constructor(props) {
    super(props);
    this.state = {
      productos:[],
      Eliminar:'',
      backdrop:false, 
      showlogin:false, 
      imagen:{}, 
      file:'',
      productosmos:[],
      imagen:{}, 
      Nombre:'',
      Precio:'',
      Categoria:'',
      Tipo:'',
      Stok:'',
      Altura:'',
      Ancho:'',
      Descripcion:'',
      file:'',
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

  async componentDidMount(){
    const res = await axios.get('http://localhost:3001/api/Productos/');
    this.setState({productos: res.data});
  }
  
 
  
  onSubmitEliminarProducto = async _id  => {
    if (window.confirm('Seguro que desea eliminarlo')){
    const res = await fetch('http://localhost:3001/api/Productos/Eliminar/',{
      method:'DELETE', headers:{
        'token':localStorage.getItem('token'),
        'Accept':'application/json',
        'Content-Type':'application/json',
      }, 
      body: JSON.stringify({
        eliminar:_id,
      })
    }).then((response)=>response.json()).then((res)=>{        
      if(res.success===true){
        swal({icon: "success", closeOnClickOutside: false,text:res.message}).then(willDelete => {
          if (willDelete) {
            window.location.href="/EditarProducto";
          }
        });
        
      }
      else{
        swal({icon: "info",timer:4000,text:res.message });
      }
    })}
  }

  onChangeNombre = (e) => { this.setState({ Nombre:e.target.value })};
  onChangePrecio = (e) => { this.setState({ Precio:e.target.value })};
  onChangeCategoria = (e) => { this.setState({ Categoria:e.target.value })};
  onChangeTipo = (e) => { this.setState({ Tipo:e.target.value })};
  onChangeimg  = (e) => { this.setState({ imagen:e.target.value })};
  onChangeStok = (e) => { this.setState({ Stok:e.target.value })};
  onChangeAltura = (e) => { this.setState({ Altura:e.target.value })};
  onChangeAncho = (e) => {this.setState({ Ancho:e.target.value })};
  onChangeDescripcion = (e) => {this.setState({ Descripcion:e.target.value })};

  

  onSubmitEditarProducto = async _id => {
    const res = await fetch('http://localhost:3001/api/Productos/EditarProducto/'+_id,{
      method:'PUT', headers:{
        'token':localStorage.getItem('token'),
        'Accept':'application/json',
        'Content-Type':'application/json',
      }, 
      body: JSON.stringify({
        Nombre:this.state.Nombre,
        Precio:this.state.Precio,
        Categoria:this.state.Categoria,
        Tipo:this.state.Tipo,
        Stok:this.state.Stok,
        Altura:this.state.Altura,
        Ancho:this.state.Ancho,
        Descripcion:this.state.Descripcion,
        Imagen:this.state.imagePreviewUrl,
      })
    }).then((response)=>response.json()).then((res)=>{    
      
      if(res.success===true){
        swal({icon: "success", closeOnClickOutside: false,text:res.message}).then(willDelete => {
          if (willDelete) {
            window.location.href="/EditarProducto";
          }
        });
        
      }
      else{
        swal({icon: "info",timer:4000,text:res.message });
      }
    })
    
  }

  _handleImageChange(e) {
    e.preventDefault();
    let reader = new FileReader();
    let file = e.target.files[0];
    reader.onloadend = () => {
      this.setState({    
        imagePreviewUrl: reader.result
      });
    }      
    reader.readAsDataURL(file)
  }



  render() {
    const { backdrop, showRegistro,showlogin } = this.state;
    let { imagePreviewUrl } = this.state;
    let $imagePreview = null;
    if ( imagePreviewUrl  ){
      $imagePreview = ( <img  src={imagePreviewUrl} />);
    } 
   
    return (
        
      <div class="row" style={{marginLeft:'-30px',minHeight:"670px"}} > 
         <div id='mySection' ></div>
        <table  style={{width:'1210px'}} class="listado">
          <thead>
           


            <tr>
              <th><h1>Imagen</h1></th>
              <th><h1>Nombre</h1></th>
              <th><h1>Categoria</h1></th>
              <th><h1>Tipo</h1></th>
              <th><h1>Descripcion</h1></th>
              <th><h1>Alto</h1></th>
              <th><h1>Ancho</h1></th>
              <th><h1>Cantidad</h1></th>
              <th><h1>Precio</h1></th>
              
              <th colspan="2"><h1>Opciones</h1></th>
            </tr>
          </thead>
          
          <tbody>
            {this.state.productos.map(producto => (
              
              <tr  key={producto._id} >
                <td> <button  type="file" onChange={(e)=>this._handleImageChange(e)}><img style={{maxWidth:'90px',maxHeight:'90px'}} src={producto.Imagen} >{$imagePreview}</img></button> </td>
                <td style={{maxWidth:'180px'}}><input style={{maxWidth:'100%'}} type="text" class="form-control"  onKeyUp={this.onChangeNombre}  defaultValue={producto.Nombre}></input></td>
                <td style={{maxWidth:'250px'}}>  
                  <input type="text"   onChange={this.onChangeCategoria} class="form-control"  list="Categoria" placeholder={producto.Categoria}/>
                  <datalist id="Categoria">
                    <option value="Plantas de Interior">Plantas de Interior</option>
                    <option value="Plantas de Exterior">Plantas de Exterior</option>
                    <option value="Decoraciones de Jardin">Decoraciones de Jardin</option>
                    <option value="Jardineria">Jardineria</option>
                  </datalist></td>
                <td> 
                  <input type="text" placeholder={producto.Tipo} onChange={this.onChangeTipo} class="form-control"  list="Tipo" />
                  <datalist id="Tipo">
                    <option value="Otoño-Invierno">Otoño-Invierno</option>
                    <option value="Plantas Horticolas">Plantas Horticolas</option>
                    <option value="Arbusto">Arbusto</option>
                    <option value="Rosales">Rosales</option>
                    <option value="Semillas">Semillas</option>
                    <option value="Bulbos">Bulbos</option>
                    <option value="Plantas con Flor">Plantas con Flor</option>
                    <option value="Plantas Verdes">Plantas Verdes</option>
                    <option value="Tierras">Tierras</option>
                    <option value="Abonos">Abonos</option>
                    <option value="Huertos">Huertos</option>
                    <option value="Desérticas">Desérticas</option>
                    <option value="Macetas y Jardineras">Macetas y Jardineras</option>
                    <option value="Herramientas de Jardineria">Herramientas de Jardineria</option>
                    <option value="Decoraciones de Jardin">Decoraciones de Jardin</option>
                  </datalist>
                </td> 
                <td style={{maxWidth:'200px'}}><textarea onChange={this.onChangeDescripcion} style={{maxWidth:'100%'}} defaultValue={producto.Descripcion}/></td>
                <td style={{maxWidth:'100px'}}><input  placeholder={producto.Altura} onChange={this.onChangeAltura}  type="text" class="form-control" /></td>
                <td style={{maxWidth:'100px'}}><input placeholder={producto.Ancho} onChange={this.onChangeAncho}  type="text" class="form-control" /></td>
                <td style={{maxWidth:'10px'}}><input placeholder={producto.Stok} onChange={this.onChangeStok}  type="text" class="form-control" /></td>
                <td style={{maxWidth:'110px'}}><input placeholder={producto.Precio} onChange={this.onChangePrecio}  type="text" class="form-control" /></td>
                <td>
                  <td class="icono"  onClick={() =>this.onSubmitEditarProducto(producto._id)}>
                    <a>
                      <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                        <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                      </svg>
                    </a>
                  </td>  
                  <td class="icono" onClick={() =>this.onSubmitEliminarProducto(producto._id)}>
                    <a>
                      <svg xmlns="http://www.w3.org/2000/svg" width="26" height="36" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                        <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                      </svg>
                    </a>
                  </td>  
                </td> 
              </tr>
            ))}
          </tbody>
        </table> 
      </div>
    )
  }
}