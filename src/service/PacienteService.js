import axios from "axios";



export  class PacienteService{
		baseUrl = "http://localhost:8081/pacientes/";

	getAll(){
		return axios.get(this.baseUrl).then(res=>res.data);
	}

	save(pacientes){
		return axios.post(this.baseUrl, pacientes).then(res=>res.data);
	}

	delete(id){
		return axios.delete(this.baseUrl + id)
        .then(res => res.data);
	}
}