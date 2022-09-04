import { TabMenu } from 'primereact/tabmenu';
import React from 'react';
import "../styles/principal.css"

const items = [
	{label: 'CLIO'},
	{h1:'   '},
	{h1:'   '},
	{label: 'Home', icon: 'pi pi-fw pi-home',url:'http://localhost:3000/'},
	{label: 'Pacientes', icon: 'pi pi-fw pi-user', url:'http://localhost:3000/Pacientes'},
	{label: 'Odontologo', icon: 'pi pi-fw pi-user',url:'http://localhost:3000/App'},
	{label: 'Turno', icon: 'pi pi-fw pi-user',url:'http://localhost:3000/Turno'},
	{h1:'   '},
	{h1:'   '},
	{h1:'   '},
	{h1:'   '},
	{h1:'   '},
	{h1:'   '},
	{h1:'   '},
	{h1:'   '},
	{h1:'   '},
	{label: 'Login', icon: 'pi pi-fw pi-user',url:'http://localhost:3000/Login'},


];

const Navbar=() => {

return(
<div className="navbar" >

<TabMenu model={items}  />
</div>
);

}


export default Navbar;