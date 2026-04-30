import { api } from "./api";
import secureLocalStorage from "react-secure-storage";

export async function login(email: string, senha:string){
    try{
        //requisicao
         const reponse = await api.post("Autenticacao/login", {email, senha})

         const token = reponse.data.token;

         secureLocalStorage.setItem("tokenSeguro", token);
    }

    //eslint-disable-next-line
    catch(error: any){
        throw new Error("Email ou senha inválidos.");
    }
}