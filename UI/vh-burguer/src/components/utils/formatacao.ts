function formatarPreco(valor: number){
    return valor.toLocaleString("pt_BR", {
        style: "currency",
        currency: "BRL"
    })
}