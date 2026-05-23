import sqlite3

class DatabaseManager:
    _instance = None

    @classmethod
    def get_connection(cls):
        """Garante uma única conexão com o banco (Singleton)"""
        if cls._instance is None:
            cls._instance = sqlite3.connect("estoque.db", check_same_thread=False)
            cls._instance.row_factory = sqlite3.Row
            cls.inicializar_tabelas()
        return cls._instance

    @classmethod
    def inicializar_tabelas(cls):
        """Cria as tabelas e insere usuários de teste"""
        cursor = cls._instance.cursor()
        
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS usuarios (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                nome TEXT NOT NULL,
                login TEXT UNIQUE NOT NULL,
                senha TEXT NOT NULL,
                perfil TEXT NOT NULL,
                ativo INTEGER DEFAULT 1
            )
        """)
        
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS produtos (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                nome TEXT NOT NULL,
                preco REAL NOT NULL,
                quantidade INTEGER NOT NULL,
                estoque_minimo INTEGER DEFAULT 5
            )
        """)
        
        # Insere usuários padrão de acordo com as Histórias de Usuário
        cursor.execute("SELECT COUNT(*) FROM usuarios")
        if cursor.fetchone()[0] == 0:
            # Administrador - Gestão de Usuários (US01)
            cursor.execute("INSERT INTO usuarios (nome, login, senha, perfil) VALUES ('Administrador', 'admin', 'admin123', 'Admin')")
            
            # Gerente - Gestão de Produtos (US02)
            cursor.execute("INSERT INTO usuarios (nome, login, senha, perfil) VALUES ('Gerente de Estoque', 'gerente', 'gerente123', 'Gerente')")
            
            # Vendedor - Registro de Vendas (US04)
            cursor.execute("INSERT INTO usuarios (nome, login, senha, perfil) VALUES ('Vendedor Padrão', 'vendedor', 'vendedor123', 'Vendedor')")
            
        cls._instance.commit()

# Inicializa o banco ao rodar
DatabaseManager.get_connection()