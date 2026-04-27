import { api } from "./api";

export async function login(email: string, senha:string){
    try{
        //requisicao
         const reponse = await api.post("Autenticacao/login", {email, senha})

         console.log("Deu bom fella");
         console.log(reponse);
    }
    catch(error){
        throw new Error("Email ou senha inválidos.");
    }
}