using Microsoft.EntityFrameworkCore;
using VHBurguer.Aplication.Services;
using VHBurguer.Contexts;
using VHBurguer.Interfaces;
using VHBurguer.Repositories;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using VHBurguer.Aplication.Authenticacao;

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

// Produto
builder.Services.AddScoped<IProdutoRepository, ProdutoRepository>();
builder.Services.AddScoped<ProdutoService>();

// JWT
builder.Services.AddScoped<GeradorTokenJwt>();
builder.Services.AddScoped<AutenticacaoService>();

// Categoria
builder.Services.AddScoped<ICategoriaRepository, CategoriaRepository>();
builder.Services.AddScoped<CategoriaService>();

// Promocao
builder.Services.AddScoped<IPromocaoRepository, PromocaoRepository>();
builder.Services.AddScoped<PromocaoService>();

// LogAlteracaoProduto
builder.Services.AddScoped<ILogAlteracaoProdutoRepository, LogAlteracaoProdutoRepository>();
builder.Services.AddScoped<LogAlteracaoProdutoService>();

// Configura o sistema de autenticação da aplicação.
// Aqui estamos dizendo que o tipo de autenticação padrão será JWT Bearer.
// Ou seja: a API vai esperar receber um Token JWT nas requisições.
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)

    // Adiciona o suporte para autenticação usando JWT.
    .AddJwtBearer(options =>
    {
        // Lê a chave secreta definida no appsettings.json.
        // Essa chave é usada para ASSINAR o token quando ele é gerado
        // e também para VALIDAR se o token recebido é verdadeiro.
        var chave = builder.Configuration["Jwt:Key"]!;

        // Quem emitiu o token (ex: nome da sua aplicação).
        // Serve para evitar aceitar tokens de outro sistema.
        var issuer = builder.Configuration["Jwt:Issuer"]!;

        // Para quem o token foi criado (normalmente o frontend ou a própria API).
        // Também ajuda a garantir que o token pertence ao seu sistema.
        var audience = builder.Configuration["Jwt:Audience"]!;

        // Define as regras que serão usadas para validar o token recebido.
        options.TokenValidationParameters = new TokenValidationParameters
        {
            // Verifica se o emissor do token é válido
            // (se bate com o issuer configurado).
            ValidateIssuer = true,

            // Verifica se o destinatário do token é válido
            // (se bate com o audience configurado).
            ValidateAudience = true,

            // Verifica se o token ainda está dentro do prazo de validade.
            // Se já expirou, a requisição será negada.
            ValidateLifetime = true,

            // Verifica se a assinatura do token é válida.
            // Isso garante que o token não foi alterado.
            ValidateIssuerSigningKey = true,

            // Define qual emissor é considerado válido.
            ValidIssuer = issuer,

            // Define qual audience é considerado válido.
            ValidAudience = audience,

            // Define qual chave será usada para validar a assinatura do token.
            // A mesma chave usada na geração do JWT deve estar aqui.
            IssuerSigningKey = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(chave)
            )
        };
    });

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
