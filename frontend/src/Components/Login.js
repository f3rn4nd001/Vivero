import React, { Component } from 'react'
import './css/Login.css';
import Index from './Index';
import PropTypes from 'prop-types';
import axios from 'axios';
import {  Redirect, Route } from 'react-router-dom';
import {Link} from 'react-router-dom';
import { Modal,Button } from 'rsuite';
import swal from 'sweetalert';
export default class Login extends Component  {
  
  constructor(props) {
    super(props);
    this.state = {
      users:[], 
      backdrop:false, 
      showlogin:true, 
      showRegistro:false, 
      showToken:false,
      showRecuContra:false,
      PrimerNombre:'', 
      PrimerApellido:'', 
      SegundoApellido:'', 
      file:'', 
      email:'', 
      password:'', 
      password_conf:'', 
      imagen:{}, 
      Sexo:'', 
      Edad:'', 
      Telefono:'',
      Token:[],
    };
    this.closeRegis = this.closeRegis.bind(this);
    this.openRegis = this.openRegis.bind(this);
    this.closeLogin= this.closeLogin.bind(this);
    this.openLogin = this.openLogin.bind(this);
    this.OpenRecuContra =this.OpenRecuContra.bind(this);
    this.closeRecuContra =this.closeRecuContra.bind(this);
    this.closeToken = this.closeToken.bind(this);
    this.openToken = this.openToken.bind(this);
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
  OpenRecuContra(){
    this.setState({showlogin: false});
    this.setState({showRecuContra: true});   
  }
  closeRecuContra(){
    this.setState({showlogin: true});
    this.setState({showRecuContra: false});
  }
  closeToken(){
    this.setState({ showlogin:true });
    this.setState({ showToken:false });
  }
  openToken(){
    this.setState({showlogin: false});
    this.setState({showToken: true});
  }

  closeLogin() {
    this.setState({ showlogin:false });
    this.setState({ showRegistro:true });
  }
  openLogin() {
    this.setState({ showRegistro:false });
    this.setState({ showlogin:true });
  }
  closeRegis() {
    this.setState({ showRegistro:false });
    this.setState({ showlogin:true });
  }
  openRegis() {
    this.setState({ showlogin:false });
    this.setState({ showRegistro:true });
  }
  
  onChangePrimerNombre = (e) => { this.setState({ PrimerNombre:e.target.value })}

  onChangeimg  = (e) => { this.setState({ imagen:e.target.value })}
  onChangeEdad = (e) => { this.setState({ Edad:e.target.value })}
  onChangePrimerApellido = (e) =>{ this.setState({ PrimerApellido:e.target.value })}
  onChangeSegundoApellido = (e) =>{ this.setState({ SegundoApellido:e.target.value })}
  onChangeemail = (e) =>{ this.setState({ email:e.target.value })} 
  onChangepassword = (e) => { this.setState({ password:e.target.value })}
  onChangepassword_conf = (e) => { this.setState({ password_conf:e.target.value })}
  onChangeTelefono = (e) => { this.setState({ Telefono:e.target.value })} 
  onChangeSexo = (e) => { this.setState({ Sexo:e.target.value })}
  onChangeToken = (e) => {this.setState({ Token:e.target.value })}

  Cerrarsecion= async e=>{
    e.preventDefault();
    localStorage.removeItem('token');
    window.location.href="/";
  }
  onSubmitREcuContra = async e => {
    const res = await fetch('http://localhost:3001/api/Gmail/',{
      method:'POST', headers:{
        'Accept':'application/json',
        'Content-Type':'application/json',
        'token':localStorage.getItem('token')
      }, 
      body: JSON.stringify({
        email:this.state.email,
       
      })
    }).then((response)=>response.json()).then((res,req,next)=>{   
      if(res.success===true){
        swal({icon: "success", closeOnClickOutside: false,text:'Tu token : '}).then(willDelete => {
          if (willDelete) {
           
          }
        });
      }
      else{
        swal({ closeOnClickOutside: false,text:res.message,icon: "info" });
       }
    })
  }

  onSubmitLogin = async e => {
    e.preventDefault();
    const res = await fetch('http://localhost:3001/api/Usuarios/Login',{
      method:'POST', headers:{
        'Accept':'application/json',
        'Content-Type':'application/json',
        'token':localStorage.getItem('token')
      }, 
      body: JSON.stringify({
        email:this.state.email,
        password:this.state.password,
      })
    }).then((response)=>response.json()).then((res,req,next)=>{   
      if(res.success===true){
        localStorage.setItem('token',res.Token);
        const tokenString = localStorage.getItem('token');
        swal({icon: "success", closeOnClickOutside: false,text:'Tu token : ' + tokenString}).then(willDelete => {
          if (willDelete) {
            window.location.href="/PIndexReact";
          }
        });
        
       
      }
      else{
        swal({ closeOnClickOutside: false,text:res.message,icon: "info" });
       }
    })
  }
  
  onSubmitToken =async e =>{
    e.preventDefault();
    const res = await fetch('http://localhost:3001/api/Usuarios/Login/Token',{
      method:'POST', headers:{
        'Accept':'application/json',
        'Content-Type':'application/json',
        'token':localStorage.getItem('token')
      }, 
      body: JSON.stringify({
        token:this.state.Token,
      })
    }).then((response)=>response.json()).then((res,req,next)=>{   
      if(res.success===true){
        localStorage.setItem('token',res.Token);
        const tokenString = localStorage.getItem('token');
        swal({icon: "success", closeOnClickOutside: false,text:'Tu token a sido confirmado' }).then(willDelete => {
          if (willDelete) {
            window.location.href="/PIndexReact";
          }
        });
      }
      else{
        swal({icon: "info",timer:4000,text:'Tu token no es válido' });
       
       }
    })
  
  }
  onSubmit= async e => {
    e.preventDefault();
      const res = await fetch('http://localhost:3001/api/Usuarios',{
        method:'POST', headers:{
          'Accept':'application/json',
          'Content-Type':'application/json',
        }, 
        body: JSON.stringify({
          PrimerNombre:this.state.PrimerNombre,
          SegundoNombre:this.state.SegundoNombre,
          PrimerApellido:this.state.PrimerApellido,
          imagen:this.state.imagePreviewUrl,
          Edad:this.state.Edad,
          SegundoApellido:this.state.SegundoApellido,
          email:this.state.email,
          password:this.state.password,
          password_conf:this.state.password_conf,     
          Telefono:this.state.Telefono,  
          Sexo:this.state.Sexo,
        })
      }).then((response)=>response.json()).then((res)=>{        
      if(res.success===true){
        swal({icon: "success", closeOnClickOutside: false,text:'El usuario a sido degistrado' }).then(willDelete => {
          if (willDelete) {
            window.location.href="/";
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
      $imagePreview = ( <img  style={{borderImage:'red'}} src={imagePreviewUrl} />);
    } 
    else{
    $imagePreview = (<div  style={{color:'white'}} className="previewText">La imagen no se ha elegido</div>);
    }
    return(
      <div style={{background:"rgb(224 224 224)"}}> 
        <div id='mySection' style={{background:"rgb(224 224 224)"}}></div>
        <br/>
        <div className="col-md-12" style={{background:"rgb(224 224 224)"}}>
          <ol style={{background:"rgb(92 90 90)",borderRadius:"10px"}}  className="col-md-1 breadcrumb">

              <li style={{color: "antiquewhite"}}> <i style={{color: "antiquewhite"}} class="fa fa-2x"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16">
                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
                </svg>Sesión
              </i>
            </li>
          </ol>
        </div> 


        <Modal style={{background:"rgb(224 224 224)", minHeight:"579px"}} backdrop={backdrop} show={this.state.showlogin} onHide={this.openLogin}>
          <div className="login-wrap1">
            <div className="login-html">    
            <a   style={{color:'white',backgroundColor:'-moz-initial',paddingLeft:'220px', marginLeft:10}} onClick={this.OpenRecuContra}>Recuperar contraseña</a>
              <center><label style={{color:"white" }} htmlFor="PrimerNombre">Iniciar sesión</label></center>               
              <div className="login-form ">      
              <div className=''>
                <form  onSubmit={this.onSubmitLogin} >
                  <div className="group col-md-12" >
                    <label htmlFor="email" className="label ">Email</label>
                    <input  placeholder="Email@gmail.com"  required="required" autofocus="autofocus" id="email" name="email" onChange={this.onChangeemail} type="text" className="input"/>
                  </div>
                  <div className="group col-md-12">
                    <label htmlFor="password" className="label ">Contraseña</label>
                    <input required="required" placeholder="Tiene que tener mínimo 4 caracteres" id="password" name="password" onChange={this.onChangepassword} type="password" className="input"/>
                  </div>
                  <br></br>
                  <div class="  ">
                     <button className=' col-md-3' style={{width:"100%", height:"130%",borderRadius:20}}  type="submit">Entrar</button>
                    <a  class="col-md-5" style={{color:'white',backgroundColor:'-moz-initial', marginLeft:10, textAlign:"center"}} onClick={this.openToken}>Iniciar con token</a>
                     <Button className=' col-md-3' style={{width:"100%", height:"130%", borderRadius:20}} onClick={this.openRegis} appearance="primary">Registro</Button>
                  </div>
              
                </form> 
                </div>
              </div>
            </div>
          </div>
        </Modal>
        
        
        
        
        <Modal style={{background:"rgb(224 224 224)", minHeight:"579px"}} backdrop={backdrop} show={this.state.showToken} onHide={this.openLogin}>
          <div className="login-wrap2">
            <div className="login-html">    
            
              <center><label style={{color:"white"}} htmlFor="PrimerNombre">Iniciar sesión</label></center>               
              <div className="login-form">      
  
                <form   onSubmit={this.onSubmitToken}>
                  <div className="group">
                    <label htmlFor="email" className="label">Token</label>
                    <input required="required" autofocus="autofocus"  placeholder="Token" id="Token" name="Token" onChange={this.onChangeToken} type="text" className="input"/>
                  </div>
                  
                  <br></br>
                  <div class="col-md-12">
                     <button class="col-md-5" style={{width:"100%", height:"130%", borderRadius:20}}  type="submit">Entrar</button>
                     <div class="col-md-2"></div>
                     <button class="col-md-5" style={{width:"100%", height:"130%", borderRadius:20}} onClick={this.closeToken} appearance="primary">Iniciar con gmail</button>
                  </div>
                </form> 
                
              </div>
            </div>
          </div>
        </Modal>
        
        
        <Modal style={{background:"rgb(224 224 224)", minHeight:"579px"}} backdrop={backdrop} show={this.state.showRecuContra} onHide={this.OpenRecuContra}>
          <div className="login-wrap2">
            <div className="login-html">    
            
              <center><label style={{color:"white"}} htmlFor="PrimerNombre">Recuperar contraseña</label></center>               
              <div className="login-form">      
  
                <form onSubmit={this.onSubmitREcuContra}>
                  <div className="group">
                    <label htmlFor="email" className="label">Email</label>
                    <input required="required" onChange={this.onChangeemail} autofocus="autofocus"  placeholder="Email@gmail.com" id="email" name="email" type="text" className="input"/>
                  </div>
                  
                  <br></br>
                  <div class="col-md-12">
                     <button class="col-md-5" style={{width:"100%", height:"130%", borderRadius:20}}  type="submit">Entrar</button>
                     <div class="col-md-2"> </div>
                     <button class="col-md-5" style={{width:"50%", height:"130%", borderRadius:20}} onClick={this.closeToken} onClick={this.closeRecuContra} appearance="primary">Regesar</button>
</div>
                </form> 
                
              </div>
            </div>
          </div>
        </Modal>

        <Modal  style={{background:"rgb(224 224 224)", minHeight:"570px"}} backdrop={backdrop} show={this.state.showRegistro} >
          <div className="login-wrap ">
            <div className="login-html ">  
            <div className=" col-12" style={{paddingLeft:'70%'}}><Button style={{width:"200px", height:"45px", borderRadius:5}} onClick={this.closeRegis} >Iniciar sesión</Button></div> 

              <center><label style={{color:"white"}} htmlFor="PrimerNombre">Registro</label></center>
              <div className="login-form col-12">
          
                <form  onSubmit={this.onSubmit} style={{marginLeft:'-70px',marginRight:'-80px'}} class="row">
                  <div className="group col-4">
                    <li class="fila">
                      <input required="required" autofocus="autofocus" placeholder="Primer nombre"  id="PrimerNombre" name="PrimerNombre" onChange={this.onChangePrimerNombre} type="text" className="input"/>
                      <label htmlFor="PrimerNombre" className="label propiedad">Nombre</label>
                      <input type="hidden" id="codigo" name="code" value="25" />
                    </li>
                  </div>
                 
                  <div className="group col-4">
                    <li class="fila">
                      <input required="required" placeholder="Primer apellido" id="PrimerApellido" name="PrimerApellido" onChange={this.onChangePrimerApellido} type="text" className="input"/>
                      <label htmlFor="PrimerApellido" className="label propiedad">Primer apellido</label>
                      <input type="hidden" id="codigo" name="code" value="25" />
                    </li>
                  </div>
                  <div className="group col-4">
                  <li class="fila">
                    <label htmlFor=" SegundoApellido" className="label"> Segundo apellido</label>
                    <input placeholder="Segundo apellido" id=" SegundoApellido" name=" SegundoApellido" onChange={this.onChangeSegundoApellido} type="text" className="input"/>
                  </li>
                  </div>
                  <div className="group col-1"></div>
                  <div className="group col-10">
                    <li class="fila">
                      <input required="required" placeholder="Email@gmail.com" id="email" name="email" onChange={this.onChangeemail} type="email" className="input"/>
                      <label htmlFor="email" className="label propiedad">Email</label>
                      <input type="hidden" id="codigo" name="code" value="25" />
                    </li>
                  </div>
                  <div className="group col-6">
                    <li class="fila">
                      <input required="required" placeholder="Tiene que tener mínimo 4 caracteres" id="password" name="password" onChange={this.onChangepassword} type="password" className="input"/>
                      <label htmlFor="password" className="label propiedad">Contraseña</label>
                      <input type="hidden" id="codigo" name="code" value="25" />
                    </li>
                  </div>
                  <div className="group col-6">
                    <li class="fila">
                      <input required="required" placeholder="Tiene que tener mínimo 4 caracteres"  id="password_conf" name="password_conf" onChange={this.onChangepassword_conf} type="password" className="input"/>
                      <label htmlFor="password_conf" className="label propiedad">Confirmar contraseña</label>
                      <input type="hidden" id="codigo" name="code" value="25" />
                    </li>
                  </div>
                  <div className="group col-4">
                  <li class="fila">
                    <label htmlFor="sexo" className="label">Sexo</label>
                    <select name="Sexo" id="Sexo" className="input" onChange={this.onChangeSexo}>
                      <option style={{color:'black'}} >Sexo</option>
                      <option style={{color:'black'}} value="Hombre">Hombre</option>
                      <option style={{color:'black'}} value="Mujer">Mujer</option>
                    </select>                   
                  </li>
                  </div>
                  <div className="group col-4">
                  <li class="fila">
                    <label htmlFor="Telefono" className="label">Teléfono</label>
                    <input id="Telefono" name="Telefono" onChange={this.onChangeTelefono} type="number" className="input"/>
                  </li>
                  </div>
                  <div className="group col-4">
                  <li class="fila">
                      <label htmlFor="Edad" className="label">Año de nacimiento</label>
                      <input type="date" id="Edad" name="Edad" onChange={this.onChangeEdad} className="input"  min="1900-01-01" max="2025-12-31"/>
                    </li>
                  </div>
                  <div className="group col-7">
                    <li class="fila">
                      <input className="fileInput"  style={{color:'white'}}type="file" onChange={(e)=>this._handleImageChange(e)} />  
                    </li>
                  </div>
                  <div style={{minWidth:'200px',maxWidth:'300px',minHeight:'200px',maxHeight:'300pxs'}} className="imgPreview_login col-5">
                    {$imagePreview}
                    </div>
                    <div className="col-12">
                  <button className="button" style={{width:"200px", height:"50px", borderRadius:5}} type="submit"  >Guardar</button>
                  </div>
                </form> 
              </div>
            </div>
          </div>
        </Modal>
      </div>
    )
  }
}
