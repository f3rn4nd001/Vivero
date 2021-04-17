import React, { Component } from 'react'
import axios from 'axios';
import './css/Login.css'
import swal from 'sweetalert';
export default class RegistrarProductos extends Component {

    constructor(props) {
        super(props);
        this.state = {
          users:[], 
          backdrop:false, 
          showlogin:true, 
          showRegistro:false, 
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
        };
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

      onChangeNombre = (e) => { this.setState({ Nombre:e.target.value })};
      onChangePrecio = (e) => { this.setState({ Precio:e.target.value })};
      onChangeCategoria = (e) => { this.setState({ Categoria:e.target.value })};
      onChangeTipo = (e) => { this.setState({ Tipo:e.target.value })};
      onChangeimg  = (e) => { this.setState({ imagen:e.target.value })};
      onChangeStok = (e) => { this.setState({ Stok:e.target.value })};
      onChangeAltura = (e) => { this.setState({ Altura:e.target.value })};
      onChangeAncho = (e) => {this.setState({ Ancho:e.target.value })};
      onChangeDescripcion = (e) => {this.setState({ Descripcion:e.target.value })};

      onSubmitProductos = async e => {
        e.preventDefault();
        const res = await fetch('http://localhost:3001/api/Productos/AddProducto/',{
          method:'POST', headers:{
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
                window.location.href="/AddProducto";
              }
            });
         
          }
          else{
            swal({icon: "info",timer:4000,text:res.message });
          }
        })
      }

    render() {
      const { backdrop, showRegistro,showlogin } = this.state;
      let { imagePreviewUrl } = this.state;
      let $imagePreview = null;
      if ( imagePreviewUrl  ){
        $imagePreview = ( <img  src={imagePreviewUrl} />);
      } 
      else{
      $imagePreview = (<div className="previewText">La imagen no se ha elegido</div>);
      }
      return (
        <div style={{width:'105%',backgroundSize:'contain',backgroundImage:"url(https://ak.picdn.net/shutterstock/videos/18869951/thumb/1.jpg)",backgroundColor:'rgb(100,100,100',backgroundBlendMode:'soft-light'}}>
        <div style={{marginLeft:"20%"}}  class="col-8 contenedor"> 
         <div id='mySection'></div>
        <h1>Registro de producto</h1>
          <form onSubmit={this.onSubmitProductos} class="row"  >
            <div class="col-md-4">
              <li class="fila">
                <input id="Nombre" name="Nombre" onChange={this.onChangeNombre}  required="required" autofocus="autofocus" type="text" style={{backgroundColor: "#e0e0e0"}} class="form-control input" />
                <label  class="form-label propiedad">Nombre</label>
                <input type="hidden" id="codigo" name="code" value="25" />
              </li>
            </div>
            <div class="col-4"> 
              <li class="fila">
                <input type="text" required="required" onChange={this.onChangeCategoria} class="form-control"  list="Categoria" style={{backgroundColor: "#e0e0e0"}}  />
                <datalist id="Categoria">
                    <option value="Plantas de Interior">Plantas de Interior</option>
                    <option value="Plantas de Exterior">Plantas de Exterior</option>
                    <option value="Decoraciones de Jardin">Decoraciones de Jardin</option>
                    <option value="Jardineria">Jardineria</option>
                </datalist>
                <label for="inputAddress2" class="form-label propiedad">Categoria</label>  
              </li>
            </div>
            
            <div class="col-4">
            <li class="fila">
              <input type="text" required="required" onChange={this.onChangeTipo} class="form-control"  style={{backgroundColor: "#e0e0e0"}} list="Tipo" />
              <datalist id="Tipo">
                <option value="Otoño-Invierno">Otoño-Invierno</option>
                <option value="Plantas Horticolas">Plantas Horticolas</option>
                <option value="Arbusto">Arbusto</option>
                <option value="Flutales y Citricos">Flutales y Citricos</option>
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
              <label for="inputAddress3" class="form-label propiedad">Tipo</label>  
             </li>
            </div>

            
            <div class="col-md-3">
              <li class="fila">
                <input required="required" id="Precio" name="Precio" onChange={this.onChangePrecio} type="text" style={{backgroundColor: "#e0e0e0"}} class="form-control input" />
                <label  class="form-label propiedad">Precio</label>
                
              </li>
            </div>

            <div class="col-md-3">
              <li class="fila">
                <input required="required" id="Stok" name="Stok" onChange={this.onChangeStok}  type="text" style={{backgroundColor: "#e0e0e0"}}  class="form-control" />
                <label  class="form-label propiedad">Existencia</label>
              </li>
            </div> 
          
            
            <div class="col-md-3">
              <label  class="form-label">Altura (cm)</label>
              <input id="Altura" name="Altura" onChange={this.onChangeAltura} style={{backgroundColor: "#e0e0e0"}} type="text" class="form-control" />
            </div>
            
            <div class="col-md-3">
              <label  class="form-label">Ancho (cm)</label>
              <input id="Ancho" name="Ancho" onChange={this.onChangeAncho} style={{backgroundColor: "#e0e0e0"}} type="text" class="form-control" />
            </div>
            
            <div style={{display:"inline-block" ,minWidth:"100px"}} class="col-md-12">
              <label  class="form-label">Descripción</label>
              <textarea id="Descripcion" name="Descripcion" style={{backgroundColor: "#e0e0e0"}} onChange={this.onChangeDescripcion} class="form-control" rows="6" ></textarea>
            </div>

            <div class="col-3">
            </div>
            <div class="col-3">
              <input className="fileInput"style={{padding:'10px 0'}} type="file" onChange={(e)=>this._handleImageChange(e)} />  
            </div>
            <div class="col-6">
            </div>
            <div style={{width:"560px",height:"230px"}} className="imgPreview ">
              {$imagePreview}
            </div>
            
            <div style={{marginTop:"2em",marginLeft:"9em"}} class="col-8">
              <button style={{color: 'white',backgroundColor: "rgb(125 119 119)"}} type="submit" class="form-control boton">Guardar
                <svg xmlns="http://www.w3.org/2000/svg" width="26" height="20" fill="currentColor" class="bi bi-check2" viewBox="0 0 16 16">
                  <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z"/>
                </svg>
              </button>
            </div> 
          </form>
       </div>
       </div> 
      )
    }
}