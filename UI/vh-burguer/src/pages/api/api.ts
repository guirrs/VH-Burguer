import axios from "axios";

const apiLocal = "https://localhost:7217/api/"

const apiRemota = "";

// cria um endereco da api dentro do axos
export const api = axios.create({
    baseURL: apiLocal
})