import React, {Component} from 'react';
import InputCustomizado from '../componentes/InputCustomizado';
import SelectCustomizado from '../componentes/SelectCustomizado';
import TratadorErros from  '../TratadorErros';

import $ from 'jquery';
import PubSub from 'pubsub-js';

export default class Formulario extends Component {

    constructor() {
        super();
        this.state = {titulo:'',preco:'',autorId:''};
        this.enviaForm = this.enviaForm.bind(this);
    }

    enviaForm(evento) {
        evento.preventDefault();    
        $.ajax({
        	url:'http://localhost:8080/api/livros',
          	contentType:'application/json',
          	dataType:'json',
          	type:'post',
          	data: JSON.stringify({titulo:this.state.titulo, preco:this.state.preco, autorId:this.state.autorId}),
          	success: function(novaListagem){
            	PubSub.publish('atualiza-lista-livros',novaListagem);        
            	this.setState({titulo:'',preco:'',autorId:''});
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

    setChange(component, event) {
        this.setState({[component]: event.target.value});
    }

    render(){
        return(
            <div className="pure-form pure-form-aligned">
                <form className="pure-form pure-form-aligned" onSubmit={this.enviaForm} method="post">
                    <InputCustomizado id="titulo" type="text" name="titulo" 
                        value={this.state.titulo} onChange={this.setChange.bind(this, 'titulo')} label="Titulo"/>       

                    <InputCustomizado id="preco" type="text" name="preco" 
                        value={this.state.preco} onChange={this.setChange.bind(this, 'preco')} label="Preço"/> 

                    <SelectCustomizado id="autorId" name="autorId" value={this.state.autorId} 
                        onChange={this.setChange.bind(this, 'autorId')} label="Autor" lista={this.props.autores} optionLabel="Selecione um Autor"/>         

                    <div className="pure-control-group">                                  
                        <label></label> 
                        <button type="submit" className="pure-button pure-button-primary">Gravar</button>                                    
                    </div>
                </form>            
            </div>
        );
    }

}