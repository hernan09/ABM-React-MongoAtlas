import React, { Component } from 'react';
import { Menu, Icon } from 'antd';
import { Layout } from 'antd';
import { List, Typography } from 'antd';
import { Button } from 'antd';
import { Alert } from 'antd';
import { Popover } from 'antd';
import './App.css';


const { SubMenu } = Menu;
const { Header, Footer, Sider, Content } = Layout;
class App extends Component {
  constructor(){
    super();
    this.state = {
      objs : [],
      load : false,
      item: String,
      price:String,
    }
  }

    
 //TRAE TODOS LOS ELEMENTOS
  componentDidMount(){
    this.setState({
      load:true
    })
    fetch("http://localhost:4000/cuentas").then(resp =>resp.json()).then(data =>{
      this.setState({
        objs:data,
        load:true
      })
    
    })
   
    /*
    fetch(" http://www.omdbapi.com/?i=tt3896198&apikey=1f6f4390").then(resp=>resp.json()).then(pelis=>{
       
        this.setState({
          pelis:pelis
        })
        console.log(this.state.pelis)
    })
    */
  }
  
   //BORRAR EL ELEMENTO
   borrarElemento = (Item) =>{
    const requestOptions = {
      method: 'DELETE'
    };
   fetch(`http://localhost:4000/cuentas/${Item}`, requestOptions).then(resp => resp.json()).then(data =>{
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
   fetch(`http://localhost:4000/cuentas/${Item}`, requestOptions).then(resp => resp.json()).then(data =>{
    console.log(data)
     
    this.setState({
      item:data.name,
      price:data.Price,
      load: true
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
    fetch("http://localhost:4000/add", {
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

  render(){
     const styles = this.state.load ? {display:'none'}:{}
    return (
    <div className="containerr">
       <form className="asdasdform" onSubmit={this.handleSubmit}>
      <div className="form-group">
        <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" required></input>
      </div>
      <div className="form-group">
        <input type="text" className="form-control" id="exampleInputPassword1" required></input>
      </div>
      <div className="form-group form-check">
      </div>
      <button htmltype="button"  className="btn btn-outline-primary btn-block">Add user</button>
    </form>

    
    <List id="lista"
      loading={this.load}
      size="small"
      dataSource={this.state.objs}
      renderItem={obj => <List.Item>{obj.name}<Button id="btnb2" size="small"data-toggle="modal" data-target="#exampleModal"  onClick={() => this.verElement(obj._id)} type="primary">Show</Button><Button id="btnb" size="small"  onClick={() => this.borrarElemento(obj._id)} type="danger">Delete</Button></List.Item>}
    />

    
<div class="modal fade" id="exampleModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">{this.state.item}</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
      {this.state.price}
      </div>
    </div>
  </div>
</div>
    </div>
     
    );
  }
 
}

export default App;
