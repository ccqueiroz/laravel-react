import React, { Component } from 'react';

import './style.css';

import Button from '../Button';

export default class ModalUser extends Component{
    constructor(props){
        super(props);
        this.state = {
            data: {
                name: "",
                cpf:"",
                telefone: "",
                password: "",
                nascimento: "",
                accessLevel: "",
                email:""
            },
            TOKEN: document
            .querySelector('meta[name="csrf-token"]')
            .getAttribute("content")
        }

        this.sendUser = this.sendUser.bind(this);
        this.handleInput = this.handleInput.bind(this);
    }
    
    sendUser(element){
        element.preventDefault();
        const data = new FormData();

        data.append('name', this.state.data.name);
        data.append('cpf', this.state.data.cpf);
        data.append('telefone', this.state.data.telefone);
        data.append('password', this.state.data.password);
        data.append('nascimento', this.state.data.nascimento);
        data.append('acesslevel', this.state.data.accessLevel);
        data.append('email', this.state.data.email);


        fetch("http://localhost:8000/api/create", {
            method:"POST",
            headers:{
                'Cache-Control': 'no-cache'
            },
            body: data
        }).then(res => {
            if(res.status == 200){
                this.props.atualizarPag();
                this.props.closeModal();
            }
        });

        element.target.name.value ="";
        element.target.cpf.value ="";
        element.target.telefone.value ="";
        element.target.password.value ="";
        element.target.nascimento.value ="";
        element.target.email.value ="";
        element.target.accessLevel.value ="";



    }

    handleInput(e){
        const data = this.state.data;
        data[e.target.name] = e.target.value;
        this.setState({
            data
        });

    }


    render(){
        return(
            <div className="modal">
                        <div className="contentModal">
                            <h3>{this.props.titulo}</h3>
                            <form className="formModal" method="POST" role="form" onSubmit={this.sendUser}>
                                <div className="contentLabels">
                                    <label htmlFor="">
                                        <span>Nome</span>
                                        <input type="text" name="name" onChange={this.handleInput}/>
                                    </label>
                                    <label htmlFor="">
                                        <span>CPF/CNPJ</span>
                                        <input type="text" name="cpf"  onChange={this.handleInput}/>
                                    </label>
                                    <label htmlFor="">
                                        <span>Telefone</span>
                                        <input type="tel" name="telefone"  onChange={this.handleInput}/>
                                    </label>
                                    <label htmlFor="">
                                        <span>Email</span>
                                        <input type="email" name="email"  onChange={this.handleInput}/>
                                    </label>
                                    <label htmlFor="">
                                        <span>Senha</span>
                                        <input type="password" name="password"  onChange={this.handleInput}/>
                                    </label>
                                    <label htmlFor="">
                                        <span>Nível de Acesso</span>
                                        <input type="text" name="accessLevel"  onChange={this.handleInput}/>
                                    </label>
                                    <label htmlFor="">
                                        <span>Data de Nascimento</span>
                                        <input type="date" name="nascimento"  onChange={this.handleInput}/>
                                    </label>


                                </div>
                                <div className="contentButtons">
                                    <Button value={this.props.valueBtn} classBtn={this.props.classBtn} />
                                    <Button value={this.props.valueBtn2} classBtn={this.props.classBtn2} funButton={this.props.funcBtn}/>
                                </div>

                            </form>
                        </div>
                    </div>
        );
    }
}