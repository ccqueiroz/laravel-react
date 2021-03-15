import React, { Component } from 'react';
import './style.css'


export default class ListaUser extends Component{
    constructor(props){
        super(props);

        this.state = ({
            userList : this.props.array
        });
    }

    alimenta(valor){
        this.setState({
            userList: valor
        })
    }

    
    render(){
        
        return(
            <div className="contentList">
     
                <table>
                    <thead>
                        <tr>
                            <th>Nome do Usuário</th>
                            <th>Email</th>
                            <th>Nível de Acesso</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            {console.log(this.state.userList)}
                            {/* {this.state.userList.map( user => (
                               <div>
                                   <td>{user.name}</td>
                                   <td>{user.email}</td>
                                   <td>{user.accessLevel}</td>
                                   <td>
                                       [Editar] [Excluir]
                                   </td>
                               </div>
                                
                            ) )} */}
                        </tr>
                    </tbody>
                </table>
            </div>
        );
    }
}