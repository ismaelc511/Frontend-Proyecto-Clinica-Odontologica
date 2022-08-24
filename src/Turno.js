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
			turno: {
    id: null,
    paciente: {
        id: null,
        fechaIngreso: null,
        domicilio: null
    },
    odontologo: {
        id: null,
    },
    fecha: null
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
		this.turnoService.save(this.state.paciente).then(data => {
			this.setState({
				visible:false,
				turno: {
					id: null,
					paciente: {
									id: null,
									fechaIngreso: null,
									domicilio: null
					},
					odontologo: {
									id: null,
					},
					fecha: null
	}
			});

			Toast.current.show({severity: 'success', summary: 'guardado', detail: 'guardado con exito'});
			this.turnoService.getAll().then(data => this.setState({pacientes: data}))
		} )
	}

	delete(){
		if(window.confirm("¿Realmente desea eliminar el registro?")){
			this.turnoService.delete(this.state.selectedPaciente.id).then(data=>{
				Toast.current.show({severity: 'success', summary: 'atencion', detail: 'se elimino el registro correctamente'});
				this.turnoService.getAll().then(data => this.setState({pacientes: data}))
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
					<DataTable value={this.state.turnos} paginator={true} rows="4" selectionMode="single" selection={this.state.selectedPaciente} onSelectionChange={e => this.setState({selectedPaciente: e.value})}>
						<Column field="id" header="ID"></Column>
						<Column field='idPaciente' header="Id Paciente"></Column>
						<Column field='fechaIngreso' header="Fecha Ingreso"></Column>
						<Column field='domicilio' header="Domicilio"></Column>
						<Column field='idOdoontologo' header="Id Odoontologo"></Column>
						<Column field='fecha' header="Fecha"></Column>

					</DataTable>
				</Panel>
				<Dialog header="Crear turno" visible={this.state.visible} style={{ width: '400px' }} footer={this.footer} modal={true} onHide={() => this.setState({ visible: false })}>
					<form id='turno-form'>
					<span className="p-float-label">
						<InputText value={this.state.turno.id} style={{ width: '100%' }}  id="nombre" onChange={(e) => {
							let val = e.target.value;
							this.setState(prevState => {
								console.log(val);
								console.log(this.state.turno.id);
								let turno = Object.assign({}, prevState.turno)
								turno.id = val;

								return { turno };

							})
						}} />
						<label htmlFor="id turno">id turno</label>
					</span>
					<br />
					<span className="p-float-label">
						<InputText value={this.state.turno.paciente.id} style={{ width: '100%' }}  id="idPaciente" onChange={(e) => this.setState(prevState => {
							let turno = Object.assign({}, prevState.turno)
							turno.paciente.id = e.target.value

							return { turno};

						})} />
						<label htmlFor="idPaciente">id paciente</label>
					</span>
					<br />
					<span className="p-float-label">
						<InputText value={this.state.turno.paciente.fechaIngreso} style={{ width: '100%' }}  id="fechaIngreso" onChange={(e) => this.setState(prevState => {
									let turno = Object.assign({}, prevState.turno)
									turno.paciente.fechaIngreso = e.target.value

									return { turno};

						})} />
						<label htmlFor="fechaIngreso">FechaIngreso</label>
					</span>
					<br />
					<span className="p-float-label">
					<InputText value={this.state.turno.paciente.domicilio} style={{ width: '100%' }}  id="domicilio" onChange={(e) => this.setState(prevState => {
							let turno = Object.assign({}, prevState.turno)
							turno.paciente.domicilio = e.target.value

							return { turno};

						})} />
						<label htmlFor="domicilio">Domicilio paciente</label>
					<br />
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
			turno: {
    id: null,
    paciente: {
        id: null,
        fechaIngreso: null,
        domicilio: null
    },
    odontologo: {
        id: null,
    },
    fecha: null
}
		});
		document.getElementById('paciente-form').reset();
	};

	showEditDialog(){
		this.setState({
			visible: true,
			turno: {
    id: this.state.turno.id,
    paciente: {
        id: this.state.turno.paciente.id,
        fechaIngreso: this.state.turno.paciente.fechaIngreso,
        domicilio: this.state.turno.paciente.domicilio
    },
    odontologo: {
        id: this.state.turno.odontologo.id,
    },
    fecha: this.state.turno.fecha
}
		})
	};
}