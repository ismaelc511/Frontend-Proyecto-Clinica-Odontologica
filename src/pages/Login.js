import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import '../styles/globalStyles.css'
import '../styles/loginSignupStyles.css'
import dentista from '../assets/clinica-dental.png';


const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();
  return <button onClick={() => loginWithRedirect()}>Login</button>;
};


const Login = ()=>{
	return(
		<div>
			<form id="formas">
			<img src={dentista}  alt="texto" width="50%" height="60%" style={{marginLeft: "70px", marginBottom: "20px", }} />
					<div class="form-header" >
									<h2>Clinica Odontologica</h2>
									<p class="rounded">Logueate para acceder</p>
							</div>
     <LoginButton/>
			</form>
		</div>
	)
	}






export default Login;