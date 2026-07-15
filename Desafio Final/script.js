const CHAVE_CLIENTES = "jolie_clientes";
const CHAVE_CARRINHO = "jolie_carrinho";
const CHAVE_TUTOR_PENDENTE = "jolie_tutor_pendente";


function obterClientes() {
    const dados = localStorage.getItem(CHAVE_CLIENTES);
    return dados ? JSON.parse(dados) : [];
}

function salvarClientes(lista) {
    localStorage.setItem(CHAVE_CLIENTES, JSON.stringify(lista));
}

function obterCarrinho() {
    const dados = localStorage.getItem(CHAVE_CARRINHO);
    return dados ? JSON.parse(dados) : [];
}

function salvarCarrinho(lista) {
    localStorage.setItem(CHAVE_CARRINHO, JSON.stringify(lista));
}

function formatarData(dataISO) {
    if (!dataISO) return "-";
    const [ano, mes, dia] = dataISO.split("-");
    return `${dia}/${mes}/${ano}`;
}

function inicializarCadastroTutor() {
    const form = document.getElementById("form-cadastro");
    if (!form) return;

    form.addEventListener("submit", function (evento) {
        evento.preventDefault();

        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }
        const tutorPendente = {
            nome: document.getElementById("nome").value.trim(),
            telefone: document.getElementById("telefone").value.trim(),
            endereco: document.getElementById("endereco").value.trim()
        };

        sessionStorage.setItem(CHAVE_TUTOR_PENDENTE, JSON.stringify(tutorPendente));

        window.location.href = "cadastro-pet.html";
    });
}

function inicializarCadastroPet() {
    const form = document.getElementById("form-cadastro-pet");
    if (!form) return;

    const msgSucesso = document.getElementById("msg-sucesso");

    const tutorSalvo = sessionStorage.getItem(CHAVE_TUTOR_PENDENTE);
    if (!tutorSalvo) {
        window.location.href = "index.html#cadastro-login";
        return;
    }

    const tutorPendente = JSON.parse(tutorSalvo);

    form.addEventListener("submit", function (evento) {
        evento.preventDefault();

        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        const novoCliente = {
            id: Date.now(),
            nome: tutorPendente.nome,
            telefone: tutorPendente.telefone,
            endereco: tutorPendente.endereco,
            nomeAnimal: document.getElementById("nomeAnimal").value.trim(),
            idadeAnimal: document.getElementById("idadeAnimal").value,
            porte: document.getElementById("porte").value,
            data: document.getElementById("data").value
        };

        const clientes = obterClientes();
        clientes.push(novoCliente);
        salvarClientes(clientes);

        sessionStorage.removeItem(CHAVE_TUTOR_PENDENTE);
        form.reset();

        if (msgSucesso) {
            msgSucesso.classList.add("ativo");
            setTimeout(() => {
                window.location.href = "clientes.html";
            }, 1500);
        }
    });
}

function inicializarListagemClientes() {
    const grid = document.getElementById("grid-clientes");
    if (!grid) return;

    const vazio = document.getElementById("vazio-clientes");
    const overlay = document.getElementById("modal-overlay");
    const modalNomeAnimal = document.getElementById("modal-nome-animal");
    const modalCorpo = document.getElementById("modal-corpo");
    const btnFechar = document.getElementById("modal-fechar");

    const clientes = obterClientes();

    if (clientes.length === 0) {
        vazio.classList.add("ativo");
        return;
    }

    clientes
        .slice()
        .reverse()
        .forEach((cliente) => {
            const card = document.createElement("div");
            card.className = "card-cliente";
            card.innerHTML = `
                <div class="icone-pata">🐾</div>
                <h3>${cliente.nomeAnimal}</h3>
                <p>${formatarData(cliente.data)}</p>
            `;

            card.addEventListener("click", () => abrirModal(cliente));
            grid.appendChild(card);
        });

    function abrirModal(cliente) {
        modalNomeAnimal.textContent = cliente.nomeAnimal;
        modalCorpo.innerHTML = `
            <p><strong>Tutor:</strong> ${cliente.nome}</p>
            <p><strong>Telefone / WhatsApp:</strong> ${cliente.telefone}</p>
            <p><strong>Endereço:</strong> ${cliente.endereco}</p>
            <p><strong>Idade do animal:</strong> ${cliente.idadeAnimal} ano(s)</p>
            <p><strong>Porte:</strong> ${cliente.porte}</p>
            <p><strong>Data do atendimento:</strong> ${formatarData(cliente.data)}</p>
        `;
        overlay.classList.add("ativo");
    }

    function fecharModal() {
        overlay.classList.remove("ativo");
    }

    btnFechar.addEventListener("click", fecharModal);

    overlay.addEventListener("click", (evento) => {
        if (evento.target === overlay) fecharModal();
    });

    document.addEventListener("keydown", (evento) => {
        if (evento.key === "Escape") fecharModal();
    });
}


