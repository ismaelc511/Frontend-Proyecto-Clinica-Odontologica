import React from 'react';
import ReactDOM from 'react-dom';
import './styles/index.css';
import {Auth0Provider} from '@auth0/auth0-react'
import RoutesApp from './routes/Routes';

ReactDOM.render(

<Auth0Provider domain='dev-z7ta-j9k.us.auth0.com'
	clientId='DNPnOdzoM3rbZApvM8tajdJszJdNyzdB'
	redirectUri={window.location.origin}><RoutesApp/></Auth0Provider>,
	document.getElementById('root'));
