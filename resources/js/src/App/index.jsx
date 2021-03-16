import React, { Component } from 'react';
import './style.css';
import Header from '../components/Header';
import Button from '../components/Button';
import ModalUser from '../components/ModalUser';


export default class App extends Component{
    constructor(){
        super();

        this.state = ({
            isLoading: true,
            users : [],
            modal: {
                isOpen: false
            }
        });

        this.listar = this.listar.bind(this);
        this.openModal = this.openModal.bind(this);
        this.deleteUser = this.deleteUser.bind(this);
        this.editUser = this.editUser.bind(this);
    }

    componentWillMount(){

        this.listar();
    }

    mascaraCpf(cpf){
        return cpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g,"\$1.\$2.\$3\-\$4");
    }
    mascaraCnpj(cnpj){
        return cnpj.replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/g,"\$1.\$2.\$3\/\$4\-\$5");
    }
    mascaraCampo(value){
        if(value.length <= 11){
            return value = this.mascaraCpf(value);
        }else{
            return value = this.mascaraCnpj(value);
        }
    }
    mascaraTelefone(telefone){
        let data = telefone.split("");
        telefone = `(${data[0]}${data[1]}) ${data[2]} ${data[3]}${data[4]}${data[5]}${data[6]}-${data[7]}${data[8]}${data[9]}${data[10]}`;
        return telefone;
    }
    inverseBirth(date){
        let y = date.split("-");
        return `${y[2]}/${y[1]}/${y[0]}`
    }

    openModal(){
        this.setState({
            modal:{
                isOpen: !this.state.modal.isOpen
            }
        })
    }

    listar() {
        this.setState({
            isLoading: true
        });

        fetch('http://localhost:8000/api/', {
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

    deleteUser(id){
        alert('deseja excluir')
        const data = new FormData();
        data.append("_method", "DELETE");
        fetch(`http://localhost:8000/api/delete/${id}`, {
            method: "DELETE",
            body: data
        });
        this.listar();
    }

    editUser(){
        this.openModal();

    }
    render(){
        const loading = (
            <div className="spinner">
            </div>

        );
        return(
            <React.Fragment>
               <div className="container">
                   <div className="containerHeader" >
                        <Header title="Lista de Usuários" btnName="Novo Usuário" funcBtn={this.openModal}/>
                   </div>
                    <div className="containerList">
                        <div className="contentList">
                            <div className="table">
                                <div className="tableHeader">
                                    <div className="userName-th">Nome do Usuário</div>
                                    <div className="userEmail-th">E-mail</div>
                                    <div className="userAccessLevel-th">Nível de Acesso</div>
                                    <div className="actions-th">Ações</div>
                                </div>
                                {
                                    this.state.isLoading ?  
                                        loading : 
                                        this.state.users.map((item) => {
                                            return (
                                                <div className="tableBody" key={item.id}>
                                                    <div className="userName-td">{item.nome}</div>
                                                    <div className="userEmail-td">{item.email}</div>
                                                    <div className="userAccessLevel-td">{item.accessLevel}</div>
                                                    <div className="actions-td" key={item.id}>
                                                        <Button value="Editar" classBtn="edit" funButton={this.editUser}/>
                                                        <Button value="Excluir" classBtn="delete" funButton={() => this.deleteUser(item.id)}/>
                                                    </div>
                                                </div>
                                            );
                                        })
                                    }
                                {
                                    (this.state.users.length < 1 && this.state.isLoading === false) ? 
                                    (<div className="noUser">
                                        <h2>Nenhum Usuário Cadastrado</h2>
                                    </div>) : null
                                }
                            </div>
                        </div>
                    </div>
                    {
                        (this.state.modal.isOpen === true) ? 
                            <ModalUser titulo="Cadastrar Novo Usuário" valueBtn="Cadastrar" classBtn="cadastro" addUser={e => this.adduser(e)} valueBtn2="Cancelar" classBtn2="delete" funcBtn={this.openModal} 
                                atualizarPag={this.listar}
                            />
                            : null
                    }



               </div>
            </React.Fragment>
        );
    }

}