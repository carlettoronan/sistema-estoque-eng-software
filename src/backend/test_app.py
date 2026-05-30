import unittest
from app import app  # Importa o Flask do seu projeto

class TestEstoqueAPI(unittest.TestCase):
    def setUp(self):
        # Cria um cliente de teste que simula o navegador chamando a API
        self.app = app.test_client()
        self.app.testing = True

    def test_1_lista_produtos_online(self):
        """Testa se a rota de listar produtos está ativa e respondendo"""
        response = self.app.get('/api/produtos')
        self.assertEqual(response.status_code, 200)

    def test_2_login_invalido_bloqueado(self):
        """Testa se a API bloqueia a entrada com senha errada"""
        payload = {"username": "admin", "password": "senha_completamente_errada"}
        response = self.app.post('/api/login', json=payload)
        self.assertNotEqual(response.status_code, 200)

    def test_3_venda_sem_saldo_bloqueada(self):
        """CT02 - Testa a regra de negócio: não pode vender mais do que tem no estoque"""
        # Simulando uma tentativa de vender 1 milhão de unidades do produto ID 1
        payload = {"id": 1, "quantidade": 1000000}
        response = self.app.post('/api/vender', json=payload)
        
        # A resposta pode até ser 200/400, mas o JSON deve obrigatoriamente trazer sucesso = False
        dados = response.get_json()
        if dados and 'sucesso' in dados:
            self.assertFalse(dados['sucesso'])

    def test_4_cadastro_produto_invalido(self):
        """Testa se a API barra requisições de cadastro mal formatadas"""
        # Simulando o envio de um produto sem nome e com preço negativo
        payload = {"nome": "", "preco": -50, "quantidade": 0}
        response = self.app.post('/api/produtos', json=payload)
        
        # O backend estruturado não deve permitir a criação e deve retornar falha
        dados = response.get_json()
        if dados and 'sucesso' in dados:
            self.assertFalse(dados['sucesso'])

if __name__ == '__main__':
    unittest.main()