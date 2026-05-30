const API_URL = "https://carlettoronan.pythonanywhere.com/api";
//const API_URL = "http://127.0.0.1:5000/api";

// Captura os parâmetros passados pela URL da página
const urlParams = new URLSearchParams(window.location.search);
const usuarioNome = urlParams.get('nome');
const usuarioPerfil = urlParams.get('perfil');

// NOVA VARIÁVEL GLOBAL: Guarda os produtos carregados do banco para não precisar fazer requisição toda hora ao pesquisar
let produtosCache = [];

// ==========================================
// 1. REGRAS DE SEGURANÇA E INTERFACE
// ==========================================

// SEGURANÇA: Se não houver dados de usuário na URL, redireciona para o login
if (!usuarioNome || !usuarioPerfil) {
    window.location.replace("index.html");
} else {
    // Renderiza o nome na barra
    document.getElementById("nomeUsuario").innerText = `Olá, ${usuarioNome} (${usuarioPerfil})`;
    
    // Configura o botão de Sair
    document.getElementById("btnSair").addEventListener("click", () => {
        window.location.replace("index.html");
    });

    // REGRA DE NEGÓCIO: Apenas Gerente e Admin cadastram produtos
    if (usuarioPerfil !== "Gerente" && usuarioPerfil !== "Admin") {
        const areaCadastro = document.getElementById("areaCadastro");
        if (areaCadastro) areaCadastro.classList.add("d-none");
    }

    // REGRA DE NEGÓCIO: Apenas o Admin gerencia usuários (US01)
    if (usuarioPerfil === "Admin") {
        const btnGerenciar = document.getElementById("btnGerenciarUsuarios");
        if (btnGerenciar) {
            btnGerenciar.classList.remove("d-none"); // Mostra o botão
            btnGerenciar.addEventListener("click", () => {
                window.location.href = `usuarios.html?nome=${encodeURIComponent(usuarioNome)}&perfil=${encodeURIComponent(usuarioPerfil)}`;
            });
        }
    }

    // Executa a busca de produtos no banco de dados assim que a tela carrega
    carregarProdutos();
}

// ==========================================
// 2. FUNÇÕES DE MANIPULAÇÃO DO ESTOQUE
// ==========================================

async function carregarProdutos() {
    try {
        const response = await fetch(`${API_URL}/produtos`);
        const produtos = await response.json();
        
        // Salva a lista completa no cache para os filtros funcionarem localmente
        produtosCache = produtos; 
        
        // Manda desenhar a tabela na tela
        renderizarTabela(produtosCache);

    } catch (erro) {
        console.error("Erro ao carregar a lista de produtos:", erro);
    }
}

// Função dedicada apenas para construir o HTML da tabela
function renderizarTabela(listaDeProdutos) {
    const tbody = document.getElementById("tabelaProdutos");
    tbody.innerHTML = ""; // Limpa a tabela antes de preencher

    // Se a busca não encontrar nada, exibe mensagem amigável
    if (listaDeProdutos.length === 0) {
        tbody.innerHTML = `<tr><td colspan="5" class="text-center text-muted py-3">Nenhum produto encontrado.</td></tr>`;
        return;
    }

    listaDeProdutos.forEach(p => {
        // Verifica se o item possui uma propriedade estoque_minimo no banco, senão usa 0 para não quebrar a lógica
        const limiteMinimo = p.estoque_minimo || 0; 
        const corLinha = p.quantidade <= limiteMinimo ? "table-danger" : "";
        
        // Botão de 'Vender' (Todos veem)
        let botoesHTML = `<button onclick="vender(${p.id})" class="btn btn-sm btn-primary me-1">Vender</button>`;
        
        // Apenas Gerente e Admin têm acesso aos botões de alteração estrutural
        if (usuarioPerfil === "Gerente" || usuarioPerfil === "Admin") {
            botoesHTML += `
                <button onclick="editarProduto(${p.id}, '${p.nome}', ${p.preco}, ${p.quantidade})" class="btn btn-sm btn-warning me-1">Editar</button>
                <button onclick="excluirProduto(${p.id})" class="btn btn-sm btn-danger">Excluir</button>
            `;
        }

        // Constrói a linha da tabela
        tbody.innerHTML += `
            <tr class="${corLinha}">
                <td>${p.id}</td>
                <td>${p.nome}</td>
                <td>R$ ${p.preco.toFixed(2)}</td>
                <td><strong>${p.quantidade}</strong></td>
                <td>${botoesHTML}</td>
            </tr>
        `;
    });
}

// ==========================================
// 3. EVENTOS DE FILTRO E ORDENAÇÃO (Frontend)
// ==========================================

// Ficam "escutando" a barra de busca e a caixa de seleção
const inputBusca = document.getElementById('buscaProduto');
const selectOrdenacao = document.getElementById('ordenaProduto');

