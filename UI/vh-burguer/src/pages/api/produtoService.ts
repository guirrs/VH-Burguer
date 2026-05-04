import { api } from "./api";

type Produto = {
    nome: string,
    descricao: string,
    preco: string,
    imagem: File | null,
    categoriasIds: number[],
    imagemUrl: string
}

export async function cadastrarProduto(dados: Produto){
    try{
        const formData = new FormData();

        formData.append("Nome", dados.nome);
        formData.append("Descricao", dados.descricao);
        formData.append("Preco", dados.preco);
        if(dados.imagem){
            formData.append("Imagem", dados.imagem);
        }
        dados.categoriasIds.forEach((id) => {
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

export async function listarProduto(){
    try{
        const response = await api.get("Produto");

        const produtos = response.data.map((produto : Produto) => ({
            ...produto,
            imagemUrl: `${api.defaults.baseURL} ${produto.imagemUrl}`
        }))

        return produtos;
    }
    catch(error: any){
        throw new Error(error.response.data);
    }
}

export async function listarPorId(id: number){
    try{
        const response = await api.get("Produto/" + id);

        const produtos = response.data.map((produto : Produto) => ({
            ...produto,
            imagemUrl: `${api.defaults.baseURL} ${produto.imagemUrl}`
        }))

        return produtos;
    }
    catch(error: any){
        throw new Error(error.response.data)
    }
}