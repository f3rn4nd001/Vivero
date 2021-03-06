import React, { Component } from 'react'
import axios from 'axios';
import './css/Login.css';
export default class Producto extends Component {
    state={
        productos:[]
    }
    
        async componentDidMount(){
            const res = await axios.get('http://localhost:3001/api/Productos/');
            this.setState({productos: res.data});
           
        }
    render() {
        return (
            <div class="small-container">
            <div class="row">
            {this.state.productos.map(producto => (
                <div key={producto._id} class="col-4">
                    <a href="#products" >
    
                        <img src={producto.imagen} alt="" />
                    </a>
                    <a href="#products">
    
                        <h4>Casuadsadasdsl Shirt</h4>
                    </a>
                    <div class="rating">
                        <i class="fa fa-star"></i>
                        <i class="fa fa-star"></i>
                        <i class="fa fa-star"></i>
                        <i class="fa fa-star"></i>
                        <i class="fa fa-star-o"></i>
                    </div>
                    <p>Rs.3695</p>
                </div>
                ))}
                <div class="col-4">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYUX5y6xLq-iZV6w1XbcY1SJRUc_J_9PlHpDuBrE52GQatbPnQa5AiWK4GUYT3X63cnxSd978XUg&usqp=CAc" alt="" />
                    <h4>Black and gray Casual shirt</h4>
                    <div class="rating">
                        <i class="fa fa-star"></i>
                        <i class="fa fa-star"></i>
                        <i class="fa fa-star"></i>
                        <i class="fa fa-star"></i>
                        <i class="fa fa-star-half-o"></i>
                    </div>
                    <p>Rs.12990</p>
                </div>
                <div class="col-4">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTiBr0s2ftVUpQpT8zwEVbDGZWaknRXH7uSvRpmQFmlTFLesKpuJV6erK4hCAgXdx7f6XuMnj_0hA&usqp=CAc" alt="" />
                    <h4>Lingo men Casual Shrit</h4>
                    <div class="rating">
                        <i class="fa fa-star"></i>
                        <i class="fa fa-star"></i>
                        <i class="fa fa-star"></i>
                        <i class="fa fa-star"></i>
                        <i class="fa fa-star-o"></i>
                    </div>
                    <p>Rs.2369</p>
                </div>
                <div class="col-4">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzq7nxrsynKQJXW7XaXyR1Ct42owk8MipUlVpipHs2sqGzOztuuKAEdyyJxp9VErkVS0W-mvWk&usqp=CAc" alt="" />
                    <h4>Formal Shirt</h4>
                    <div class="rating">
                        <i class="fa fa-star"></i>
                        <i class="fa fa-star"></i>
                        <i class="fa fa-star"></i>
                        <i class="fa fa-star-half-o"></i>
                        <i class="fa fa-star-o"></i>
                    </div>
                    <p>Rs.1499</p>
                </div>
            </div>
    
            
            <div class="row">
                <div class="col-4">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqivPBJIBn89mB1p4qbSchcQSZZDBbgmvm9jiy9lh0Pc1Jq1pNwtDHm2E1W-6a4mmGYpI3oOop&usqp=CAc" alt="" />
                    <h4>Lorem</h4>
                    <div class="rating">
                        <i class="fa fa-star"></i>
                        <i class="fa fa-star"></i>
                        <i class="fa fa-star"></i>
                        <i class="fa fa-star"></i>
                        <i class="fa fa-star-o"></i>
                    </div>
                    <p>Rs.1245</p>
                </div>
                <div class="col-4">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXjRsj46wgKrYVCWXoLGZIrwLCQlTK6SsqCxAoxGFPyKpC29xfPi7wjNbjmMd_tWDiZTPsXrqW&usqp=CAc" alt="" />
                    <h4>Lorem</h4>
                    <div class="rating">
                        <i class="fa fa-star"></i>
                        <i class="fa fa-star"></i>
                        <i class="fa fa-star"></i>
                        <i class="fa fa-star"></i>
                        <i class="fa fa-star-half-o"></i>
                    </div>
                    <p>Rs.5600</p>
                </div>
                <div class="col-4">
                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSl_vshNz1k1Wgyan5Zj7dlHpgrqHqAEvN9ICK_GxLgpr58QGNOZ9pM0aQsWXV7OUJVH_XFlJKU&usqp=CAc" alt="" />
                    <h4>Lorem</h4>
                    <div class="rating">
                        <i class="fa fa-star"></i>
                        <i class="fa fa-star"></i>
                        <i class="fa fa-star"></i>
                        <i class="fa fa-star"></i>
                        <i class="fa fa-star-o"></i>
                    </div>
                    <p>Rs.39500</p>
                </div>
                <div class="col-4">
                    <img src="data:image/jpeg;base64,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" alt="" />
                    <h4>Lorem</h4>
                    <div class="rating">
                        <i class="fa fa-star"></i>
                        <i class="fa fa-star"></i>
                        <i class="fa fa-star"></i>
                        <i class="fa fa-star-half-o"></i>
                        <i class="fa fa-star-o"></i>
                    </div>
                    <p>Rs.14296</p>
                </div>
            </div>
        </div>
       
   
        )
    }
}