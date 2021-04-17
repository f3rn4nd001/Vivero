import React, { Component,Fragment } from 'react'
import axios from 'axios';
import './css/Prueba.css'
import { Modal } from 'rsuite';
import swal from 'sweetalert';
export default class Plantas_de_Exterior extends Component {
    constructor(props) {
        super(props);
        this.state = {
        productos:[],
        productosmos:[],
        backdrop:false, 
        showlogin:false, 
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
      const res = await axios.get('http://localhost:3001/api/Productos/Plantas_de_Exterior');
      this.setState({productos: res.data});
      
  }
  
  onSubmitProductoACarrtio = async (mproducto) => {
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
      swal({icon: "success", closeOnClickOutside: false,text:'Producto guardado en el carrito'})
      mproducto.cantidad = 1;
      mproducto.PrecioTotal = mproducto.Precio;
      arr_producto.push(mproducto)
      
    }
    else{
      if(mproducto.Stok < (mproducto.cantidad + 1) ){
        swal({icon: "info",timer:3000,text:'Cantidad maxima en existencia guardados'});
      }
      else{
        swal({icon: "success", closeOnClickOutside: false,text:'Producto guardado en el carrito'})
        mproducto.cantidad = mproducto.cantidad + 1;
        mproducto.PrecioTotal = mproducto.PrecioTotal + mproducto.Precio;
        arr_producto[index] = mproducto;
      }
    }
    localStorage.setItem('carrito',JSON.stringify(arr_producto));
    }
  

  async onSubmitMostarProducto (_id){
    const res = await axios.get('http://localhost:3001/api/Productos/'+_id);
    this.setState({productosmos: res.data}); 
  }
    render() {
        const { backdrop, showRegistro,showlogin } = this.state;
   
        return (
                
            
                <div class="container row" style={{minWidth:'108%',minHeight:"670px",paddingLeft:"50px",backgroundSize:'contain',backgroundImage:"url(https://ak.picdn.net/shutterstock/videos/18869951/thumb/1.jpg)",backgroundColor:'rgb(100,100,100',backgroundBlendMode:'soft-light'}}>
               <div className="col-md-12" style={{padding: "25px 0"}}>
                      <ol style={{background:"rgb(92 90 90)",borderRadius:"10px"}}  className="col-md-4 breadcrumb">
                    
                      <li>
                        <a style={{color: "antiquewhite"}} href='/PIndexReact'> <i  style={{color: "white"}}class="fa fa-home "> Inicio</i></a></li>
                      <svg style={{color: "antiquewhite"}} xmlns="http://www.w3.org/2000/svg" width="26" height="36" fill="currentColor" class="bi bi-chevron-compact-right" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M6.776 1.553a.5.5 0 0 1 .671.223l3 6a.5.5 0 0 1 0 .448l-3 6a.5.5 0 1 1-.894-.448L9.44 8 6.553 2.224a.5.5 0 0 1 .223-.671z"/>
                      </svg>
                      
                      
                      <li > <i style={{color: "antiquewhite",fontSize:"1.20em"}} class="faExteriorMigas "><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-brightness-high-fill" viewBox="0 0 16 16">
                      <path d="M12 8a4 4 0 1 1-8 0 4 4 0 0 1 8 0zM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0zm-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zM4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z"/>
                    </svg> Plantas de Exterior </i></li>
                     
                      
                 
        
                    </ol>
                </div>      
                <div id='mySection' className='row' style={{minWidth:"100%"}}>
                {this.state.productos.length ===0 ? <div style={{color:'white'}}><h1>Este apartado no cuenta con productos por el momento</h1></div>:<Fragment>
   
        {this.state.productos.map(producto => (
          <div onClick={this.openLogin } key={producto._id} class="productoCol col-3"> 
            <img onClick={() =>this.onSubmitMostarProducto(producto._id)} title='imageA' src={producto.Imagen} alt="" />
            <h3 style={{color:'white'}}>{producto.Nombre}</h3>
            <h5 style={{color:'white'}}>${producto.Precio} <br></br></h5>
          </div>
        ))}    </Fragment>}
        </div>
            
        
            {this.state.productosmos.map(mproducto => (
          <Modal className='fondo' style={{ minHeight:"570px"}}backdrop={backdrop} show={this.state.showlogin} onHide={this.closeLogin}>
            <div class="wrapper ModapProductos">
              <div class="product-img">
                <img  src={mproducto.Imagen} style={{maxHeight:"100%",minHeight:"100%"}} width="327"/>
              </div>
              <div class="product-info">
                <div style={{marginLeft:"86%"}} class="col-1 "> 
                  <svg  onClick={this.closeLogin} style={{right:"30px"}} xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class=" bi bi-x-circle" viewBox="0 0 16 16">
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                  </svg>
                </div>
                <div class="product-text">
                  <h1>{mproducto.Nombre}</h1>
                  <h2>{mproducto.Categoria}</h2>
                  <p > {mproducto.Altura}CM X {mproducto.Ancho}CM<br/> {mproducto.Descripcion}  <br/>En existencia: {mproducto.Stok}</p>
                </div>
                <div class="product-price-btn">
                  <p><span>{mproducto.Precio}$</span></p>
                  <button type="button" onClick={() =>this.onSubmitProductoACarrtio(mproducto)} > Agregar al Carrito</button>
                </div>
              </div>
            </div>
          </Modal>
        ))}
 

        </div>

      
   
  
        )
    }
}