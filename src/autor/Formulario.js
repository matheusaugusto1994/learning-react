import React, {Component} from 'react';
import $ from 'jquery';
import InputCustomizado from '../componentes/InputCustomizado';
import PubSub from 'pubsub-js';
import TratadorErros from  '../TratadorErros';

export default class Formulario extends Component {

    constructor() {
        super();    
        this.state = {nome:'',email:'',senha:''};
        this.enviaForm = this.enviaForm.bind(this);
    }
    
    enviaForm(evento){
        evento.preventDefault();    
        $.ajax({
        	url:'http://localhost:8080/api/autores',
          	contentType:'application/json',
          	dataType:'json',
          	type:'post',
          	data: JSON.stringify({nome:this.state.nome,email:this.state.email,senha:this.state.senha}),
          	success: function(novaListagem){
            	PubSub.publish('atualiza-lista-autores',novaListagem);        
            	this.setState({nome:'',email:'',senha:''});
          	}.bind(this),
          	error: function(resposta){
            	if(resposta.status === 400) {
              		new TratadorErros().publicaErros(resposta.responseJSON);
            	}
          	},
          	beforeSend: function(){
            	PubSub.publish("limpa-erros",{});
          	}      
        });
    }
    
    setChange(component, event){
    	this.setState({[component]:event.target.value});
    }

    render() {
        return (
            <div className="pure-form pure-form-aligned">
                <form className="pure-form pure-form-aligned" onSubmit={this.enviaForm} method="post">
                    <InputCustomizado id="nome" type="text" name="nome" 
                        value={this.state.nome} onChange={this.setChange.bind(this, 'nome')} label="Nome"/>

                    <InputCustomizado id="email" type="email" name="email" 
                        value={this.state.email} onChange={this.setChange.bind(this, 'email')} label="Email"/>

                    <InputCustomizado id="senha" type="password" name="senha" 
                        value={this.state.senha} onChange={this.setChange.bind(this, 'senha')} label="Senha"/>                                                                      
                    
                    <div className="pure-control-group">                                  
                        <label></label> 
                        <button type="submit" className="pure-button pure-button-primary">Gravar</button>                                    
                    </div>
                </form>            
            </div>
        );
    }

}