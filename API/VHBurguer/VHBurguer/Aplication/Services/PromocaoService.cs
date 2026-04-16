using VHBurguer.Aplication.Regras;
using VHBurguer.Domains;
using VHBurguer.DTOs.PromocaodDto_;
using VHBurguer.Exceptions;
using VHBurguer.Interfaces;


namespace VHBurguer.Aplication.Services
{
    public class PromocaoService
    {
        private readonly IPromocaoRepository _repository;

        public PromocaoService(IPromocaoRepository repository)
        {
            _repository = repository;
        }

        public List<LerPromocaoDto> Listar()
        {
            List<Promocao> promocoes = _repository.Listar();

            List<LerPromocaoDto> promocaoDto = promocoes.Select(promocaoAux => new LerPromocaoDto()
            {
                PromocaoId = promocaoAux.PromocaoID,
                Nome = promocaoAux.Nome,
                DataExpiracao = promocaoAux.DataExpiracao,
                StatusPromocao = promocaoAux.StatusPromocao
            }).ToList();
            return promocaoDto;
        }

        public LerPromocaoDto ObterPorId(int id)
        {
            Promocao promocao = _repository.ObterPorId(id);

            if(promocao == null)
            {
                throw new DomainException("Promocao não encontrada.");
            }

            LerPromocaoDto promocaoDto = new LerPromocaoDto
            {
                PromocaoId = promocao.PromocaoID,
                Nome = promocao.Nome,
                DataExpiracao = promocao.DataExpiracao,
                StatusPromocao = promocao.StatusPromocao
            };
            return promocaoDto;
        }

        public static void ValidarNome(string nome)
        {
            if (string.IsNullOrEmpty(nome))
            {
                throw new DomainException("Nome é obrigatório.");
            }
        }

        public void Adicionar(CriarPromocaoDto promocaoDto)
        {
            ValidarNome(promocaoDto.Nome);
            ValidarDataExpiracaoPromocao.ValidarDataExpiracao(promocaoDto.DataExpiracao);

            if (_repository.NomeExiste(promocaoDto.Nome)){
                throw new DomainException("Promocao ja existe");
            }

            Promocao promocao = new Promocao
            {
                Nome = promocaoDto.Nome,
                DataExpiracao = promocaoDto.DataExpiracao, 
                StatusPromocao = promocaoDto.StatusPromocao
            };

            _repository.Adicionar(promocao);
        }

        public void Remover(int id)
        {
            Promocao promacao = _repository.ObterPorId(id);

            if (promacao == null)
            {
                throw new DomainException("Usuario não encontrado.");
            }

            _repository.Remover(id);
        }

        public void Atualizar(int id, CriarPromocaoDto promocaoDto)
        {
            ValidarNome(promocaoDto.Nome);

            Promocao promocaoBanco = _repository.ObterPorId(id);

            if(promocaoBanco == null)
            {
                throw new DomainException("Promocao não encontrada");
            }
            if(_repository.NomeExiste(promocaoDto.Nome, promocaoIdAtual: id))
            {
                throw new DomainException("Já existe outra promoção com esse nome");
            }

            promocaoBanco.Nome = promocaoDto.Nome;
            promocaoBanco.DataExpiracao = promocaoDto.DataExpiracao;
            promocaoBanco.StatusPromocao = promocaoDto.StatusPromocao;

            _repository.Atualizar(promocaoBanco);
        }
    }
}
