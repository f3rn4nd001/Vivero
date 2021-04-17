import React, {  useState ,useEffect} from 'react'
import axios from 'axios';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import swal from 'sweetalert';


const NotasT4 = () =>{
    
const [todos,setTodos] = useState([]);
const [ Titulo, setTitulo ] = useState('');
const [ Nota, setNota ] = useState('');
const [ FechaLim, setFechaLim ] = useState('');

const onChangeTitulo = e =>{setTitulo(e.target.value );}
const onChangeNota= e =>{setNota(e.target.value );}
const onChangefechaLimite = e =>{setFechaLim(e.target.value );}
  useEffect(async () =>{
  
      
    const todos = await axios.get('http://localhost:3001/api/Notas',{headers:{'token':localStorage.getItem('token')}});   
    setTodos(todos.data)
  }, [])
  const onsubNotastodos= async () =>{
  const todos = await axios.get('http://localhost:3001/api/Notastodos',{headers:{'token':localStorage.getItem('token')}});   
    setTodos(todos.data)
  }
  const onSubmitCrearNotas = async e => {
      e.preventDefault();
      const res = await fetch('http://localhost:3001/api/Notas/Crear',{
        method:'POST', headers:{
          'token':localStorage.getItem('token'),
          'Accept':'application/json',
          'Content-Type':'application/json',
        
        }, 
        body: JSON.stringify({
          titulo:Titulo,
          nota:Nota,
          fecha:FechaLim,
        })
      }).then((response)=>response.json()).then((res,req,next)=>{   
        if(res.success===true){
          swal({icon: "success", closeOnClickOutside: false,text:res.message}).then(willDelete => {
            if (willDelete) {
              window.location.href="/T4notas";
            }
          });
        }
        else{
          swal({ closeOnClickOutside: false,text:res.message,icon: "info" });
        }
      })
    }
   const onSubmitEliminar =async _id =>{
           
      const res = await fetch('http://localhost:3001/api/Notas/eliminar/',{
        method:'DELETE', headers:{
          'token':localStorage.getItem('token'),
          'Accept':'application/json',
          'Content-Type':'application/json',
         
        },
        body: JSON.stringify({
          eliminar:_id,
        })
      }).then((response)=>response.json()).then((res,req,next)=>{   
        if(res.success===true){
          alert(res.message);
          window.location.href="/T4notas";
        }
        else{
          alert(res.message);
         }
      })
  }
  const onSubmitCompreto =async _id =>{
           
    const res = await fetch('http://localhost:3001/api/Notas/Compreto/',{
      method:'PUT', headers:{
        'token':localStorage.getItem('token'),
        'Accept':'application/json',
        'Content-Type':'application/json',
       
      },
      body: JSON.stringify({
        comp:_id,
      })
    }).then((response)=>response.json()).then((res,req,next)=>{   
      if(res.success===true){
        alert(res.message);
        window.location.href="/T4notas";
      }
      else{
        alert(res.message);
       }
    })
}
  return(
    
    <div style={{minHeight:"670px"}} >
<head>
    <meta charset="UTF-8"/>
    <meta http-equiv="X-UA-Compatible" content="IE=edge"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>Document</title>
    <link rel="stylesheet" type="text/css" href="Index.css"/>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-BmbxuPwQa2lc/FVzBcNJ7UAyJxM6wuqIj61tLrc4wSX0szH/Ev+nYRRuWlolflfl" crossorigin="anonymous"/>
   
</head>
<body>
<nav  class="navbar main-menu dropdown navTitulo navbar-expand-lg navbar-lightt">
    <div class="">
    <span><svg xmlns="http://www.w3.org/2000/svg"  width="30" height="30" fill="currentColor" class="bi bi-list-ul" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M5 11.5a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h9a.5.5 0 0 1 0 1h-9a.5.5 0 0 1-.5-.5zm-3 1a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm0 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2zm0 4a1 1 0 1 0 0-2 1 1 0 0 0 0 2z"/>
</svg></span>
    <div class="dropdown-content">
        <ul class="list-group navLis">
            <li class=" has-subnav navLis">                              
                <a  href="/PIndexReact">
                                    <i class="fa ">
                                        <svg  xmlns="http://www.w3.org/2000/svg" width="22" height="30" fill="currentColor" class="bi bi-house-fill" viewBox="0 0 16 16">
                                            <path fill-rule="evenodd" d="M8 3.293l6 6V13.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5V9.293l6-6zm5-.793V6l-2-2V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5z"/>
                                            <path fill-rule="evenodd" d="M7.293 1.5a1 1 0 0 1 1.414 0l6.647 6.646a.5.5 0 0 1-.708.708L8 2.207 1.354 8.854a.5.5 0 1 1-.708-.708L7.293 1.5z"/>
                                        </svg>
                                    </i>
                                    <span class='nav-text' >Inicio</span>
                                </a></li>
                                
                                <li class=" has-subnav navLis">                              
                                <a  href="/PIndexReact">
                                    <i class="fa ">
                                    <svg mlns="http://www.w3.org/2000/svg" width="30" height="20" fill="currentColor" class="bi bi-book" viewBox="0 0 16 16">
                                    <path d="M1 2.828c.885-.37 2.154-.769 3.388-.893 1.33-.134 2.458.063 3.112.752v9.746c-.935-.53-2.12-.603-3.213-.493-1.18.12-2.37.461-3.287.811V2.828zm7.5-.141c.654-.689 1.782-.886 3.112-.752 1.234.124 2.503.523 3.388.893v9.923c-.918-.35-2.107-.692-3.287-.81-1.094-.111-2.278-.039-3.213.492V2.687zM8 1.783C7.015.936 5.587.81 4.287.94c-1.514.153-3.042.672-3.994 1.105A.5.5 0 0 0 0 2.5v11a.5.5 0 0 0 .707.455c.882-.4 2.303-.881 3.68-1.02 1.409-.142 2.59.087 3.223.877a.5.5 0 0 0 .78 0c.633-.79 1.814-1.019 3.222-.877 1.378.139 2.8.62 3.681 1.02A.5.5 0 0 0 16 13.5v-11a.5.5 0 0 0-.293-.455c-.952-.433-2.48-.952-3.994-1.105C10.413.809 8.985.936 8 1.783z"/>
                                    </svg>
                                    </i>
                                    <span class='nav-text' >Biblioteca</span>
                                </a></li>
                                <li class=" has-subnav navLis">                              
                                <a  href="/PIndexReact">
                                    <i class="fa ">
                                    <svg  xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" class="bi bi-folder-fill" viewBox="0 0 16 16">
                                    <path d="M9.828 3h3.982a2 2 0 0 1 1.992 2.181l-.637 7A2 2 0 0 1 13.174 14H2.826a2 2 0 0 1-1.991-1.819l-.637-7a1.99 1.99 0 0 1 .342-1.31L.5 3a2 2 0 0 1 2-2h3.672a2 2 0 0 1 1.414.586l.828.828A2 2 0 0 0 9.828 3zm-8.322.12C1.72 3.042 1.95 3 2.19 3h5.396l-.707-.707A1 1 0 0 0 6.172 2H2.5a1 1 0 0 0-1 .981l.006.139z"/>
                                    </svg>
                                    </i>
                                    <span class='nav-text' >Sala de archivos</span>
                                </a></li>
                                <li class=" has-subnav navLis">                              
                                <a  href="/PIndexReact">
                                    <i class="fa ">
                                    <svg   xmlns="http://www.w3.org/2000/svg" width="20" height="22" fill="currentColor" class="bi bi-people-fill" viewBox="0 0 16 16">
                                        <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1H7zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
                                        <path fill-rule="evenodd" d="M5.216 14A2.238 2.238 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.325 6.325 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1h4.216z"/>
                                        <path d="M4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z"/>
                                        </svg>
                                                                            </i>
                                    <span class='nav-text' >sala de expocisiones</span>
                                </a></li>
                                <li class=" has-subnav navLis">                              
                                <a  href="/PIndexReact">
                                    <i class="fa ">
                                    <svg   xmlns="http://www.w3.org/2000/svg" width="22" height="20" fill="currentColor" class="bi bi-gift-fill" viewBox="0 0 16 16">
                                    <path d="M3 2.5a2.5 2.5 0 0 1 5 0 2.5 2.5 0 0 1 5 0v.006c0 .07 0 .27-.038.494H15a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H1a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1h2.038A2.968 2.968 0 0 1 3 2.506V2.5zm1.068.5H7v-.5a1.5 1.5 0 1 0-3 0c0 .085.002.274.045.43a.522.522 0 0 0 .023.07zM9 3h2.932a.56.56 0 0 0 .023-.07c.043-.156.045-.345.045-.43a1.5 1.5 0 0 0-3 0V3zm6 4v7.5a1.5 1.5 0 0 1-1.5 1.5H9V7h6zM2.5 16A1.5 1.5 0 0 1 1 14.5V7h6v9H2.5z"/>
                                    </svg>   
                                    </i>
                                    <span class='nav-text' >Regalos y cafe </span>
                                </a></li>
                                <li class=" has-subnav navLis">                              
                                <a  href="/PIndexReact">
                                    <i class="fa ">
                                    <svg  xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-gear-fill" viewBox="0 0 16 16">
                                        <path d="M9.405 1.05c-.413-1.4-2.397-1.4-2.81 0l-.1.34a1.464 1.464 0 0 1-2.105.872l-.31-.17c-1.283-.698-2.686.705-1.987 1.987l.169.311c.446.82.023 1.841-.872 2.105l-.34.1c-1.4.413-1.4 2.397 0 2.81l.34.1a1.464 1.464 0 0 1 .872 2.105l-.17.31c-.698 1.283.705 2.686 1.987 1.987l.311-.169a1.464 1.464 0 0 1 2.105.872l.1.34c.413 1.4 2.397 1.4 2.81 0l.1-.34a1.464 1.464 0 0 1 2.105-.872l.31.17c1.283.698 2.686-.705 1.987-1.987l-.169-.311a1.464 1.464 0 0 1 .872-2.105l.34-.1c1.4-.413 1.4-2.397 0-2.81l-.34-.1a1.464 1.464 0 0 1-.872-2.105l.17-.31c.698-1.283-.705-2.686-1.987-1.987l-.311.169a1.464 1.464 0 0 1-2.105-.872l-.1-.34zM8 10.93a2.929 2.929 0 1 1 0-5.86 2.929 2.929 0 0 1 0 5.858z"/>
                                        </svg>
                                                                            </i>
                                    <span class='nav-text' >Control de actividdes</span>
                                </a></li>
                                <li class=" has-subnav navLis">                              
                                <a  href="/PIndexReact">
                                    <i class="fa ">
                                    <svg   xmlns="http://www.w3.org/2000/svg" width="22" height="30" fill="currentColor" class="bi bi-door-open-fill" viewBox="0 0 16 16">
                                    <path d="M1.5 15a.5.5 0 0 0 0 1h13a.5.5 0 0 0 0-1H13V2.5A1.5 1.5 0 0 0 11.5 1H11V.5a.5.5 0 0 0-.57-.495l-7 1A.5.5 0 0 0 3 1.5V15H1.5zM11 2h.5a.5.5 0 0 1 .5.5V15h-1V2zm-2.5 8c-.276 0-.5-.448-.5-1s.224-1 .5-1 .5.448.5 1-.224 1-.5 1z"/>
                                    </svg>                            
                                    </i>
                                    <span class='nav-text' >Cerrar sesion</span>
                                </a></li>
        </ul>    
                
        </div>
        </div>
    </nav>

        <header style={{background:'#bdbdbd'}} class='row'><h1 class='col-sm-4'>Biblioteca</h1><div class='col-sm-4'></div><h1 class='col-sm-4 h5'>Administrador</h1></header>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0-beta2/dist/js/bootstrap.bundle.min.js" integrity="sha384-b5kHyXgcpbZJO/tY9Ul7kGkf1S0CWuKcCD38l8YkeH8z8QjE0GmW1gYU5S9FOnJ0" crossorigin="anonymous"></script>
    <br/>
    <div class="">
                <img src="https://as.com/tikitakas/imagenes/2019/07/31/album/1564601448_476484_1564603487_album_grande.jpg" style={{minWidth:'300px', minWidth:'100%', maxHeight:'400px'}}/>
                </div>
</body>
  </div>
  )
}

export default NotasT4;