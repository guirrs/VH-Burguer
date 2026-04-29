import { api } from "./api"; 

export async function cadastrarCategoria(nome: string) {
    try{
        await api.post("Categoria", {nome});
    }
    //eslint-disable-next-line
    catch(error: any){
        throw new Error(error.response.data);
    }
}

export async function listarCategoria() {
    try{
        const response = await api.get("Categoria");
        return response;
    }
    //eslint-disable-next-line
    catch(error: any)
    {
        throw new Error(error.response.data);
    }
}