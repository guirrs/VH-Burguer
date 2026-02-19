using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using VHBurguer.Domains;
using VHBurguer.Exceptions;

namespace VHBurguer.Aplication.Authenticacao
{
    public class GeradorTokenJwt
    {
        private readonly IConfiguration _config;

        // Recebe as configuracoes do appsettings.json
        public GeradorTokenJwt(IConfiguration config)
        {
            _config = config;
        }

        public string GerarToken(Usuario usuario)
        {
            // Key -> chave secreta para assinar o token
            // garante que o token nao foi alterado
            var chave = _config["Jwt:Key"];

            // ISSUER -> quem gerou o token (nome da API / sistema que gerou)
            // a API valida se o token veio do emissor correto.
            var issuer = _config["Jwt:Issuer"];

            // AUDIENCE -> oara quem o yoken foi criado
            // define qual sistema pode usar o token
            var audience = _config["Jwt:Audience"];

            // TEMPO DE EXPIRACAO -> Define quantos minutos o token sera valido
            // depois disso, o usuario precisa logar novamente
            var expiraEmMinutos = int.Parse(_config["Jwt:ExpiraEmMinutos"]!);

            // Converte a chave para bytes (necessario para criar a assinatura)
            var keyBytes = Encoding.UTF8.GetBytes(chave);

            //
            if(keyBytes.Length < 32)
            {
                throw new DomainException("Jwt: Key precisa precisa pelo menos ter 32 caracteres");
            }

            // Cria uma chave de seguranca usada para assinar o token
            var securityKey = new SymmetricSecurityKey(keyBytes);

            // Define o algoritmo de assinatura do token
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);

            // CLAINS -> Informacoes do usuario que vai dentro do token
            // essas informacoes podem ser recuperadas na API para identificar quem esta logado
            var clains = new List<Claim>
            {
                // Id do usario para saber quem fez a acao
                new Claim(ClaimTypes.NameIdentifier, usuario.UsuarioID.ToString()),

                // Nome do usario
                new Claim(ClaimTypes.Name, usuario.Nome),

                // Email do usuario
                new Claim(ClaimTypes.Email, usuario.Email)
            };

            // Criqa o token Jwt com todas as informações
            var token = new JwtSecurityToken(
                issuer: issuer,                                         // quem gerou o token
                audience: audience,                                     // quem pode usar o token
                claims: clains,                                         // dados do usario
                expires: DateTime.Now.AddMinutes(expiraEmMinutos),      // validade token
                signingCredentials: credentials                         // Assinatura de seguranca
                );

            // Converte o token para string e essa string é enviada para o cliente
            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
