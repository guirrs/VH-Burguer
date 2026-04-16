using VHBurguer.Domains;
using VHBurguer.DTOs.CategoriaDto;
using VHBurguer.DTOs.LogProdutoDto;
using VHBurguer.DTOs.ProdutoDto;
using VHBurguer.Exceptions;
using VHBurguer.Interfaces;

namespace VHBurguer.Aplication.Services
{
    public class LogAlteracaoProdutoService
    {
        private readonly ILogAlteracaoProdutoRepository _logRepository;
        

        public LogAlteracaoProdutoService(ILogAlteracaoProdutoRepository logRepository)
        {
            _logRepository = logRepository;
            
        }

        public List<LerLogProdutoDto> Listar()
        {
            List<Log_AlteracaoProduto> logs = _logRepository.Listar();

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
            

            if(!_logRepository.VerficarProduto(produtoId))
            {
                throw new DomainException("Produto não encontrado ou não existente");
            }

            List<Log_AlteracaoProduto> logs = _logRepository.ListarPorProduto(produtoId);

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
