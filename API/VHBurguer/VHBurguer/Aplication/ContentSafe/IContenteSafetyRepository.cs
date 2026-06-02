namespace VHBurguer.Aplication.ContentSafe
{
    public interface IContenteSafetyRepository
    {
        // aprovado -> texto foi aprovado ou não
        // msg -> aviso da recusa do texto
        Task<(bool aprovado, string msg)> ValidarConteudo(string texto);
    }
}
