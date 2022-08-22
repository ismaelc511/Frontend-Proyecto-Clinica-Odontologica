import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import { Button } from 'primereact/button';

export const LogoutButton = ()=>{
	const {logout} = useAuth0();

	return <Button className="p-button-raised p-button" style={{marginBottom: 20}} onClick={()=>logout({returnTo: window.location.origin})}> Logout </Button>
}