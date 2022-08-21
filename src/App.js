import { Column } from 'primereact/column';
import { DataTable } from 'primereact/datatable';
import React, { Component } from 'react';
import './App.css';
import { OdontologoService } from './service/OdontologoService';
import { Panel } from 'primereact/panel';
import { Menubar } from 'primereact/menubar';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';




//css
import "primereact/resources/themes/lara-light-indigo/theme.css";  //theme
import "primereact/resources/primereact.min.css";                  //core css
import "primeicons/primeicons.css";                                //icons


export default class App extends Component {


	constructor() {
		super();
		this.state = {visible: false,
			odontologo: {
				id: null,
				nombre: null,
				apellido: null,
				matricula: null
			},
			selectedOdontologo:{}
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
		this.odontologoService = new OdontologoService();
		this.delete= this.delete.bind(this);
		this.save= this.save.bind(this);
		this.footer = (
			<div>
				<Button label='Guardar' icon="pi pi-check"  type="submit" onClick={this.save} />
			</div>
		);

	}

	componentDidMount() {
		this.odontologoService.getAll().then(data => this.setState({ odontologos: data }))
	}


	save() {
		this.odontologoService.save(this.state.odontologo).then(data => {
			this.setState({
				visible:false,
				odontologo: {
					id: null,
					nombre: null,
					apellido: null,
					matricula: null
				}
			});

			Toast.current.show({severity: 'success', summary: 'guardado', detail: 'guardado con exito'});
			this.odontologoService.getAll().then(data => this.setState({odontologos: data}))
		} )
	}

	delete(){
		if(window.confirm("¿Realmente desea eliminar el registro?")){
			this.odontologoService.delete(this.state.selectedOdontologo.id).then(data=>{
				Toast.current.show({severity: 'success', summary: 'atencion', detail: 'se elimino el registro correctamente'});
				this.odontologoService.getAll().then(data => this.setState({odontologos: data}))
			})
		}
	}

	render() {

		return (
			<div style={{ width: '80%', margin: '0 auto', marginTop: '20px' }}>
				<Menubar model={this.items} />
				<br />
				<Panel header="Clinica Odontologos" >
					<DataTable value={this.state.odontologos} paginator={true} rows="4" selectionMode="single" selection={this.state.selectedOdontologo} onSelectionChange={e => this.setState({selectedOdontologo: e.value})}>
						<Column field="id" header="ID"></Column>
						<Column field='nombre' header="Nombre"></Column>
						<Column field='apellido' header="Apellido"></Column>
						<Column field='matricula' header="Matricula"></Column>
					</DataTable>
				</Panel>
				<Dialog header="Crear odontologo" visible={this.state.visible} style={{ width: '400px' }} footer={this.footer} modal={true} onHide={() => this.setState({ visible: false })}>
					<form id='odontologo-form'>
					<span className="p-float-label">
						<InputText value={this.state.odontologo.nombre} style={{ width: '100%' }}  id="nombre" onChange={(e) => {
							let val = e.target.value;
							this.setState(prevState => {
								console.log(val);
								let odontologo = Object.assign({}, prevState.odontologo)
								odontologo.nombre = val;

								return { odontologo };

							})
						}} />
						<label htmlFor="nombre">Nombre</label>
					</span>
					<br />
					<span className="p-float-label">
						<InputText value={this.state.odontologo.apellido} style={{ width: '100%' }}  id="apellido" onChange={(e) => this.setState(prevState => {
							let odontologo = Object.assign({}, prevState.odontologo)
							odontologo.apellido = e.target.value

							return { odontologo };

						})} />
						<label htmlFor="apellido">Apellido</label>
					</span>
					<br />
					<span className="p-float-label">
						<InputText value={this.state.odontologo.matricula} style={{ width: '100%' }}  id="matricula" onChange={(e) => this.setState(prevState => {
							let odontologo = Object.assign({}, prevState.odontologo)
							odontologo.matricula = e.target.value

							return { odontologo };

						})} />
						<label htmlFor="matricula">Matricula</label>
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
			odontologo:{
			id: null,
			nombre: null,
			apellido: null,
			matricula: null
		}
		});
		document.getElementById('odontologo-form').reset();
	};

	showEditDialog(){
		this.setState({
			visible: true,
			odontologo:{
				id: this.state.selectedOdontologo.id,
				nombre: this.state.selectedOdontologo.nombre,
				apellido: this.state.selectedOdontologo.apellido,
				matricula: this.state.selectedOdontologo.matricula
			}
		})
	};
}