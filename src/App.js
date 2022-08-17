import React,{Component} from 'react';
import './App.css';
import { PersonaService } from './service/PersonaService';


export default class App extends Component{
constructor(){
	super();
	this.state={};
	this.personaService = new PersonaService();
}

componentDidMount(){
	this.personaService.getAll().then(data =>{
		console.log(data);
	})
}

render(){
	return (
		<h1>hola mundo</h1>
	);
}
}