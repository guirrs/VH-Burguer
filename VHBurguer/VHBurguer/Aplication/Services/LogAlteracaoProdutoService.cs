using VHBurguer.Domains;
using VHBurguer.DTOs.CategoriaDto;
using VHBurguer.DTOs.LogProdutoDto;
using VHBurguer.Interfaces;

namespace VHBurguer.Aplication.Services
{
    public class LogAlteracaoProdutoService
    {
        private readonly ILogAlteracaoProdutoRepository _repository;

        public LogAlteracaoProdutoService(ILogAlteracaoProdutoRepository repository)
        {
            _repository = repository;
        }

        public List<LerLogProdutoDto> Listar()
        {
            List<Log_AlteracaoProduto> logs = _repository.Listar();

            List<LerLogProdutoDto> listaLogProduto = logs.Select(log => new LerLogProdutoDto
            {
                LogID = log.Log_AlteracaoProduto1,
                ProdutoID = log.ProdutoID,
                NomeAnterior = log.NomeAnterior,
                PrecoAnterior = log.ValorAnterior,
                DataAlteracao = log.DataAlteracao,
            }).ToList();
            return listaLogProduto;
        }

        public List<LerLogProdutoDto> ListarPorPrduto(int produtoId)
        {
            List<Log_AlteracaoProduto> logs = _repository.ListarPorProduto(produtoId);

            List<LerLogProdutoDto> listaLogProduto = logs.Select(log => new LerLogProdutoDto
            {
                LogID = log.Log_AlteracaoProduto1,
                ProdutoID = log.ProdutoID,
                NomeAnterior = log.NomeAnterior,
                PrecoAnterior = log.ValorAnterior,
                DataAlteracao = log.DataAlteracao,
            }).ToList();
            return listaLogProduto;
        }
    }
}
