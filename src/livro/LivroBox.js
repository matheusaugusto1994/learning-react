import React, {Component} from 'react';
import Formulario from './Formulario';
import Tabela from './Tabela';

import $ from 'jquery';
import PubSub from 'pubsub-js';

export default class LivroBox extends Component {

    constructor() {
        super();    
        this.state = {lista : [], autores:[]};    
    }
  
    componentDidMount(){  
        $.ajax({
            url:"http://localhost:8080/api/livros",
            dataType: 'json',
            success:function(resposta){    
                this.setState({lista:resposta});
            }.bind(this)
        });
  
        $.ajax({
            url:"http://localhost:8080/api/autores",
            dataType: 'json',
            success:function(resposta){    
                this.setState({autores:resposta});
            }.bind(this)
        });

        PubSub.subscribe('atualiza-lista-livros',function(topico,novaLista){
            this.setState({lista:novaLista});
        }.bind(this));
    } 

    render(){
        return(
            <div>
                <div className="header">
                    <h1>Cadastro de Livros</h1>
                </div>
                <div className="content" id="content"> 
                    <Formulario autores={this.state.autores}/>
                    <Tabela lista={this.state.lista}/>
                </div>
            </div>
        );
    }

}