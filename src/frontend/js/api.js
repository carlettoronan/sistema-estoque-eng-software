// Conexão com o servidor Flask
const API_URL = "https://carlettoronan.pythonanywhere.com/api";

const formLogin = document.getElementById("formLogin");
if (formLogin) {
    formLogin.addEventListener("submit", async (e) => {
        e.preventDefault(); // Evita que a página recarregue
        
        const login = document.getElementById("login").value;
        const senha = document.getElementById("senha").value;
        const divErro = document.getElementById("mensagemErro");

        try {
            // Envia os dados para a API do Flask
            const response = await fetch(`${API_URL}/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ login, senha })
            });

            const dados = await response.json();
            
            if (dados.sucesso) {
                const nomeParam = encodeURIComponent(dados.usuario.nome);
                const perfilParam = encodeURIComponent(dados.usuario.perfil);
                
                // Redirecionamento Inteligente baseado no Perfil
                if (dados.usuario.perfil === "Admin") {
                    window.location.href = `usuarios.html?nome=${nomeParam}&perfil=${perfilParam}`;
                } else {
                    window.location.href = `painel.html?nome=${nomeParam}&perfil=${perfilParam}`;
                }
            } else {
                divErro.innerText = dados.mensagem;
                divErro.classList.remove("d-none");
            }
        } catch (error) {
            divErro.innerText = "Erro ao conectar com o servidor.";
            divErro.classList.remove("d-none");
        }
    });
}