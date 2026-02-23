using VHBurguer.Domains;
using VHBurguer.DTOs.ProdutoDto;

namespace VHBurguer.Aplication.Conversoes
{
    public class ProdutoParaDto
    {
        public static LerProdutoDto ConverterParaDto(Produto produto)
        {
            return new LerProdutoDto
            {
                ProdutoID = produto.ProdutoID,
                Nome = produto.Nome,
                Preco = produto.Preco,
                Descricao = produto.Descricao,
                StatusProduto = produto.StatusProduto,

                CategoriasIds = produto.Categoria.Select(categoriaAux => categoriaAux.CategoriaID).ToList(),

                Categorias = produto.Categoria.Select(categoriaAux => categoriaAux.Nome).ToList(),
                    
                UsuarioID = produto.UsuarioID,
                UsuarioNome = produto.Usuario.Nome,
                UsuarioEmail = produto.Usuario.Email
            };

        }
    }
}
