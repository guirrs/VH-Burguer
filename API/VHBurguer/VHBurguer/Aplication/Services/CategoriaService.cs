using VHBurguer.Domains;
using VHBurguer.DTOs.CategoriaDto;
using VHBurguer.Exceptions;
using VHBurguer.Interfaces;

namespace VHBurguer.Aplication.Services
{
    public class CategoriaService
    {
        private readonly ICategoriaRepository _repository;

        public CategoriaService(ICategoriaRepository repository)
        {
            _repository = repository;
        }

        public List<LerCategoriaDto> Listar()
        {
            List<Categoria> categorias = _repository.Listar();
            // Converte cada categoria para LerCategoriaDto
            List<LerCategoriaDto> categoriaDto = categorias.Select(categoriaAux => new LerCategoriaDto
            {
                CategoriaID = categoriaAux.CategoriaID,
                Nome = categoriaAux.Nome
            }).ToList();

            // Retorna a lista mas em DTO
            return categoriaDto;
        }

        public LerCategoriaDto ObterPorId(int id)
        {
            Categoria categoria = _repository.ObterPorId(id);

            if(categoria == null)
            {
               throw new DomainException("Categoria não encontrada");
            }

            LerCategoriaDto categoriaDto = new LerCategoriaDto
            {
                CategoriaID = categoria.CategoriaID,
                Nome = categoria.Nome
            };

            return categoriaDto;
        }

        private static void ValidarNome(string nome)
        {
            if (string.IsNullOrWhiteSpace(nome))
            {
               throw new DomainException("Nome é obrigatório");
            }
        }

        public void Adicionar(CriarCategoriaDto criarDto)
        {
            ValidarNome(criarDto.Nome);

            if (_repository.NomeExiste(criarDto.Nome))
            {
                throw new DomainException("Categoria já existente");
            }

            Categoria categoria = new Categoria
            {
                Nome = criarDto.Nome
            };
        }

        public void Atualizar(int id, CriarCategoriaDto criaDto)
        {
            ValidarNome(criaDto.Nome);

            Categoria categoriaBanco = _repository.ObterPorId(id);

            if(categoriaBanco == null)
            {
                throw new DomainException("Categoria não encontrada.");
            }

            if(_repository.NomeExiste(criaDto.Nome, categoriaIdAtual: id))
            {
                throw new DomainException("Já existe outra categoria com esse nome");
            }

            categoriaBanco.Nome = criaDto.Nome;
            _repository.Atualizar(categoriaBanco);
        }

        public void Remover(int id)
        {
            Categoria categoriaBanco = _repository.ObterPorId(id);

            if(categoriaBanco == null)
            {
                throw new DomainException("Categoria não encontrada.");
            }

            _repository.Remover(id);
        }
    }
}
