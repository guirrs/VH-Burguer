// validar s existe cardapi na tela
describe("Tela Home", () =>{
    //definit cenário de testes
    it("deve carregar a tela home e mostrar produtos", () =>{
        cy.visit("http://localhost:3000/home");
        // verifica se cardapio esta na tela
        cy.contains("Cardapio").should("be.visible");
    })
})

describe("Cadastro de produto", () => {
    //precisa fazer login antes de cadastrar produto
    beforeEach(() =>{
        cy.visit("http://localhost:3000/login")

        cy.get("input[type='email']")
        .type("carlos@vhburguer.com");

        cy.get("inout[type='password']")
            .type("admin@123");

        cy.contains("Entrar").click();
    })

    it("deve mostrar erro ao tentar cadastrar sem preencher os campos", () =>{
        cy.visit("http://localhost:3000/produto")

        cy.get("button"). contains("Salvar").click();

        cy.get("Nome é obrigatorio.").should("be.visible");
    })

    // testando cadastro de produto
describe("Cadastro de produto", () => {
    // precisa fazer login antes de cadastrar o produto
    beforeEach(() => {
        cy.visit("http://localhost:3000/login");

        cy.get("input[type='email']")
            .type("4@gmail")
        
        cy.get("input[type='password']")
            .type("string")

        cy.contains("Entrar").click();
    })

    it("deve cadastrar um produto com dados válidos", () => {
        cy.visit("http://localhost:3000/produto");

        cy.get("input[name='nome']").type("X-Bacon");
        cy.get("textarea[name='descricao']").type("Lanche com bacon e queijo");
        cy.get("input[name='preco']").type("25");

        cy.get("select[name='categoriaIds']")
            .select("Vegetariano");

        cy.get("input[type='file']")
            .selectFile("cypress/fixtures/produto.jpg");

        cy.contains("button", "Salvar").click();

        cy.contains("Produto cadastrado!")
            .should("be.visible");

        cy.visit("http://localhost:3000/home");
        cy.contains("X-Bacon")
            .should("be.visible");
    });
})
})