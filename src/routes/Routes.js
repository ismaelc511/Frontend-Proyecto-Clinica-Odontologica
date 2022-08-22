import React from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Login from "../pages/Login";
import App from "../App";



function RoutesApp(){
	return(
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Login/>} />
				<Route path="/App" element={<App/>} />
			</Routes>
		</BrowserRouter>
	)
}

export default 	RoutesApp;