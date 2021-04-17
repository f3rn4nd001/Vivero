import React, { Component } from 'react'
import axios from 'axios';
import './css/Perfil.css';

import swal from 'sweetalert';
import { Modal,Button } from 'rsuite';
export default class Perfil extends Component {
    constructor(props) {
        super(props);
        this.state = {
        users:[],
        backdrop:false, 
        showPerfil:true, 
        showEditar:false,  
        imagen:{}, 
        file:'',
        PrimerNombre:'', 
        PrimerApellido:'', 
        SegundoApellido:'', 
        email:'', 
        password:'', 
        Sexo:'', 
        Edad:'', 
        Telefono:'',
        password_conf:'', 
    }
    this.closePerfil = this.closePerfil.bind(this);
    this.openPerfil = this.openPerfil.bind(this);
}
openPerfil(){
    this.setState({showPerfil: true});
    this.setState({showEditar: false});   
  }
  closePerfil(){
    this.setState({showEditar: true});
    this.setState({showPerfil: false});
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

  onSubmitEditariUsuario = async _id => {
    const res = await fetch('http://localhost:3001/api/Usuarios/EditarUsuarioPerfil/'+_id,{
      method:'PUT', headers:{
        'token':localStorage.getItem('token'),
        'Accept':'application/json',
        'Content-Type':'application/json',
      }, 
      body: JSON.stringify({
        PrimerNombre:this.state.PrimerNombre,
        PrimerApellido:this.state.PrimerApellido,
        SegundoApellido:this.state.SegundoApellido,
        email:this.state.email,
        password:this.state.password,
        Sexo:this.state.Sexo,
        Telefono:this.state.Telefono,
        Edad:this.state.Edad,
        imagen:this.state.imagePreviewUrl,
      })
    }).then((response)=>response.json()).then((res)=>{    
      
      if(res.success===true){
        swal({icon: "success", closeOnClickOutside: false,text:res.message}).then(willDelete => {
          if (willDelete) {
            window.location.href="/perfil";
          }
        });
    
      }
      else{
        swal({icon: "info",timer:4000,text:res.message });
      }
    })
    
  }
    async componentDidMount(){
        const res = await axios.get('http://localhost:3001/api/Usuarios/Perfil',{headers:{'token':localStorage.getItem('token')}});
        this.setState({users: res.data});
          
           if(res.success===false){
            swal({ closeOnClickOutside: false,text:res.message,icon: "info" });
          }
    }
    render() {
        const { backdrop, showRegistro,showlogin } = this.state;
        return (
            <div >
                    
        <Modal style={{background:"#85a02a", minHeight:"579px",paddingLeft:'30px',minWidth:'100%',backgroundSize:'contain',backgroundImage:"url(https://ak.picdn.net/shutterstock/videos/18869951/thumb/1.jpg)",backgroundColor:'rgb(100,100,100',backgroundBlendMode:'soft-light'}} backdrop={backdrop} show={this.state.showPerfil} onHide={this.openPerfil}>
    
            <div style={{minHeight:"670px"}}   >
                <div id='mySection'></div>
                <div className="container-fluid">
                    <br/>
                    <div className="col-md-12">
                        <ol style={{background:"rgb(92 90 90)",borderRadius:"10px"}}  className="col-md-1 breadcrumb">
                            <li style={{color: "antiquewhite"}}> 
                                <i style={{color: "antiquewhite"}} class="fa fa-2x">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16">
                                        <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                                        <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
                                    </svg> Perfil
                                </i>
                            </li>
                        </ol>
                    </div> 
                </div>
                <link href="https://fonts.googleapis.com/css?family=Alfa+Slab+One" rel="stylesheet"/>
                <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"/>
                {this.state.users.map(user => (
                    <div class="info_items"  >
                        <img key={user._id} class="usu" src={user.imagen}/>
                        <div class="info">
                            <h2 style={{color:'white'}}>{user.PrimerNombre}  {user.PrimerApellido} {user.SegundoApellido} </h2>
                            
                            <label style={{color:'white'}}>Correo electrónico :</label>
                            <input type="text" value={user.email} disabled/>
                            <label style={{color:'white'}}>Género :</label>
                            <input type="text" value={user.Sexo} disabled/>
                            <label style={{color:'white'}}>Fecha de Nacimiento :</label>
                            <input type="text" value={user.Edad} disabled/>
                            <label style={{color:'white'}}  >Teléfono :</label>
                            <input type="text" value={user.Telefono} disabled/>
                            <Button style={{ height:"130%",backgroundColor:'rgb(204 250 16)'}} onClick={this.closePerfil} appearance="primary"> Editar Datos</Button>
                        </div>
                    </div>
                ))}

                 
            </div> 
            </Modal>
            <Modal style={{background:"rgb(53 121 48)", paddingLeft:'30px',minHeight:"549px",minWidth:'100%',backgroundSize:'contain',backgroundImage:"url(https://ak.picdn.net/shutterstock/videos/18869951/thumb/1.jpg)",backgroundColor:'rgb(100,100,100',backgroundBlendMode:'soft-light'}} backdrop={backdrop} show={this.state.showEditar} onHide={this.openPerfil}>
                <div style={{minHeight:"670px"}}>
                    <div id='mySection'></div>
                    <div className="container-fluid">
                        <br/>
                        <div className="col-md-12">
                            <ol style={{background:"rgb(92 90 90)",borderRadius:"10px"}}  className="col-md-1 breadcrumb">
                                <li style={{color: "antiquewhite"}}> <a style={{color: "antiquewhite"}} href='/perfil'> 
                                    <i style={{color: "antiquewhite"}} class="fa fa-2x">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16">
                                            <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                                            <path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
                                        </svg> Perfil 
                                    </i></a>
                                </li>
                            </ol>
                        </div> 
                    </div>
                    <link href="https://fonts.googleapis.com/css?family=Alfa+Slab+One" rel="stylesheet"/>
                    <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"/>
                    {this.state.users.map(user => (
                        <div class="info_items"  >
                            <img key={user._id} class="usu" src={user.imagen}/>
                            <div class="info ">
                                <div className='col-12'><input type="text" class=" col-5"  onKeyUp={this.onChangePrimerNombre}  placeholder={user.PrimerNombre}/>  <input  type="text" class=" col-3"  onKeyUp={this.onChangePrimerApellido}  placeholder={user.PrimerApellido}/>  <input  type="text" class=" col-3"  onKeyUp={this.onChangeSegundoApellido}  placeholder={user.SegundoApellido} /></div> 
                                <label style={{color:'white'}}>Correo electrónico :</label>
                                <input style={{maxWidth:'100%'}} type="text" class=""  onKeyUp={this.onChangeemail}  placeholder={user.email}></input>
                                <label style={{color:'white'}}>Género :</label>
                                <input type="text"   onChange={this.onChangeSexo} class=" col-4"  list="sexo" placeholder={user.Sexo}/>
                                <datalist id="sexo">
                                  <option value="Hombre">Hombre</option>
                                  <option value="Mujer">Mujer</option>
                                  </datalist>
                                <label style={{color:'white'}}>Fecha de Nacimiento :</label>
                                <input type="text" class=" col-4" type="date" min="1900-01-01" max="2025-12-31"  onKeyUp={this.onChangeEdad}  placeholder={user.Edad} />
                                <label style={{color:'white'}}>Teléfono :</label>
                                <input  type="text" class=" col-4"  onKeyUp={this.onChangeTelefono}  defaultValue={user.Telefono}></input>
                                <label style={{color:'white'}}>Nueva Contraseña</label>
                                <input  type="text" class=""  onKeyUp={this.onChangepassword}/>
                                <button  style={{backgroundColor:'rgb(204 250 16)'}} onClick={() =>this.onSubmitEditariUsuario(user._id)}>Guardar datos</button>
                            </div>
                        </div>
                    ))}
                </div> 
                </Modal>
            </div>
        )
    }
}