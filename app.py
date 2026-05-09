from flask import Flask

# Inicializa o aplicativo Flask (Camada de Backend)
app = Flask(__name__)

# Rota principal (Endpoint)
@app.route('/')
def home():
    return """
    <h1>Sistema de Gestão de Estoque</h1>
    <p>Status: API Backend rodando com sucesso!</p>
    <p>Arquitetura: Client-Server (Flask + Python)</p>
    """

# Comando para rodar o servidor
if __name__ == '__main__':
    app.run(debug=True)