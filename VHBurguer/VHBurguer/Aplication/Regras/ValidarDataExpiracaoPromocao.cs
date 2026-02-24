using VHBurguer.Exceptions;

namespace VHBurguer.Aplication.Regras
{
    public class ValidarDataExpiracaoPromocao
    {
        public static void ValidarDataExpiracao(DateTime dataExpiracao)
        {
            if (dataExpiracao <= DateTime.Now)
            {
                throw new DomainException("Data de expiracao deve ser futura.");
            }
        }
    }
}
