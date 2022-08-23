import React from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Login from "../pages/Login";
import App from "../App";
import Pacientes from '../Pacientes';



function RoutesApp(){
	return(
		<BrowserRouter>
			<Routes>
				<Route path="/Pacientes" element={<Pacientes/>} />
				<Route path="/App" element={<App/>} />
				<Route path="/" element={<Login/>} />
			</Routes>
		</BrowserRouter>
	)
}

export default 	RoutesApp;