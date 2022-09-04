import React from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Login from "../pages/Login";
import App from "../App";
import Pacientes from '../Pacientes';
import Turno from "../Turno";
import Navbar from "../pages/Navbar";
import Index from "../index.jsx";



function RoutesApp(){
	return(
		<BrowserRouter>
		<Navbar/>
			<Routes>
				<Route path="/Pacientes" element={<Pacientes/>} />
				<Route path="/Turno" element={<Turno/>} />
				<Route path="/App" element={<App/>} />
				<Route path="/" element={<Index/>} />
			</Routes>
			<Routes>
			<Route path="/login" element={<Login/>} />
			</Routes>
		</BrowserRouter>
	)
}

export default 	RoutesApp;