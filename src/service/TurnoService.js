import axios from "axios";



export  class TurnoService{
		baseUrl = "http://localhost:8081/turnos/";




	getAll(){
		return axios.get(this.baseUrl).then(res=>res.data);
	}


	save(turno){
		return axios.post(this.baseUrl + "guardar", turno).then(function(res){

		});
	}

	delete(id){
		return axios.delete(this.baseUrl + id)
        .then(res => res.data);
	}
}