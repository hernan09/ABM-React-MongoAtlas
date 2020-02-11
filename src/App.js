import React, { Component } from 'react';
import { List, Avatar, Button, Skeleton } from 'antd';
import imgn from './fondo.jpg'

import './App.css';
import  NavComp  from './components/Nav';







class App extends React.Component {
  constructor(){
    super();
    this.state = {
      objs : [],
      numeros:[1,2,3,4,5,6,7],
      numero:String,
      id:String,
      load : true,
      item: String,
      price:String,
    
    }
  }

    
 //TRAE TODOS LOS ELEMENTOS
  componentDidMount(){
   this.chargeSkeleton()
    
    fetch(`https://backendmongoatlas.herokuapp.com/cuentas`).then(resp =>resp.json()).then(data =>{
      this.setState({
        objs:data,
      })
    
    })
   
  }

  chargeSkeleton(){
    setTimeout(()=> {this.setState({load:false})},2000)
  }

  pasarNumber(page){
    console.log(page)
    this.setState({
      numero:page 
    })
    console.log(this.state.numero)
    localStorage.setItem('pagina',JSON.parse(this.state.numero))

    window.location.reload();
    
  }
  
   //BORRAR EL ELEMENTO
   borrarElemento = (Item) =>{
    const requestOptions = {
      method: 'DELETE'
    };
   fetch(`https://backendmongoatlas.herokuapp.com/cuentas/${Item}`, requestOptions).then(resp => resp.json()).then(data =>{
    console.log(data)
    
   })
   window.location.reload();
   
  
  }

  //MOSTRAR EL ELEMENTO
  verElement = (Item) => {
    console.log(Item)
    const requestOptions = {
      method: 'GET'
    };
   fetch(`https://backendmongoatlas.herokuapp.com/cuentas/${Item}`, requestOptions).then(resp => resp.json()).then(data =>{
    console.log(data)
     
    this.setState({
      item:data.name,
      price:data.Price,
      id:data._id,
      
    })
   })

  }
  //AGREGAR UN ELEMENTO
  handleSubmit = (e) => {
    e.preventDefault();

    let obj = {
      name:e.target[0].value,
      Price:e.target[1].value
    }
    console.log(obj)
    fetch("https://backendmongoatlas.herokuapp.com/add", {
      method: 'POST',
      body: JSON.stringify(obj), // data can be `string` or {object}!
      headers:{
        'Content-Type': 'application/json'
      }
    }).then(res => res.json())
    .catch(error => console.error('Error:', error))
    .then(response => {
      window.location.reload()
    });
    

}

handleSubmit2 = (e) => {
  e.preventDefault();

  let obj = {
    name:e.target[0].value,
    Price:e.target[1].value
  }
  console.log(obj)
  
  fetch(`https://backendmongoatlas.herokuapp.com/cuentas/${this.state.id}`, {
    method: 'PUT',
    body: JSON.stringify(obj), // data can be `string` or {object}!
    headers:{
      'Content-Type': 'application/json'
    }
  }).then(res => res.json())
  .catch(error => console.error('Error:', error))
  .then(response => {
    window.location.reload()
  });
  
  
  

}

  render(){
     const styles = this.state.load ? {display:'none'}:{}

    return (
    <div className="containerr">
       {/* <NavComp numbers = {this.state.numeros} callback={this.pasarNumber.bind(this)}></NavComp> */}
       <form className="asdasdform" onSubmit={this.handleSubmit}>
      <div className="form-group">
        <input type="text" className="form-control" placeholder="Product" id="exampleInputEmail1" aria-describedby="emailHelp" required></input>
      </div>
      <div className="form-group">
        <input type="text" className="form-control" placeholder="price" id="exampleInputPassword1" required></input>
      </div>
      <div className="form-group form-check">
      </div>
      <button htmltype="button"  className="btn btn-outline-primary btn-block">Add user</button>
    </form>
    <div id='cont'> 
    <Skeleton id="skeleton" title={false} active  paragraph={{ rows: 13 }} loading={this.state.load}>
    <List id="lista"
      loading={this.load}
      size="small"
      dataSource={this.state.objs}
      renderItem={obj => <List.Item>{obj.name}<Button id="btnb2" size="small"data-toggle="modal" data-target="#exampleModal"  onClick={() => this.verElement(obj._id)} type="primary">Show</Button><Button id="btnb" size="small"  onClick={() => this.borrarElemento(obj._id)} type="danger">Delete</Button></List.Item>}
    />

    </Skeleton>
    </div>
    

    

    
<div className="modal fade" id="exampleModal" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog" role="document">
    <div className="modal-content">
      {/* <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">{this.state.item}</h5>
        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div> */}
      
      <div className="modal-body">
     {/* <div className="wrapper">
        <div className="card">
          <h1>
             <span className="enclosed">{this.state.item}</span>{this.state.price}
          </h1>
        </div>
     </div> */}
     <article class="card card--2">
  <div class="card__info-hover">
    <svg class="card__like"  viewBox="0 0 24 24">
    <path fill="#000000" d="M12.1,18.55L12,18.65L11.89,18.55C7.14,14.24 4,11.39 4,8.5C4,6.5 5.5,5 7.5,5C9.04,5 10.54,6 11.07,7.36H12.93C13.46,6 14.96,5 16.5,5C18.5,5 20,6.5 20,8.5C20,11.39 16.86,14.24 12.1,18.55M16.5,3C14.76,3 13.09,3.81 12,5.08C10.91,3.81 9.24,3 7.5,3C4.42,3 2,5.41 2,8.5C2,12.27 5.4,15.36 10.55,20.03L12,21.35L13.45,20.03C18.6,15.36 22,12.27 22,8.5C22,5.41 19.58,3 16.5,3Z" />
</svg>
      <div class="card__clock-info">
        <svg class="card__clock"  viewBox="0 0 24 24"><path d="M12,20A7,7 0 0,1 5,13A7,7 0 0,1 12,6A7,7 0 0,1 19,13A7,7 0 0,1 12,20M19.03,7.39L20.45,5.97C20,5.46 19.55,5 19.04,4.56L17.62,6C16.07,4.74 14.12,4 12,4A9,9 0 0,0 3,13A9,9 0 0,0 12,22C17,22 21,17.97 21,13C21,10.88 20.26,8.93 19.03,7.39M11,14H13V8H11M15,1H9V3H15V1Z" />
        </svg><span class="card__time">5 min</span>
      </div>
    
  </div>
  <div class="card__img"></div>
  <a href="#" class="card_link">
     <div class="card__img--hover"></div>
   </a>
  <div class="card__info">
    <h3 class="card__title">{this.state.item}</h3>
    <span class="card__category">{this.state.price}</span>
  <form className="formUpdate" onSubmit={this.handleSubmit2}>
      <div className="form-group">
        <input type="text" className="form-control" placeholder="Product" id="exampleInputEmail2" aria-describedby="emailHelp" required></input>
      </div>
      <div className="form-group">
        <input type="text" className="form-control" placeholder="Price" id="exampleInputPassword2" required></input>
      </div>
      <div className="form-group form-check">
      </div>
      <button htmltype="button"  className="btn btn-primary btn-block">Edit Product</button>
    </form>
    
  </div>
</article>  
  
    
      </div>
    </div>
  </div>
</div>
    </div>
     
    );
  }
 
}

export default App;
