using FluentAssertions;
using Moq;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using VHBurguer.Aplication.Services;
using VHBurguer.DTOs.CategoriaDto;
using VHBurguer.Exceptions;
using VHBurguer.Interfaces;

namespace VHBurguer.Tests.Services
{
    public class categoriaServiceTests
    {
        // O Fact marca um metodo como sendo unitario
        // é um atributo do xUnit
        [Fact]
        public void Adicionar_DeveGerarErro_QuandoEstiverVazio()
        {
            // Criar objeto falso (mock) do repositorio
            // simula o comportamento do repositorio de caegorias durante o teste
            // não acessa o banco de dados
            Mock<ICategoriaRepository> repositoryMock = new Mock<ICategoriaRepository>();

            // Instancia o servico passando o mock (objeto falso) do repositorio
            CategoriaService service = new CategoriaService(repositoryMock.Object);

            // Cria a DTO com o nome vazio
            CriarCategoriaDto categoriaDto = new CriarCategoriaDto
            {
                Nome = ""
            };

            // Define a acao que sera usada durante o teste
            Action acao = () => service.Adicionar(categoriaDto);

            // Verifica se a ação lança a DomainException com essa mensagem
            acao.Should().Throw<DomainException>().WithMessage("Nome é obrigatório");
        }
        [Fact]
        public void Adicionar_DeveGerarErro_QuandoCategoriaJaExistir()
        {
            Mock<ICategoriaRepository> repositoryMock = new Mock<ICategoriaRepository>();

            // Configura o mock para retornar tru quando o medoto NomeExiste for chamado com o nome "Lanche"
            // Setup serve para configurar o comportamento do método mock
            // returna true, simulando que o lanche existe
            repositoryMock.Setup(categoria => categoria.NomeExiste("Lanche", It.IsAny<int?>()));

            CategoriaService service = new CategoriaService(repositoryMock.Object);

            CriarCategoriaDto categoriaDto = new CriarCategoriaDto
            {
                Nome = ""
            };

            Action acao = () => service.Adicionar(categoriaDto);

            acao.Should().Throw<DomainException>().WithMessage("Categoria já existente");
        }
    }
}
