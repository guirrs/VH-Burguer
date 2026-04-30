import axios from "axios";
import secureLocalStorage from "react-secure-storage";

const apiLocal = "https://localhost:7217/api/"

const apiRemota = "";

// cria um endereco da api dentro do axos
export const api = axios.create({
    baseURL: apiLocal
})

// É um inteceptor do Axios
// Ele intercepta(pega) toda a requisição antes de ser enviada
api.interceptors.request.use((config) =>{
    const token = secureLocalStorage.getItem("tokenSeguro");

    if(token){
        config.headers.Authorization = "Bearer " + token;
    }

    return config;
})