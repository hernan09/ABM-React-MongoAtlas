import React, { Component } from 'react';
import { List, Button } from 'antd';
import ReactLoading from 'react-loading';
import imgn from './fondo.jpg';

import './App.css';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      objs: [],
      numeros: [1, 2, 3, 4, 5, 6, 7],
      numero: String,
      id: String,
      load: true,
      item: String,
      price: String,
    };
  }

  //TRAE TODOS LOS ELEMENTOS
  componentDidMount() {
    this.chargeSkeleton();

    fetch(`https://backendmongoatlas.herokuapp.com/cuentas`)
      .then((resp) => resp.json())
      .then((data) => {
        this.setState({
          objs: data,
        });
      });
  }

  chargeSkeleton() {
    setTimeout(() => {
      this.setState({ load: false });
    }, 2000);
  }

  pasarNumber(page) {
    console.log(page);
    this.setState({
      numero: page,
    });
    console.log(this.state.numero);
    localStorage.setItem('pagina', JSON.parse(this.state.numero));

    window.location.reload();
  }

  //BORRAR EL ELEMENTO
  borrarElemento = (Item) => {
    const requestOptions = {
      method: 'DELETE',
    };
    fetch(
      `https://backendmongoatlas.herokuapp.com/cuentas/${Item}`,
      requestOptions
    )
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data);
      });
    window.location.reload();
  };

  //MOSTRAR EL ELEMENTO
  verElement = (Item) => {
    console.log(Item);
    const requestOptions = {
      method: 'GET',
    };
    fetch(
      `https://backendmongoatlas.herokuapp.com/cuentas/${Item}`,
      requestOptions
    )
      .then((resp) => resp.json())
      .then((data) => {
        console.log(data);

        this.setState({
          item: data.name,
          price: data.Price,
          id: data._id,
        });
      });
  };
  //AGREGAR UN ELEMENTO
  handleSubmit = (e) => {
    e.preventDefault();

    let obj = {
      name: e.target[0].value,
      Price: e.target[1].value,
    };
    console.log(obj);
    fetch('https://backendmongoatlas.herokuapp.com/add', {
      method: 'POST',
      body: JSON.stringify(obj), // data can be `string` or {object}!
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .catch((error) => console.error('Error:', error))
      .then((response) => {
        window.location.reload();
      });
  };

  handleSubmit2 = (e) => {
    e.preventDefault();

    let obj = {
      name: e.target[0].value,
      Price: e.target[1].value,
    };
    console.log(obj);

    fetch(`https://backendmongoatlas.herokuapp.com/cuentas/${this.state.id}`, {
      method: 'PUT',
      body: JSON.stringify(obj), // data can be `string` or {object}!
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => res.json())
      .catch((error) => console.error('Error:', error))
      .then((response) => {
        window.location.reload();
      });
  };

  render() {
    const styles = this.state.load ? { display: 'none' } : {};

    return (
      <div className="containerr">
        <form className="asdasdform" onSubmit={this.handleSubmit}>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="Product"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              required
            ></input>
          </div>
          <div className="form-group">
            <input
              type="text"
              className="form-control"
              placeholder="price"
              id="exampleInputPassword1"
              required
            ></input>
          </div>
          <div className="form-group form-check"></div>
          <button
            htmltype="button"
            className="btn btn-outline-primary btn-block"
          >
            Add user
          </button>
        </form>
        <div className="container__subform">
          {this.state.load ? (
            <ReactLoading
              type={'spinningBubbles'}
              color={'rgb(0 123 255)'}
              height={'50px'}
              width={'50px'}
            />
          ) : (
            <div id="cont">
              <List
                id="lista"
                loading={this.load}
                size="small"
                dataSource={this.state.objs}
                renderItem={(obj) => (
                  <List.Item>
                    {obj.name}
                    <Button
                      id="btnb2"
                      size="small"
                      data-toggle="modal"
                      data-target="#exampleModal"
                      onClick={() => this.verElement(obj._id)}
                      type="primary"
                    >
                      Show
                    </Button>
                    <Button
                      id="btnb"
                      size="small"
                      onClick={() => this.borrarElemento(obj._id)}
                      type="danger"
                    >
                      Delete
                    </Button>
                  </List.Item>
                )}
              />
            </div>
          )}
        </div>

        <div
          className="modal fade"
          id="exampleModal"
          role="dialog"
          aria-labelledby="exampleModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-body">
                <article class="card card--2">
                  <div class="card__info-hover"></div>
                  <div class="card__img"></div>
                  <a href="#" class="card_link">
                    <div class="card__img--hover"></div>
                  </a>
                  <div class="card__info">
                    <h3 class="card__title">{this.state.item}</h3>
                    <span class="card__category">{this.state.price}</span>
                    <form className="formUpdate" onSubmit={this.handleSubmit2}>
                      <div className="form-group">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Product"
                          id="exampleInputEmail2"
                          aria-describedby="emailHelp"
                          required
                        ></input>
                      </div>
                      <div className="form-group">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Price"
                          id="exampleInputPassword2"
                          required
                        ></input>
                      </div>
                      <div className="form-group form-check"></div>
                      <button
                        htmltype="button"
                        className="btn btn-primary btn-block"
                      >
                        Edit Product
                      </button>
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
