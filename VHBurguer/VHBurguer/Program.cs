using Microsoft.EntityFrameworkCore;
using VHBurguer.Applications.Services;
using VHBurguer.Contexts;
using VHBurguer.Interfaces;
using VHBurguer.Repositories;
using VHBurguer.Aplication.Services;
using VHBurguer.Contexts;
using VHBurguer.Interfaces;
using VHBurguer.Repositories;

var builder = WebApplication.CreateBuilder(args);

// Explicacoes das pastas:
// DTOs(Data Transfer Objects): Vai conter classes que serao usadas em diversas camadas
// Aplications: Contera a logica principal do projeto
//Service: Contem as regras de négócios
// Repositories: Contem as implementacoes da interface: NÃO TEM REGRA DE NEGOCIO
// Context: Contem a logica do banco de dados
// Controller: Contem as requisicoes do HTTP

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// chama nossa conexão com o banco de dados
builder.Services.AddDbContext<VH_BurguerContext>(options => options.UseSqlServer(builder.Configuration.GetConnectionString("Default")));

// Usuario
// Esse redirecionamento é uma camada de seguranca
builder.Services.AddScoped<IUsuarioRepository, UsuarioRepository>();
// Para poder usar os metodos da service
builder.Services.AddScoped<UsuarioService>();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
