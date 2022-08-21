import React from "react";
import { useAuth0 } from "@auth0/auth0-react";

const LoginButton = () => {
  const { loginWithRedirect } = useAuth0();

  return <button onClick={() => loginWithRedirect()}>Login</button>;
};


const Login = ()=>{
	return(
		<div>
			<form>
					<div class="form-header">
									<h2>Clinica Odontologica</h2>
									<p class="rounded">Login</p>
							</div>

<LoginButton/>


			</form>
		</div>
	)
	}






export default Login;