const API_URL = "https://carlettoronan.pythonanywhere.com/api";
//const API_URL = "http://127.0.0.1:5000/api";

const urlParams = new URLSearchParams(window.location.search);
const usuarioNome = urlParams.get('nome');
const usuarioPerfil = urlParams.get('perfil');

// TRAVA DE SEGURANÇA (US01 - Critério 4): Se não for Admin, expulsa sumariamente da tela
if (usuarioPerfil !== "Admin") {
    window.location.replace("index.html");
} else {
    // Configura o botão voltar mantendo a sessão na URL
    document.getElementById("btnVoltar").addEventListener("click", () => {
        window.location.href = `painel.html?nome=${encodeURIComponent(usuarioNome)}&perfil=${encodeURIComponent(usuarioPerfil)}`;
    });

    carregarUsuarios();
}

// Carrega a listagem de funcionários cadastrados no banco
async function carregarUsuarios() {
    try {
        const response = await fetch(`${API_URL}/usuarios`);
        const usuarios = await response.json();
        const tbody = document.getElementById("tabelaUsuarios");
        tbody.innerHTML = "";

        usuarios.forEach(u => {
            const statusTexto = u.ativo === 1 ? "Ativo" : "Inativo";
            const statusCor = u.ativo === 1 ? "badge bg-success" : "badge bg-danger";
            const botaoStatusTexto = u.ativo === 1 ? "Desativar" : "Ativar";
            const botaoStatusCor = u.ativo === 1 ? "btn-danger" : "btn-success";

            tbody.innerHTML += `
                <tr>
                    <td>${u.id}</td>
                    <td>${u.nome}</td>
                    <td>${u.login}</td>
                    <td>${u.perfil}</td>
                    <td><span class="${statusCor}">${statusTexto}</span></td>
                    <td>
                        <button onclick="alterarStatus(${u.id})" class="btn btn-sm ${botaoStatusCor} me-1">${botaoStatusTexto}</button>
                        <button onclick="editarUsuario(${u.id}, '${u.nome}', '${u.login}', '${u.perfil}')" class="btn btn-sm btn-warning">Editar</button>
                    </td>
                </tr>
            `;
        });
    } catch (erro) {
        console.error("Erro ao processar lista de usuários:", erro);
    }
}

// Envio do formulário de novo usuário para o Factory Method do Backend
document.getElementById("formUsuario").addEventListener("submit", async (e) => {
    e.preventDefault();
    const nome = document.getElementById("usrNome").value;
    const login = document.getElementById("usrLogin").value;
    const senha = document.getElementById("usrSenha").value;
    const perfil = document.getElementById("usrPerfil").value;

    const response = await fetch(`${API_URL}/usuarios`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nome, login, senha, perfil })
    });

    const dados = await response.json();
    if (dados.sucesso) {
        document.getElementById("formUsuario").reset();
        carregarUsuarios(); // Atualiza a tabela imediatamente
    } else {
        alert(dados.mensagem);
    }
});

// Executa a exclusão lógica / desativação (US01 - Critério 3)
async function alterarStatus(id) {
    await fetch(`${API_URL}/usuarios/${id}/toggle`, { method: "PUT" });
    carregarUsuarios();
}

// Edita todos os dados de um usuário via prompts
async function editarUsuario(id, nomeAtual, loginAtual, perfilAtual) {
    const novoNome = prompt("Editar Nome:", nomeAtual);
    if (novoNome === null || novoNome.trim() === "") return;

    const novoLogin = prompt("Editar Login:", loginAtual);
    if (novoLogin === null || novoLogin.trim() === "") return;
    
    const novaSenha = prompt("Digite a Nova Senha:");
    if (novaSenha === null || novaSenha.trim() === "") return;

    const novoPerfil = prompt("Editar Perfil (Admin, Gerente ou Vendedor):", perfilAtual);
    if (novoPerfil === null) return;
    
    // Valida se o perfil digitado existe
    const perfilFormatado = novoPerfil.trim().charAt(0).toUpperCase() + novoPerfil.trim().slice(1).toLowerCase();
    if (!["Admin", "Gerente", "Vendedor"].includes(perfilFormatado)) {
        alert("Perfil inválido! Escolha entre Admin, Gerente ou Vendedor.");
        return;
    }

    const response = await fetch(`${API_URL}/usuarios/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
            nome: novoNome, 
            login: novoLogin, 
            senha: novaSenha, 
            perfil: perfilFormatado 
        })
    });

    const dados = await response.json();
    if (dados.sucesso) {
        carregarUsuarios(); // Atualiza a tabela na hora
    } else {
        alert(dados.mensagem);
    }
}