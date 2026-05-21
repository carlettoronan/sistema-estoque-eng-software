from flask import Flask, request, jsonify
from flask_cors import CORS
from database import DatabaseManager

app = Flask(__name__)
CORS(app) # Permite que o HTML acesse a API

# ==============================================================================
# PADRÃO DE PROJETO: FACTORY METHOD (US01 - Critério 5)
# Centraliza a criação de instâncias de usuários com base no perfil informado.
# ==============================================================================
class Usuario:
    def __init__(self, nome, login, senha, perfil):
        self.nome = nome
        self.login = login
        self.senha = senha
        self.perfil = perfil

class UsuarioAdmin(Usuario):
    pass

class UsuarioGerente(Usuario):
    pass

class UsuarioVendedor(Usuario):
    pass

class UsuarioFactory:
    @staticmethod
    def criar_usuario(nome, login, senha, perfil):
        """Método Fábrica que decide qual instância de usuário gerar"""
        perfil_normalizado = perfil.strip().capitalize()
        
        if perfil_normalizado == "Admin":
            return UsuarioAdmin(nome, login, senha, "Admin")
        elif perfil_normalizado == "Gerente":
            return UsuarioGerente(nome, login, senha, "Gerente")
        elif perfil_normalizado == "Vendedor":
            return UsuarioVendedor(nome, login, senha, "Vendedor")
        else:
            raise ValueError("Perfil de usuário inválido para o sistema.")


@app.route('/api/login', methods=['POST'])
def login():
    dados = request.json
    login = dados.get('login')
    senha = dados.get('senha')
    
    conn = DatabaseManager.get_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT id, nome, perfil FROM usuarios WHERE login = ? AND senha = ? AND ativo = 1", (login, senha))
    usuario = cursor.fetchone()
    
    if usuario:
        return jsonify({"sucesso": True, "usuario": dict(usuario)})
    return jsonify({"sucesso": False, "mensagem": "Login ou senha inválidos"}), 401

@app.route('/api/produtos', methods=['GET'])
def listar_produtos():
    conn = DatabaseManager.get_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM produtos")
    produtos = [dict(row) for row in cursor.fetchall()]
    return jsonify(produtos)

@app.route('/api/produtos', methods=['POST'])
def cadastrar_produto():
    dados = request.json
    conn = DatabaseManager.get_connection()
    cursor = conn.cursor()
    
    # Padroniza o nome: Remove espaços nas pontas e deixa a primeira letra maiúscula (ex: "  pOrtA  " -> "Porta")
    nome_padronizado = dados['nome'].strip().title()
    
    # Verifica se já existe (Case Insensitive não é 100% no SQLite padrão, então comparamos a versão padronizada)
    cursor.execute("SELECT id FROM produtos WHERE nome = ?", (nome_padronizado,))
    if cursor.fetchone():
        return jsonify({"sucesso": False, "mensagem": f"O produto '{nome_padronizado}' já está cadastrado. Edite-o para atualizar o estoque."}), 400

    try:
        cursor.execute("INSERT INTO produtos (nome, preco, quantidade) VALUES (?, ?, ?)", 
                       (nome_padronizado, float(dados['preco']), int(dados['quantidade'])))
        conn.commit()
        return jsonify({"sucesso": True, "mensagem": "Produto cadastrado!"})
    except Exception as e:
        return jsonify({"sucesso": False, "mensagem": str(e)}), 400

@app.route('/api/vender', methods=['POST'])
def vender_produto():
    dados = request.json
    produto_id = dados.get('id')
    qtd_venda = int(dados.get('quantidade'))
    
    conn = DatabaseManager.get_connection()
    cursor = conn.cursor()
    
    cursor.execute("SELECT quantidade, nome FROM produtos WHERE id = ?", (produto_id,))
    produto = cursor.fetchone()
    
    if not produto:
        return jsonify({"sucesso": False, "mensagem": "Produto não encontrado"}), 404
        
    if produto['quantidade'] < qtd_venda:
        return jsonify({"sucesso": False, "mensagem": f"Erro: Estoque insuficiente (Apenas {produto['quantidade']} disponíveis)."}), 400
        
    cursor.execute("UPDATE produtos SET quantidade = quantidade - ? WHERE id = ?", (qtd_venda, produto_id))
    conn.commit()
    
    return jsonify({"sucesso": True, "mensagem": "Venda registrada! Estoque atualizado."})

# ==========================================
# EXCLUIR E EDITAR (CRUD COMPLETO)
# ==========================================

