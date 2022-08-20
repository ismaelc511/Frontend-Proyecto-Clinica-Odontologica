import axios from "axios";



export class PersonaService{
		baseUrl = "http://localhost:8081/odontologos/";

	getAll(){
		return axios.get(this.baseUrl).then(res=>res.data);
	}
}