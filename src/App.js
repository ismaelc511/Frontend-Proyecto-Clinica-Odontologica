import { Column } from 'primereact/column';
import {DataTable} from 'primereact/datatable';
import React,{Component} from 'react';
import './App.css';
import { PersonaService } from './service/PersonaService';
import { Panel } from 'primereact/panel';
//css
import "primereact/resources/themes/lara-light-indigo/theme.css";  //theme
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";                                //icons

export default class App extends Component{
 constructor(){
	super();
	this.state={};
this.personaService = new PersonaService();
}
componentDidMount(){
this.personaService.getAll().then(data =>this.setState({personas:data}))
 }

render(){
 return (
		<Panel header="Clinica Odontologos" style={{width: '80%',margin:'0 auto', marginTop:'40px' }}>
			<DataTable value={this.state.personas}>
			<Column field="id" header="ID"></Column>
			<Column field='nombre' header="Nombre"></Column>
			<Column field='apellido' header="Apellido"></Column>
			<Column field='matricula' header="Matricula"></Column>
		</DataTable>
		</Panel>
	);
}
}