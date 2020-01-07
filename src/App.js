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
    fetch("https://backendmongoatlas.herokuapp.com/cuentas").then(resp =>resp.json()).then(data =>{
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
     <div className="wrapper">
        <div className="card">
          <h1>
    <span className="enclosed">{this.state.item}</span>{this.state.price}
          </h1>
        </div>
     </div>
      </div>
    </div>
  </div>
</div>
    </div>
     
    );
  }
 
}

export default App;
