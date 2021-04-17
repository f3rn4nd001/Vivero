import React, { Component } from 'react';
import { BrowserRouter as Router,Route  } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import Card from '@material-ui/core/Card';
import axios from 'axios';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import { Modal } from 'rsuite';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import swal from 'sweetalert';
import './css/Prueba.css'
import './css/index.css';
import './css/Productos.css';
export default class Index extends Component {
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

  async onSubmitMostarProducto (_id){
    const res = await axios.get('http://localhost:3001/api/Productos/'+_id);
    this.setState({productosmos: res.data}); 
  }

    async componentDidMount(){
        const res = await axios.get('http://localhost:3001/api/Productos/Inicio');
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
    render() {
        const { backdrop, showRegistro,showlogin } = this.state;
        return (
                <div style={{minWidth:'105%', backgroundSize:'contain',backgroundImage:"url(https://ak.picdn.net/shutterstock/videos/18869951/thumb/1.jpg)",backgroundColor:'rgb(100,100,100',backgroundBlendMode:'soft-light'}} >
                     <div className="col-md-12" style={{padding: "25px 0"}}>
                    <ol style={{background:"rgb(92 90 90)",borderRadius:"10px"}}  className="col-md-1 breadcrumb">
                    <li ><a style={{color: "antiquewhite"}} href='/PIndexReact'> <i  style={{color: "antiquewhite"}}class="fa fa-home "> Inicio</i></a></li>
                   
                    </ol>
                </div > 
               <div id='mySection' style={{maxWidth:'95%'}} >
                    <section  style={{ maxWidth:'95%', padding: "50px 0 50px 50px"}}>
                        <div style={{textAlign:"center"}}>
                            <div style={{paddingLeft:"35%",paddingRight:"50px",color:'whitesmoke'}}>
                                <div style={{ maxWidth:"325px"}}>
                                    <header style={{display:"block"}}>
                                        <h2  style={{marginTop:"1.0em"}}>Orgullosamente Mexicanos</h2>
                                        <div style={{padding:'20px 0 36px'}}>
                                            <p><h7>Somos la empresa líder en la producción y venta de orquídeas tropicales de alta calidad y belleza. Tanto en&nbsp;flores cortadas, como en plantas con flor.</h7></p>
                                        </div>
                                    </header>
                                </div>
                            </div>
                        </div>
                    </section>
                    
                
                    <section class="cards col-md-9">
                    {this.state.productos.map(producto => (
                       
                        <article   key={producto._id} style={{borderRadius:"1rem"}} class="card card--1">
                          <div onClick={this.openLogin }>
                              <div onClick={() =>this.onSubmitMostarProducto(producto._id)}>
                            <div  class="card__img"></div>
                            <a   class="card_link">
                                <div  class="card__img--hover"  ><img style={{maxWidth:"100%",minHeight:"100%"  }} src={producto.Imagen}></img></div>
                            </a>
                            <div class="card__info">
                                <Avatar alt="Remy Sharp" src={producto.Imagen} />
                                <span class="card__category"> {producto.Tipo}</span>
                                <h3 class="card__title" >{producto.Nombre}</h3>
                                <h3 class="card__by">{producto.Precio}$</h3>
                            </div>
                            </div>
                            </div>
                        </article>
                      ))}
                        
                    </section>
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
                  <h2>{mproducto.Nombre}</h2>
                  <h2>{mproducto.Categoria}</h2>
                  <p > {mproducto.Altura}CM X {mproducto.Ancho}CM<br/> {mproducto.Descripcion}<br/>En existencia: {mproducto.Stok}  </p>
                </div>
                <div class="product-price-btn">
                  <p><span>{mproducto.Precio}$</span></p>
                  <button type="button" onClick={() =>this.onSubmitProductoACarrtio(mproducto)} > Agregar al Carrito</button>
                </div>
              </div>
            </div>
          </Modal>
        ))}
                    <br/><br/>
                    
