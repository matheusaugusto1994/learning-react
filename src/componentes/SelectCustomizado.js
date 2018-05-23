import React, {Component} from 'react';

export default class SelectCustomizado extends Component {

    render() {
        return(
            <div className="pure-control-group">
            <label htmlFor={this.props.id}>{this.props.label}</label>
                <select {...this.props}>
                    <option value="">{this.props.optionLabel}</option>
                    {
                        this.props.lista.map(function(element){
                            return <option value={element.id}>{element.nome}</option>
                        })
                    }
                </select>
            </div>
        );
    }

}