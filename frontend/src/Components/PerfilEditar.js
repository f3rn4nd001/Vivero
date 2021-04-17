import React, { Component } from 'react'
import axios from 'axios';
import { Modal,Button } from 'rsuite';
import './css/EditarProducto.css';
import { Input } from '@material-ui/core';
import CardActionArea from '@material-ui/core/CardActionArea';
import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import swal from 'sweetalert';

export default class PerfilEditar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Usuarios:[],
      Eliminar:'',
      backdrop:false, 
      showlogin:false, 
      imagen:{}, 
      file:'',
      PrimerNombre:'', 
      SegundoNombre:'', 
      PrimerApellido:'', 
      SegundoApellido:'', 
      email:'', 
      password:'', 
      Sexo:'', 
      Edad:'', 
      Telefono:'',
      role:'',
    }
   } 
  
  onChangePrimerNombre = (e) => { this.setState({ PrimerNombre:e.target.value })}
  onChangeSegundoNombre = (e) => { this.setState({ SegundoNombre:e.target.value })}
  onChangeimg  = (e) => { this.setState({ imagen:e.target.value })}
  onChangeEdad = (e) => { this.setState({ Edad:e.target.value })}
  onChangePrimerApellido = (e) =>{ this.setState({ PrimerApellido:e.target.value })}
  onChangeSegundoApellido = (e) =>{ this.setState({ SegundoApellido:e.target.value })}
  onChangeemail = (e) =>{ this.setState({ email:e.target.value })} 
  onChangepassword = (e) => { this.setState({ password:e.target.value })}
  onChangepassword_conf = (e) => { this.setState({ password_conf:e.target.value })}
  onChangeTelefono = (e) => { this.setState({ Telefono:e.target.value })} 
  onChangeSexo = (e) => { this.setState({ Sexo:e.target.value })}
  onChangeRole = (e) => {this.setState({role:e.target.value})}

  async componentDidMount(){
    const res = await axios.get('http://localhost:3001/api/Usuarios/Mostrar');
    this.setState({Usuarios: res.data});
  }
  
 
  
  onSubmitEliminarUsurio = async _id  => {
    if (window.confirm('Seguro que desea eliminarlo')){
    const res = await fetch('http://localhost:3001/api/Usuarios/Eliminar/',{
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
            window.location.href="/PerfilEditar";
          }
        });
      }
      else{
        swal({icon: "info",timer:4000,text:res.message });
      }
    })}
  }

 

  

  onSubmitEditarProducto = async _id => {
    const res = await fetch('http://localhost:3001/api/Usuarios/EditarUsuario/'+_id,{
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
        role:this.state.role,
        Sexo:this.state.Sexo,
        Telefono:this.state.Telefono,
        Edad:this.state.Edad,
        imagen:this.state.imagePreviewUrl,
      })
    }).then((response)=>response.json()).then((res)=>{    
      
      if(res.success===true){
        swal({icon: "success", closeOnClickOutside: false,text:res.message}).then(willDelete => {
          if (willDelete) {
            window.location.href="/PerfilEditar";
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
              <th><h1>ver mas</h1></th>
              <th><h1>Imagen</h1></th>
              <th><h1>Nombre</h1></th>
              <th><h1>Primer apellido</h1></th>
              <th><h1>Segundo apellido</h1></th>
              <th><h1>email</h1></th>
              <th colspan="2"><h1>Opciones</h1></th>
            </tr>
          </thead>
          
          <tbody>
            {this.state.Usuarios.map(usuario => (
              <tr  key={usuario._id} >
                <td >
                  <Accordion style={{maxWidth:"100px"}}>
                    <AccordionSummary aria-controls="panel1a-content" id="panel1a-header">
                      <CardActionArea>
                      <svg style={{color:'green'}} xmlns="http://www.w3.org/2000/svg" width="70" height="30" fill="currentColor" class="bi bi-list-ul" viewBox="0 0 16 16">
                        <path fill-rule="evenodd" d="M5 11.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm-3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm0 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm0 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
                      </svg>
                      </CardActionArea>
                      </AccordionSummary>
                      <AccordionDetails>
                        <table  style={{width:'1160px'}} class="listado">
                          <thead>
                            <tr>
                              <th><h1>Contraseña</h1></th>
                              <th><h1>rol</h1></th>
                              <th><h1>Sexo</h1></th>
                              <th><h1>Edad</h1></th>
                              <th><h1>Telefono</h1></th>
                            </tr>
                          </thead>
                          <tbody>         
                            <tr>   
                              <td ><input  type="text" class="form-control"  onKeyUp={this.onChangepassword}  placeholder={usuario.password}></input></td>
                              <td><input type="text"   onChange={this.onChangeRole} class="form-control"  list="role" placeholder={usuario.role}/>
                                <datalist id="role">
                                  <option value="Admin">Admin</option>
                                  <option value="Usuario">Usuario</option>
                                </datalist>
                              </td>
                              <td><input type="text"   onChange={this.onChangeSexo} class="form-control"  list="sexo" placeholder={usuario.Sexo}/>
                                <datalist id="sexo">
                                  <option value="Hombre">Hombre</option>
                                  <option value="Mujer">Mujer</option>
                                </datalist>
                              </td>
                              <td><input  type="text" class="form-control"  onKeyUp={this.onChangeEdad}  defaultValue={usuario.Edad}></input></td>
                              <td><input  type="text" class="form-control"  onKeyUp={this.onChangeTelefono}  defaultValue={usuario.Telefono}></input></td>
                            </tr>
                          </tbody>
                        </table>
                      </AccordionDetails>
                    </Accordion>
                  </td>
                <td> <button  type="file" onChange={(e)=>this._handleImageChange(e)}><img style={{maxWidth:'90px',maxHeight:'90px'}} src={usuario.imagen} ></img></button> </td>
                <td><input type="text" class="form-control"  onKeyUp={this.onChangePrimerNombre}  placeholder={usuario.PrimerNombre}></input></td>
                <td style={{maxWidth:'180px'}}><input style={{maxWidth:'100%'}} type="text" class="form-control"  onKeyUp={this.onChangePrimerApellido}  placeholder={usuario.PrimerApellido}></input></td>
                <td style={{maxWidth:'180px'}}><input style={{maxWidth:'100%'}} type="text" class="form-control"  onKeyUp={this.onChangeSegundoApellido}  placeholder={usuario.SegundoApellido}></input></td>
                <td style={{maxWidth:'280px'}}><input style={{maxWidth:'100%'}} type="text" class="form-control"  onKeyUp={this.onChangeemail}  placeholder={usuario.email}></input></td>
                <td>
                  <td class="icono"  onClick={() =>this.onSubmitEditarProducto(usuario._id)}>
                    <a>
                      <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456l-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                        <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                      </svg>
                    </a>
                  </td>  
                  <td class="icono" onClick={() =>this.onSubmitEliminarUsurio(usuario._id)}>
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