                    <section >
                        <div >
                          <iframe  width="60%" height="600"   class="d-block " style={{backgroundBlendMode:"soft-light",transform: " matrix(1.7, 0, 0, 1, 255, 0)"}} src="https://www.youtube-nocookie.com/embed/r0l0rMgEHNc" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                        </div>
                    </section>
                    
                    <br/><br/>
  
                    <header style={{marginBottom:"40px" ,textAlign:"center",color:'whitesmoke'}} class="Container">
                        <div style={{padding:"0 0px 0 55px"}} ><h2 style={{marginTop:"1em"}}>Cuidado de las plantas</h2></div>
                    </header>
                    <div style={{transform: " matrix(1, 0, 0, 1, 30, 0)" }} >
                    <div className="col-md-12"  >
                    <div class="cards col-md-6" >
                      
                        <Tooltip  title="PRESIONAME PARA VER MAS"  placement="right" >
                            <Card  style={{ maxWidth: 525 }} >
                                         <Accordion>
                                          <AccordionSummary aria-controls="panel1a-content" id="panel1a-header">
                                        <CardActionArea>
                                        <CardMedia style={{height: 303,width:550}} image="https://http2.mlstatic.com/D_NQ_NP_687255-CBT43154695904_082020-O.webp" />
                                         <CardContent>
                                             <Typography gutterBottom variant="h4" component="h2">
                                                Rosales: plagas y enfermedades
                                            </Typography>
                                            <Typography variant="p" color="textSecondary" component="h4">
                                                Es fácil mantener sanos los rosales tratándolos periódicamente con un producto polivalente, capaz de actuar sobre insectos y hongos a la vez; conviene aplicarlo cada 15 o 20 días desde que los brotes tienen...
                                            </Typography>
                                           
                                        </CardContent>
                                       
                                    </CardActionArea>
                                    </AccordionSummary>
                                            <AccordionDetails>
                                            <Typography variant="p" color="textSecondary" component="h4">
                                            entre 10 y 20 centímetros de largo, hasta mediados de septiembre. Para controlar el ataque de plagas y hongos concretos, existen tratamientos específicos. Los expertos de los centros de jardinería te ayudarán a identificar el problema y te aconsejarán qué hacer
                                            </Typography>
                                          </AccordionDetails>
                                        </Accordion>
                            </Card>
                        </Tooltip>
                        </div>
                     
                        <div class="cards col-md-6">
                        <Tooltip  title="PRESIONAME PARA VER MAS"  placement="right" >
                            <Card  style={{ maxWidth: 525 }} >
                                         <Accordion>
                                          <AccordionSummary aria-controls="panel1a-content" id="panel1a-header">
                                        <CardActionArea>
                                        <CardMedia style={{height: 303, width:550}} image="https://http2.mlstatic.com/D_NQ_NP_687255-CBT43154695904_082020-O.webp" />
                                         <CardContent>
                                             <Typography gutterBottom variant="h4" component="h2">
                                                Rosales: plagas y enfermedades
                                            </Typography>
                                            <Typography variant="p" color="textSecondary" component="h4">
                                                Es fácil mantener sanos los rosales tratándolos periódicamente con un producto polivalente, capaz de actuar sobre insectos y hongos a la vez; conviene aplicarlo cada 15 o 20 días desde que los brotes tienen...
                                            </Typography>
                                           
                                        </CardContent>
                                       
                                    </CardActionArea>
                                    </AccordionSummary>
                                            <AccordionDetails>
                                            <Typography variant="p" color="textSecondary" component="h4">
                                            entre 10 y 20 centímetros de largo, hasta mediados de septiembre. Para controlar el ataque de plagas y hongos concretos, existen tratamientos específicos. Los expertos de los centros de jardinería te ayudarán a identificar el problema y te aconsejarán qué hacer
                                            </Typography>
                                          </AccordionDetails>
                                        </Accordion>
                            </Card>
                        </Tooltip>
                    </div>
                    </div>
</div>
                    <br/><br/>

            

                </div>
</div>
            )
        }
    }
