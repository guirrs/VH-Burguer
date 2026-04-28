import { api } from "./api"; 

export async function cadastrarCategoria(nome: string) {
    try{
        await api.post("Categoria", {nome});
        console.log("deu bom")
    }
    catch(error: unknown){
        throw new Error("Erro ao cadastrar categoria")
    }
}