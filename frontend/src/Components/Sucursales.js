import React, { Component } from 'react'
import axios from 'axios';
import GoogleMaps from "simple-react-google-maps";
import Tooltip from '@material-ui/core/Tooltip';

export default class Sucursales extends Component {
  render() {
    return (
      <div class="" style={{minWidth:'105%',backgroundSize:'contain',backgroundImage:"url(https://ak.picdn.net/shutterstock/videos/18869951/thumb/1.jpg)",backgroundColor:'rgb(100,100,100',backgroundBlendMode:'soft-light'}}>
        <div id='mySection'></div>
        <div className="col-md-12">
          <ol style={{background:"rgb(92 90 90)",borderRadius:"10px"}}  className="col-md-2 breadcrumb">
            
            <li style={{color: "antiquewhite"}}> <i style={{color: "antiquewhite"}} class="fa fa-map-marker fa-2x"> Sucursales</i></li>
          </ol>
        </div>            
        
        <header style={{ margin: "10px 0px 0px" ,}}>
          <div style={{textAlign:"center",color:'white'}}>
            <h1 class="SectionHeader__Heading Heading u-h1">Sucursales</h1>
          </div>
        </header>
  
        <div  style={{width:"210%" ,display:"inline-block" , margin: "6% 16% 10%",textAlign:"center"}}>     
          <div class="card">      
            <Tooltip  title="Somos expertos de las orquídeas. Contamos con más de 18 años de experiencia en el mercado (PLANTAS DE ORNATO, PALMAS, ARBOLES, FRUTALES, CITRICOS, NOCHEBUENA.)" placement="right" >
              <div class="card-body"><a href="/" style={{textDecoration:"none" ,textDecorationColor:"black"}}>
                <h1 class="card-title" style={{textDecorationColor:"black"}}>Manzanillo colima</h1>
                <br/>
                <h2 class="card-title">El Lago Viveros</h2>
                <br></br>
                <h2>5, Av Paseo de las Garzas 2119, 28219 Manzanillo, Col.</h2></a>
                <GoogleMaps class="card-img"  apiKey={"AIzaSyAIoaqD6zupornIMbdYcAfDaTSHjAjFWJ4"} style={{margin :"10px" ,   height: "300px", width: "97%"}} zoom={14} center={{lat: 19.1102442, lng: -104.3181083}} markers={[ { lat: 19.1102442, lng: -104.3181083 },]}/>
                <a href="/" style={{textDecoration:"none" ,textDecorationColor:"black"}}>
                  <h3>  
                    <div className="col-md-12">
                      <br></br>
                    <li style={{ listStyleType: "none" }}><h2>Horario :</h2></li>
                    <lu className="col-md-6" style={{ listStyleType: "none" }}>
                     
                     <li>lunes 8:00–20:00</li>
                      <li>martes 8:00–20:00</li>
                      <li>miércoles 8:00–20:00</li>
                      <li>jueves 8:00–20:00</li>
                      <br/>
                    </lu>
                    <lu className="col-md-6" style={{ listStyleType: "none" }}>
                     
                      <li>viernes 8:00–20:00</li>
                      <li>sábado 8:00–18:00</li>
                      <li>domingo 10:00–15:00</li>
                      
                      <br/>
                    </lu>
                    </div>
                    
                  </h3>
                  
                  <h3> 
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-telephone-fill" viewBox="0 0 16 16">
                      <path fill-rule="evenodd" d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z"/>
                    </svg>Teléfono : 3141970232
                  </h3>
                  
                  <h3>
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" class="bi bi-envelope-fill" viewBox="0 0 16 16">
                      <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555zM0 4.697v7.104l5.803-3.558L0 4.697zM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757zm3.436-.586L16 11.801V4.697l-5.803 3.546z"/>
                    </svg> Correo electrónico : ellagoviveros@gmail.com
                  </h3>
        
                  <h3>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-facebook" viewBox="0 0 16 16">
                      <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z"/>
                    </svg>Facebook : El Lago Viveros
                  </h3>
                </a>
              </div>     
            </Tooltip>
          </div>
        </div>
      </div>
    )
  }
}