const PRODUTOS = [
    { id: 1, nome: "Ração Cães 10,1kg", preco: 99.90, img: "https://superrissul.vtexassets.com/arquivos/ids/1060583-1600-auto?v=639195631486430000&width=1600&height=auto&aspect=true" },
    { id: 2, nome: "Ração Gatos Castrados 10.1kg", preco: 137.76, img: "https://images.petz.com.br/fotos/20001320000553_1732641175203.jpg" },
    { id: 3, nome: "Brinquedo Mordedor", preco: 59.90, img: "https://images.petz.com.br/fotos/1664479135165.jpg" },
    { id: 4, nome: "Coleira Ajustável", preco: 39.9, img: "https://http2.mlstatic.com/D_NQ_NP_2X_758048-MLB97276333856_112025-F.webp" },
    { id: 5, nome: "Shampoo Neutro Pet", preco: 32.0, img: "https://cobasi.vteximg.com.br/arquivos/ids/1090094/600652-SHAMPOO-NEUTRO-PET-CLEAN-700-ML-copiar.webp?v=638975336299330000" },
    { id: 6, nome: "Caixa de Transporte Médio Porte", preco: 32.0, img: "https://http2.mlstatic.com/D_NQ_NP_2X_936300-MLA99841073237_112025-F.webp" },
    { id: 7, nome: "Arranhador para Gatos", preco: 150.9, img: "https://www.petlove.com.br/images/products/321312/product/31027547140-1.jpg?1771390142" },
    { id: 8, nome: "Cama Pet Grande", preco: 119.9, img: "https://images.tcdn.com.br/img/img_prod/748584/cama_pet_para_cachorro_coroa_azul_tamanho_g_70x70_27_7_b095ed64afa77964fb553c5735b481a9.jpg" }
];

function formatarPreco(valor) {
    return valor.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

function inicializarLoja() {
    const grid = document.getElementById("grid-produtos");
    if (!grid) return;

    const toast = document.getElementById("toast");

    PRODUTOS.forEach((produto) => {
        const card = document.createElement("div");
        card.className = "card-produto";
        card.innerHTML = `
            <img src="${produto.img}" alt="${produto.nome}">
            <div class="info-produto">
                <h3>${produto.nome}</h3>
                <p class="preco">${formatarPreco(produto.preco)}</p>
            </div>
        `;

        card.addEventListener("click", () => adicionarAoCarrinho(produto, toast));
        grid.appendChild(card);
    });
}

function adicionarAoCarrinho(produto, toast) {
    const carrinho = obterCarrinho();
    carrinho.push({ ...produto, adicionadoEm: Date.now() });
    salvarCarrinho(carrinho);

    if (!toast) return;
    toast.textContent = `"${produto.nome}" adicionado ao carrinho!`;
    toast.classList.add("ativo");
    setTimeout(() => toast.classList.remove("ativo"), 2500);
}

document.addEventListener("DOMContentLoaded", () => {
    inicializarCadastroTutor();
    inicializarCadastroPet();
    inicializarListagemClientes();
    inicializarLoja();
});