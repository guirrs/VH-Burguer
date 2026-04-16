using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using VHBurguer.Aplication.Services;
using VHBurguer.Exceptions;

namespace VHBurguer.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class LogProdutoController : ControllerBase
    {
        private readonly LogAlteracaoProdutoService _service;

        public LogProdutoController(LogAlteracaoProdutoService service)
        {
            _service = service;
        }

        [HttpGet]
        public ActionResult Listar()
        {
            return Ok(_service.Listar());
        }

        [HttpGet("produto/{id}")]
        public ActionResult ListarProduto(int id)
        {
            try
            {
                return Ok(_service.ListarPorPrduto(id));
            }
            catch(DomainException ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
