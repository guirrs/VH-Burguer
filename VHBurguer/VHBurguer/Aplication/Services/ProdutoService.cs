using VHBurguer.Aplication.Conversoes;
using VHBurguer.Aplication.Regras;
using VHBurguer.Domains;
using VHBurguer.DTOs.ProdutoDto;
using VHBurguer.Exceptions;
using VHBurguer.Interfaces;

namespace VHBurguer.Aplication.Services
{
    public class ProdutoService
    {
        private readonly IProdutoRepository _repository;

        public ProdutoService(IProdutoRepository repository)
        {
            _repository = repository;
        }

        public List<LerProdutoDto> Listar()
        {
            List<Produto> produtos = _repository.Listar();
            
            // Converte todos os produtos para DTO
            List<LerProdutoDto> produtoDtos = produtos.Select(ProdutoParaDto.ConverterParaDto).ToList();

            return produtoDtos;
        }

        public LerProdutoDto ObterPorId(int id)
        {
            Produto produto = _repository.ObterPorId(id);

            if (produto == null)
            {
                throw new DomainException("Produto não encontrado.");
            }

            return ProdutoParaDto.ConverterParaDto(produto);
        }

        private static void ValidarCadastro(CriarProdutoDto produtoDto)
        {
            if (string.IsNullOrWhiteSpace(produtoDto.Nome))
            {
                throw new DomainException("Nome é obrigatório;");
            }

            if(produtoDto.Preco < 0)
            {
                throw new DomainException("Preco deve ser maior que zero;");
            }

            if (string.IsNullOrWhiteSpace(produtoDto.Descricao))
            {
                throw new DomainException("Descrição é obrigatória.");
            }

            if(produtoDto.Imagem == null || produtoDto.Imagem.Length == 0)
            {
                throw new DomainException("Imagem é obrigatória.");
            }

            if(produtoDto.CategoriasIds == null || produtoDto.CategoriasIds.Count() == 0)
            {
                throw new DomainException("Produto deve ter ao menos uma categoria.");
            }
        }

        public byte[] ObterImagem(int id)
        {
            var imagem = _repository.ObterImagem(id);

            if (imagem == null || imagem.Length == 0)
            {
                throw new DomainException("Imagem não encontrada.");
            }

            return imagem;
        }

        public LerProdutoDto Adicionar(CriarProdutoDto produtoDto, int usuarioId)
        {
            ValidarCadastro(produtoDto);

            if (_repository.NomeExiste(produtoDto.Nome))
            {
                throw new DomainException("Produto ja existe");
            }

            Produto produto = new Produto
            {
                Nome = produtoDto.Nome,
                Preco = produtoDto.Preco,
                Descricao = produtoDto.Descricao,
                Imagem = ImagemParaBytes.ConverterImagem(produtoDto.Imagem),
                StatusProduto = true,
                UsuarioID = usuarioId
            };

            _repository.Adicionar(produto, produtoDto.CategoriasIds);

            return ProdutoParaDto.ConverterParaDto(produto);
        }

        public LerProdutoDto Atualizar(int id, AtualizarProdutoDto produtoDto)
        {
            HorarioAlteracaoProduto.ValidarHorario();

            Produto produtoBanco = _repository.ObterPorId(id);

            if(produtoBanco == null)
            {
                new DomainException("Produto não encontrado");
            }

            // produtoIdAtual -> dois pontos servem para passar o valor do parametro
            if(_repository.NomeExiste(produtoDto.Nome, produtoIdAtual: id))
            {
                throw new DomainException("Já existe outro produto com esse nome.");
            }

            if (produtoDto.Preco < 0)
            {
                throw new DomainException("Preco deve ser maior que zero;");
            }

            if (produtoDto.CategoriasIds == null || produtoDto.CategoriasIds.Count() == 0)
            {
                throw new DomainException("Produto deve ter ao menos uma categoria.");
            }

            produtoBanco.Nome = produtoDto.Nome;
            produtoBanco.Preco = produtoDto.Preco;
            produtoBanco.Descricao = produtoDto.Descricao;

            if (produtoDto.Imagem != null && produtoDto.Imagem.Length > 0)
            {
                produtoBanco.Imagem = ImagemParaBytes.ConverterImagem(produtoDto.Imagem);
            }

            if (produtoDto.StatusProduto.HasValue)
            {
                produtoBanco.StatusProduto = produtoBanco.StatusProduto.Value;
            }

            _repository.Atualizar(produtoBanco, produtoDto.CategoriasIds);

            return ProdutoParaDto.ConverterParaDto(produtoBanco);
    }

        public void Remover(int id)
        {
            HorarioAlteracaoProduto.ValidarHorario();

            Produto produto = _repository.ObterPorId(id);

            if(produto == null)
            {
                throw new DomainException("Produto não encontrado");
            }

            _repository.Remover(id);
        }
    }
}
