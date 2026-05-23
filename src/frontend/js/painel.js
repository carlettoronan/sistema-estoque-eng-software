const API_URL = "https://carlettoronan.pythonanywhere.com/api";

// Captura os parâmetros passados pela URL da página
const urlParams = new URLSearchParams(window.location.search);
const usuarioNome = urlParams.get('nome');
const usuarioPerfil = urlParams.get('perfil');

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

    // Executa a busca de produtos no banco de dados
    carregarProdutos();
}

// ==========================================
// 2. FUNÇÕES DE MANIPULAÇÃO DO ESTOQUE
// ==========================================

async function carregarProdutos() {
    try {
        const response = await fetch(`${API_URL}/produtos`);
        const produtos = await response.json();
        const tbody = document.getElementById("tabelaProdutos");
        tbody.innerHTML = ""; 

        produtos.forEach(p => {
            const corLinha = p.quantidade <= p.estoque_minimo ? "table-danger" : "";
            
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
    } catch (erro) {
        console.error("Erro ao carregar a lista de produtos:", erro);
    }
}

// ==========================================
// 3. EVENTOS DE FORMULÁRIO E AÇÕES
// ==========================================

// Cadastro de Produto
const formProduto = document.getElementById("formProduto");
if (formProduto) {
    formProduto.addEventListener("submit", async (e) => {
        e.preventDefault();
        const nome = document.getElementById("prodNome").value;
        const preco = document.getElementById("prodPreco").value;
        const quantidade = document.getElementById("prodQtd").value;

        // Envia o novo produto para o Backend em formato JSON
        const response = await fetch(`${API_URL}/produtos`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ nome, preco, quantidade })
        });
        
        const dados = await response.json();
        
        if (dados.sucesso) {
            formProduto.reset(); // Limpa os campos só se der certo
            carregarProdutos();  // Atualiza a tabela
        } else {
            alert(dados.mensagem); // Alerta erro (Ex: Produto duplicado)
        }
    });
}

// Vender Produto
async function vender(idProduto) {
    const qtdDigitada = prompt("Quantas unidades deseja vender?", "1");
    if (qtdDigitada === null) return;
    
    const quantidade = parseInt(qtdDigitada);
    if (isNaN(quantidade) || quantidade <= 0) {
        alert("Por favor, insira uma quantidade válida maior que zero.");
        return;
    }

    try {
        const response = await fetch(`${API_URL}/vender`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id: idProduto, quantidade: quantidade })
        });
        
        const dados = await response.json();
        if (dados.sucesso) {
            carregarProdutos();
        } else {
            alert(dados.mensagem);
        }
    } catch (erro) {
        console.error("Erro ao processar venda:", erro);
    }
}

// Excluir Produto (Gerente)
async function excluirProduto(id) {
    if (confirm("Tem certeza que deseja excluir este produto do estoque?")) {
        await fetch(`${API_URL}/produtos/${id}`, { 
            method: "DELETE" 
        });
        carregarProdutos();
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

    await fetch(`${API_URL}/produtos/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
            nome: novoNome, 
            preco: parseFloat(novoPreco), 
            quantidade: parseInt(novaQtd) 
        })
    });
    
    carregarProdutos();
}