@app.route('/api/produtos/<int:id>', methods=['DELETE'])
def excluir_produto(id):
    conn = DatabaseManager.get_connection()
    cursor = conn.cursor()
    cursor.execute("DELETE FROM produtos WHERE id = ?", (id,))
    conn.commit()
    return jsonify({"sucesso": True, "mensagem": "Produto excluído!"})

@app.route('/api/produtos/<int:id>', methods=['PUT'])
def editar_produto(id):
    dados = request.json
    conn = DatabaseManager.get_connection()
    cursor = conn.cursor()
    try:
        cursor.execute("""
            UPDATE produtos 
            SET nome = ?, preco = ?, quantidade = ? 
            WHERE id = ?
        """, (dados['nome'], float(dados['preco']), int(dados['quantidade']), id))
        conn.commit()
        return jsonify({"sucesso": True, "mensagem": "Produto atualizado com sucesso!"})
    except Exception as e:
        return jsonify({"sucesso": False, "mensagem": str(e)}), 400

# ==============================================================================
# ROTAS EXCLUSIVAS DO ADMINISTRADOR (US01 - Critérios 1, 2 e 3)
# ==============================================================================

@app.route('/api/usuarios', methods=['GET'])
def listar_usuarios():
    """Retorna todos os usuários cadastrados no sistema"""
    conn = DatabaseManager.get_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT id, nome, login, perfil, ativo FROM usuarios")
    usuarios = [dict(row) for row in cursor.fetchall()]
    return jsonify(usuarios)

@app.route('/api/usuarios', methods=['POST'])
def cadastrar_usuario():
    """Cadastra um novo usuário utilizando o Factory Method"""
    dados = request.json
    conn = DatabaseManager.get_connection()
    cursor = conn.cursor()
    
    # Verifica se o login já existe para evitar duplicidade
    cursor.execute("SELECT id FROM usuarios WHERE login = ?", (dados['login'].strip(),))
    if cursor.fetchone():
        return jsonify({"sucesso": False, "mensagem": "Este login já está sendo utilizado."}), 400

    try:
        # Uso do Factory Method para instanciar a entidade antes de salvar no banco
        novo_usuario = UsuarioFactory.criar_usuario(
            dados['nome'], 
            dados['login'].strip(), 
            dados['senha'], 
            dados['perfil']
        )
        
        cursor.execute(
            "INSERT INTO usuarios (nome, login, senha, perfil) VALUES (?, ?, ?, ?)",
            (novo_usuario.nome, novo_usuario.login, novo_usuario.senha, novo_usuario.perfil)
        )
        conn.commit()
        return jsonify({"sucesso": True, "mensagem": "Usuário cadastrado com sucesso!"})
    except Exception as e:
        return jsonify({"sucesso": False, "mensagem": str(e)}), 400

@app.route('/api/usuarios/<int:id>/toggle', methods=['PUT'])
def alternar_status_usuario(id):
    """Ativa ou desativa temporariamente um usuário (Exclusão Lógica - Critério 3)"""
    conn = DatabaseManager.get_connection()
    cursor = conn.cursor()
    
    # Inverte o estado atual do campo 'ativo' (se for 1 vira 0, se for 0 vira 1)
    cursor.execute("UPDATE usuarios SET ativo = 1 - ativo WHERE id = ?", (id,))
    conn.commit()
    return jsonify({"sucesso": True, "mensagem": "Status do usuário atualizado!"})

@app.route('/api/usuarios/<int:id>', methods=['PUT'])
def editar_usuario(id):
    """Edita todos os dados de um usuário"""
    dados = request.json
    conn = DatabaseManager.get_connection()
    cursor = conn.cursor()
    
    # Verifica se o novo login já pertence a OUTRO usuário
    cursor.execute("SELECT id FROM usuarios WHERE login = ? AND id != ?", (dados['login'].strip(), id))
    if cursor.fetchone():
        return jsonify({"sucesso": False, "mensagem": "Este login já está sendo utilizado por outra pessoa."}), 400
    
    try:
        cursor.execute("""
            UPDATE usuarios 
            SET nome = ?, login = ?, senha = ?, perfil = ?
            WHERE id = ?
        """, (dados['nome'], dados['login'].strip(), dados['senha'], dados['perfil'], id))
        conn.commit()
        return jsonify({"sucesso": True, "mensagem": "Usuário atualizado com sucesso!"})
    except Exception as e:
        return jsonify({"sucesso": False, "mensagem": str(e)}), 400

if __name__ == '__main__':
    app.run(debug=True, port=5000)