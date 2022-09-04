import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import React, { Component } from 'react';

import { PacienteService } from './service/PacienteService';
import { Panel } from 'primereact/panel';
import { Menubar } from 'primereact/menubar';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import {LogoutButton} from './pages/Logout';
import {Profile} from './pages/Profile';



//css
import "primereact/resources/themes/lara-light-indigo/theme.css";  //theme
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";
                           //icons





export default class Pacientes extends Component {

	constructor() {
		super();
		this.state = {visible: false,
			paciente: {
				id: null,
				nombre: null,
				apellido: null,
				dni: null,
				domicilio:null
			},
			selectedPaciente:{}
		};
		this.items = [{
			label: 'Nuevo',
			icon: 'pi pi-fw pi-plus',
			command: () => { this.showSaveDialog() }
		},
		{
			label: 'Editar',
			icon: 'pi pi-fw pi-pencil',
			command: () => { this.showEditDialog() }
		},
		{
			label: 'Eliminar',
			icon: 'pi pi-fw pi-trash',
			command: () => { this.delete() }
		}
		];
		this.pacienteService = new PacienteService();
		this.delete= this.delete.bind(this);
		this.save= this.save.bind(this);
		this.footer = (
			<div>
				<Button label='Guardar' icon="pi pi-check"  type="submit" onClick={this.save} />
			</div>
		);

	}

	componentDidMount() {
		this.pacienteService.getAll().then(data => this.setState({ pacientes: data }))
	}


	save() {
		this.pacienteService.save(this.state.paciente).then(data => {
			this.setState({
				visible:false,
				paciente: {
					id: null,
					nombre: null,
					apellido: null,
					dni: null,
					domicilio:null
				}
			});

			Toast.current.show({severity: 'success', summary: 'guardado', detail: 'guardado con exito'});
			this.pacienteService.getAll().then(data => this.setState({pacientes: data}))
		} )
	}

	delete(){
		if(window.confirm("¿Realmente desea eliminar el registro?")){
			this.pacienteService.delete(this.state.selectedPaciente.id).then(data=>{
				Toast.current.show({severity: 'success', summary: 'atencion', detail: 'se elimino el registro correctamente'});
				this.pacienteService.getAll().then(data => this.setState({pacientes: data}))
			})
		}
	}


	render() {

		return (

			<div style={{ width: '80%', margin: '0 auto', marginTop: '20px' }}>
				<Profile/>
				<LogoutButton/>
				<Menubar model={this.items} />
				<br />
				<Panel header="Clinica Pacientes" >
					<DataTable value={this.state.pacientes} paginator={true} rows="4" selectionMode="single" selection={this.state.selectedPaciente} onSelectionChange={e => this.setState({selectedPaciente: e.value})}>
						<Column field="id" header="ID"></Column>
						<Column field='nombre' header="Nombre"></Column>
						<Column field='apellido' header="Apellido"></Column>
						<Column field='dni' header="DNI"></Column>
						<Column field='domicilio' header="Domicilio"></Column>

					</DataTable>
				</Panel>
				<Dialog header="Crear paciente" visible={this.state.visible} style={{ width: '400px' }} footer={this.footer} modal={true} onHide={() => this.setState({ visible: false })}>
					<form id='paciente-form'>
					<span className="p-float-label">
						<InputText value={this.state.paciente.nombre} style={{ width: '100%' }}  id="nombre" onChange={(e) => {
							let val = e.target.value;
							this.setState(prevState => {
								console.log(val);
								console.log(this.state.paciente.nombre);
								let paciente = Object.assign({}, prevState.paciente)
								paciente.nombre = val;

								return { paciente };

							})
						}} />
						<label htmlFor="nombre">Nombre</label>
					</span>
					<br />
					<span className="p-float-label">
						<InputText value={this.state.paciente.apellido} style={{ width: '100%' }}  id="apellido" onChange={(e) => this.setState(prevState => {
							let paciente = Object.assign({}, prevState.paciente)
							paciente.apellido = e.target.value

							return { paciente };

						})} />
						<label htmlFor="apellido">Apellido</label>
					</span>
					<br />
					<span className="p-float-label">
						<InputText value={this.state.paciente.dni} style={{ width: '100%' }}  id="dni" onChange={(e) => this.setState(prevState => {
							let paciente = Object.assign({}, prevState.paciente)
							paciente.dni = e.target.value

							return { paciente };

						})} />
						<label htmlFor="dni">dni</label>
					</span>
					<br />
					<span className="p-float-label">
					<InputText value={this.state.paciente.domicilio} style={{ width: '100%' }}  id="domicilio" onChange={(e) => this.setState(prevState => {
							let paciente = Object.assign({}, prevState.paciente)
							paciente.domicilio = e.target.value

							return { paciente };

						})} />
						<label htmlFor="domicilio">domicilio</label>
					</span>
					</form>
				</Dialog>
				<Toast ref={Toast} />
			</div>
		);
	}
	showSaveDialog() {
		this.setState({
			visible: true,
			paciente:{
			id: null,
			nombre: null,
			apellido: null,
			dni: null,
			domicilio:null
		}
		});
		document.getElementById('paciente-form').reset();
	};

	showEditDialog(){
		this.setState({
			visible: true,
			paciente:{
				id: this.state.selectedPaciente.id,
				nombre: this.state.selectedPaciente.nombre,
				apellido: this.state.selectedPaciente.apellido,
				dni: this.state.selectedPaciente.dni,
				domicilio: this.state.selectedPaciente.domicilio
			}
		})
	};
}