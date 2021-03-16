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
            user: [],
            TOKEN: document
            .querySelector('meta[name="csrf-token"]')
            .getAttribute("content")
        }
        this.sendUser = this.sendUser.bind(this);
        this.handleInput = this.handleInput.bind(this);
    }
    componentDidMount(){
        if(this.props.initialState === true){
            

        }

        console.log('modal')
        console.log(this.state.user)
    }
    
    searchUser(){
        fetch(`http://localhost:8000/user/`, {
            headers:{
                'Content-Type': 'application/json',
                'Accept':'application/json'
            }
        }).then(res => res.json()).then(data => {
           if(data.error){
                console.log(data.error);
           }else{
                let usersArray = [];

                data['success'].forEach(element => {
                    // /* máscara para cpf ou cnpj */
                    element.cpf = this.mascaraCampo(element.cpf);

                    // /* inversão da forma da data de aniversário */
                    element.nascimento = this.inverseBirth(element.nascimento);

                    // /* máscara de telefone */
                    element.telefone = this.mascaraTelefone(element.telefone);

                    usersArray.push(element);
                });
                
                this.setState(
                    {
                        users : usersArray
                    }, () => {
                    this.setState({
                        isLoading: false
                    });
                }
                );
            }
        });
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
            }else{
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
    editUser(element){
        element.preventDefault();

        const data = new FormData();

        data.append("_tolken", this.state.TOKEN);
        data.append("_method", "PUT");
        data.append('name', this.state.data.name);
        data.append('cpf', this.state.data.cpf);
        data.append('telefone', this.state.data.telefone);
        data.append('password', this.state.data.password);
        data.append('nascimento', this.state.data.nascimento);
        data.append('acesslevel', this.state.data.accessLevel);
        data.append('email', this.state.data.email);

        fetch(`http://localhost:8000/api/edit/${id}`, {
            method: "POST",
            headers:{
                'Cache-Control': 'no-cache'
            },
            body: data
        }).then(res => {
            if(res.status == 200){
                this.props.atualizarPag();
                this.props.closeModal();
            }else{
                this.props.closeModal();
            }
        });
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
                            <form className="formModal" method={this.props.method} role="form" onSubmit={(this.props.funcSubmit) ? this.sendUser : this.editUser}>
                                <div className="contentLabels">
                                    <label htmlFor="">
                                        <span>Nome</span>
                                        <input id="name" type="text" name="name" onChange={this.handleInput}/>
                                    </label>
                                    <label htmlFor="">
                                        <span>CPF/CNPJ</span>
                                        <input id="cpf" type="text" name="cpf"  onChange={this.handleInput}/>
                                    </label>
                                    <label htmlFor="">
                                        <span>Telefone</span>
                                        <input id="telefone" type="tel" name="telefone"  onChange={this.handleInput}/>
                                    </label>
                                    <label htmlFor="">
                                        <span>Email</span>
                                        <input id="email" type="email" name="email"  onChange={this.handleInput}/>
                                    </label>
                                    <label htmlFor="">
                                        <span>Senha</span>
                                        <input id="password" type="password" name="password"  onChange={this.handleInput}/>
                                    </label>
                                    <label htmlFor="">
                                        <span>Nível de Acesso</span>
                                        <input id="accessLevel" type="text" name="accessLevel"  onChange={this.handleInput}/>
                                    </label>
                                    <label htmlFor="">
                                        <span>Data de Nascimento</span>
                                        <input id="birth" type="date" name="nascimento"  onChange={this.handleInput}/>
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