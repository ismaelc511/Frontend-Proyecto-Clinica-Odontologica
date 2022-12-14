import axios from "axios";



export class OdontologoService{
		baseUrl = "http://localhost:8081/odontologos/";

	getAll(){
		return axios.get(this.baseUrl).then(res=>res.data);
	}

	save(odontologo){
		return axios.post(this.baseUrl, odontologo).then(res=>res.data);
	}

	delete(id){
		return axios.delete(this.baseUrl+ id)
        .then(res => res.data);
	}
}