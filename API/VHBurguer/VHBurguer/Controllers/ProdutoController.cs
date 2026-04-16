using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using VHBurguer.Aplication.Services;
using VHBurguer.DTOs.ProdutoDto;
using VHBurguer.Exceptions;

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
        private int ObterUsarioIdLogado()
        {
            // busca no token/claims o valor armazenado como id do usario
            // ClaimTypes.NameIdentifier geralmente guarda o ID do usario no JWT
            string? idTexto = User.FindFirstValue(ClaimTypes.NameIdentifier);

            if(string.IsNullOrWhiteSpace(idTexto))
            {
                throw new DomainException("Usuario não autenticado");
            }

            // Converte o ID que veio texto para inteiro
            // 
            return int.Parse(idTexto);
        }

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

        // Get -> api/produto/5/imagem
        [HttpGet("{id}/imagem")]

        public ActionResult ObterImagem(int id)
        {
            try
            {
                var imagem = _service.ObterImagem(id);

                // Retorna o arquivo para o navegador
                // "image/jpeg" informa o tipo da imagem (MIME type)
                // O navegador entende que deve rederizar como imagem
                return File(imagem, "imagem/jpeg");
            }

            catch (DomainException ex)
            {
                return NotFound(ex.Message);
            }
        }
        [HttpPost]
        // indica que recebe dados no formato Multipart/from-data
        // necessario quando enviamos arquivos (ex: imagem do produto)
        [Consumes("Multipart/form-data")]
        [Authorize] // exige login para alterar produtos
        // [FromForm] -> diz que os dados vem do formulario da requisicao multipart/from-data
        public ActionResult Adicionar([FromForm] CriarProdutoDto produtoDto)
        {
            try
            {
                int usuarioId = ObterUsarioIdLogado();

                _service.Adicionar(produtoDto, usuarioId);

                return StatusCode(201);
            }
            catch (DomainException ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpPut("{id}")]
        [Consumes("Multipart/form-data")]
        [Authorize]
        public ActionResult Atualizar(int id, [FromForm] AtualizarProdutoDto produtoDto)
        {
            try
            {
                _service.Atualizar(id, produtoDto);
                return NoContent();
            }
            catch (DomainException ex)
            {
                return BadRequest(ex.Message);
            }
        }

        [HttpDelete("{id}")]
        [Authorize]
        public ActionResult Remover(int id)
        {
            try
            {
                _service.Remover(id);
                return NoContent();
            }

            catch(DomainException ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
