import { Console } from "console";
import { api } from "./api";

type Produto = {
    Nome: string,
    Descricao: string,
    Preco: string,
    Imagem: File | null,
    CategoriasIds: number[]
}

export async function cadastrarProduto(dados: Produto){
    try{
        const formData = new FormData();

        formData.append("Nome", dados.Nome);
        formData.append("Descricao", dados.Descricao);
        formData.append("Preco", dados.Preco);
        if(dados.Imagem){
            formData.append("Imagem", dados.Imagem);
        }
        dados.CategoriasIds.forEach((id) => {
            formData.append("CategoriasIds", id.toString());
        })

        await api.post("Produto", formData);

        console.log("eba deu bom")

    }
    //eslint-disable-next-line
    catch(error: any){
        throw new Error(error.response.data);
    }
}