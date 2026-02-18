using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using VHBurguer.Aplication.Services;
using VHBurguer.DTOs.ProdutoDto;

namespace VHBurguer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProdutoController : ControllerBase
    {
        public readonly ProdutoService _service;

        public ProdutoController(ProdutoService service)
        {
            _service = service;
        }

        // autenticacao do usuario

        [HttpGet]
        public ActionResult<List<LerProdutoDto>> Listar()
        {
            List<LerProdutoDto> produtos = _service.Listar();
            return Ok(produtos);
        }

        [HttpGet("{id}")]
        public ActionResult<LerProdutoDto> ObterPorId(int id)
        {
            LerProdutoDto produto = _service.ObterPorId(id);

            if (produto == null)
            {
                return NotFound();
            }

            return Ok(produto);
        }
    }
}
