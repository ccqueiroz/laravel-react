import React, { Component } from 'react';
import './style.css';


export default class Button extends Component{
    constructor(props){
        super(props)
    }

    render(){

        return(
            <div className="button">
                <button type={this.props.type} onClick={() => this.props.funButton()} className={this.props.classBtn}>{this.props.value}</button>
            </div>
        );
    }
}