if (inputBusca) inputBusca.addEventListener('input', aplicarFiltros);
if (selectOrdenacao) selectOrdenacao.addEventListener('change', aplicarFiltros);

function aplicarFiltros() {
    const textoBusca = document.getElementById('buscaProduto').value.toLowerCase();
    const ordem = document.getElementById('ordenaProduto').value;

    // A. Filtra pelo texto digitado
    let listaFiltrada = produtosCache.filter(produto => 
        produto.nome.toLowerCase().includes(textoBusca)
    );

    // B. Ordena a lista filtrada
    if (ordem === 'az') {
        listaFiltrada.sort((a, b) => a.nome.localeCompare(b.nome));
    } else if (ordem === 'menorPreco') {
        listaFiltrada.sort((a, b) => a.preco - b.preco);
    } else if (ordem === 'maiorPreco') {
        listaFiltrada.sort((a, b) => b.preco - a.preco);
    }

    // C. Redesenha a tabela com os itens restantes
    renderizarTabela(listaFiltrada);
}

// ==========================================
// 4. EVENTOS DE FORMULÁRIO E AÇÕES (CRUD)
// ==========================================

// Cadastro de Produto
const formProduto = document.getElementById("formProduto");
if (formProduto) {
    formProduto.addEventListener("submit", async (e) => {
        e.preventDefault();
        
        const nome = document.getElementById("prodNome").value;
        const preco = document.getElementById("prodPreco").value;
        const quantidade = document.getElementById("prodQtd").value;

        try {
            const response = await fetch(`${API_URL}/produtos`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ nome, preco, quantidade })
            });
            
            const dados = await response.json();
            
            if (response.ok && dados.sucesso) {
                alert("✅ Produto adicionado com sucesso!");
                formProduto.reset(); 
                carregarProdutos();  
            } else {
                alert("❌ Erro ao adicionar: " + (dados.mensagem || "Erro desconhecido no backend."));
            }
        } catch (erro) {
            console.error("Erro fatal no cadastro:", erro);
            alert("⚠️ Erro de comunicação! Verifique se o servidor Flask está ligado.");
        }
    });
}

// Vender Produto
async function vender(idProduto) {
    const qtdDigitada = prompt("Quantas unidades deseja vender?", "1");
    if (qtdDigitada === null) return;
    
    const quantidade = parseInt(qtdDigitada);
    if (isNaN(quantidade) || quantidade <= 0) {
        alert("⚠️ Por favor, insira uma quantidade válida maior que zero.");
        return;
    }

    try {
        const response = await fetch(`${API_URL}/vender`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id: idProduto, quantidade: quantidade })
        });
        
        const dados = await response.json();
        
        if (response.ok && dados.sucesso) {
            alert("✅ Venda registrada com sucesso!");
            carregarProdutos(); 
        } else {
            alert("❌ O sistema bloqueou a venda:\n" + (dados.mensagem || "Motivo desconhecido."));
        }
    } catch (erro) {
        console.error("Erro fatal ao processar venda:", erro);
        alert("⚠️ Erro de comunicação com o servidor ao tentar vender.");
    }
}

// Excluir Produto (Gerente)
async function excluirProduto(id) {
    if (confirm("Tem certeza que deseja excluir este produto do estoque?")) {
        try {
            const response = await fetch(`${API_URL}/produtos/${id}`, { 
                method: "DELETE" 
            });
            
            if (response.ok) {
                alert("✅ Produto excluído com sucesso!");
                carregarProdutos();
            } else {
                alert("❌ Erro ao excluir o produto no banco de dados.");
            }
        } catch (erro) {
            console.error("Erro fatal ao excluir:", erro);
            alert("⚠️ Erro de comunicação com o servidor ao excluir.");
        }
    }
}

// Editar Produto (Gerente)
async function editarProduto(id, nomeAtual, precoAtual, qtdAtual) {
    const novoNome = prompt("Editar Nome do Produto:", nomeAtual);
    if (novoNome === null) return;
    
    const novoPreco = prompt("Editar Preço (R$):", precoAtual);
    if (novoPreco === null) return;
    
    const novaQtd = prompt("Editar Quantidade em Estoque:", qtdAtual);
    if (novaQtd === null) return;

    try {
        const response = await fetch(`${API_URL}/produtos/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ 
                nome: novoNome, 
                preco: parseFloat(novoPreco), 
                quantidade: parseInt(novaQtd) 
            })
        });
        
        if (response.ok) {
            alert("✅ Produto atualizado com sucesso!");
            carregarProdutos();
        } else {
            alert("❌ Erro ao atualizar o produto.");
        }
    } catch (erro) {
        console.error("Erro fatal ao editar:", erro);
        alert("⚠️ Erro de comunicação com o servidor ao editar.");
    }
}