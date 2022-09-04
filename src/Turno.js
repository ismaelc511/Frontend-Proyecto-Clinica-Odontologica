import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import React, { Component } from 'react';
import { TurnoService } from './service/TurnoService';
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





export default class Turno extends Component {

	constructor() {
		super();
		this.state = {visible: false,
			turno:
			{
				paciente:
				{
						id:null
				},
				odontologo:
				{
					id:null
				},
				fecha:null
			},
			selectedTurno:{}
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
		this.turnoService = new TurnoService();
		this.delete= this.delete.bind(this);
		this.save= this.save.bind(this);
		this.footer = (
			<div>
				<Button label='Guardar' icon="pi pi-check"  type="submit" onClick={this.save} />
			</div>
		);

	}

	componentDidMount() {
		this.turnoService.getAll().then(data => this.setState({ turnos: data }))
	}

	save() {
		this.turnoService.save(this.state.turno).then(data => {
			this.setState({
				visible:false,
				turno: {paciente:{id:null},odontologo:{id:null},fecha:"2022-08-20"}
			});
			Toast.current.show({severity: 'success', summary: 'guardado', detail: 'guardado con exito'});
			console.log(data)
		})
		this.turnoService.getAll().then(data => this.setState({turnos: data}))
	}



	delete(){
		if(window.confirm("Â¿Realmente desea eliminar el registro?")){
			this.turnoService.delete(this.state.selectedTurno.id).then(data=>{
				Toast.current.show({severity: 'success', summary: 'atencion', detail: 'se elimino el registro correctamente'});
				this.turnoService.getAll().then(data => this.setState({turnos: data}))
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
				<Panel header="Clinica turnos" >
					<DataTable value={this.state.turnos} paginator={true} rows="4" selectionMode="single" selection={this.state.selectedTurno} onSelectionChange={e => this.setState({selectedTurno: e.value})}>
						<Column field="id" header="ID"></Column>
						<Column field="paciente.id" header="Id Paciente"></Column>
						<Column field="paciente.nombre" header="Nombre paciente"></Column>
						<Column field='odontologo.id' header="Id Odontologo"></Column>
						<Column field="odontologo.nombre" header="Nombre odontologo"></Column>
						<Column field='paciente.fechaIngreso' header="Fecha"></Column>

					</DataTable>
				</Panel>
				<Dialog header="Crear turno" visible={this.state.visible} style={{ width: '400px' }} footer={this.footer} modal={true} onHide={() => this.setState({ visible: false })}>
					<form id='turno-form'>
					<br />
					<span className="p-float-label">
						<InputText value={this.state.turno.paciente.id} style={{ width: '100%' }}  id="idPaciente" onChange={(e) => this.setState(prevState => {
							let turno = Object.assign({}, prevState.turno)
							console.log(prevState);
							console.log(e);
							console.log(e.target);
							console.log(e.target.value);


							turno.paciente.id = e.target.value
							return { turno};

						})} />
						<label htmlFor="idPaciente">Id Paciente</label>
					</span>
					<br />
					<span className="p-float-label">
					<InputText value={this.state.turno.odontologo.id} style={{ width: '100%' }}  id="odontologoId" onChange={(e) => this.setState(prevState => {
							let turno = Object.assign({}, prevState.turno)
							turno.odontologo.id = e.target.value
							console.log(this.state.turno.odontologo.id);

							return { turno};

						})} />
						<label htmlFor="odontologoId">odontologo id</label>
					 </span>
						<br />
					</form>
				</Dialog>
				<Toast ref={Toast} />
			</div>
		);
	}
	showSaveDialog() {
		this.setState({
			visible: true,
			turno: {paciente:{id:null},odontologo:{id:null},fecha:null}
		});
		document.getElementById('turno-form').reset();
	};

	showEditDialog(){
		this.setState({
			visible: true,
			turno: {
    paciente: {
        id: this.state.selectedTurno.paciente.id
    },
    odontologo: {
        id: this.state.selectedTurno.odontologo.id
    }
}
		})
		console.log(this.turno);

	};

}