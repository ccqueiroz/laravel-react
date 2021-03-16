import React, { Component } from 'react';
import './style.css';

export default class Header extends Component{

    constructor(props){
        super(props);
        
    }

    render(){
        return(
            <header className="contentHeader">
                <h2 className="tituloHeader">{this.props.title}</h2>
                <div className="botoesHeader">
                    <button type="button" className="btnCadastro" onClick={this.props.funcBtn}>{this.props.btnName}</button>
                </div>
            </header>
        );
    }
}