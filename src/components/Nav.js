import './Nav.css'
import React, { Component } from 'react';



class NavComp extends React.Component {
    constructor(props){
      super(props);

      this.state = {
       
      }
    }
    pasasrNumber(numero){
        this.props.callback(numero);
        
    }

    render(){
         const numeros = this.props.numbers.map(numero =>{
             return(<li className="page-item"><a className="page-link"  onClick = {() => this.pasasrNumber(numero)}>{numero}</a></li>) 
         })
        return(
            
            <nav aria-label="Page navigation example">
                <ul className="pagination">
                     <li className="page-item"><a className="page-link" href="#">Prev</a></li>
                      {numeros}
                     <li className="page-item"><a className="page-link" href="#">Next</a></li>
                </ul>
            </nav>

        )
    }


}

export default NavComp