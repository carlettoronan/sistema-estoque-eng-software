# Padrões de Projeto Aplicados

De acordo com o levantamento no Backlog (RNF09), a aplicação utiliza os seguintes Padrões de Projeto para garantir escalabilidade:

1. **Factory Method (Criação):** Utilizado na gestão de usuários (US01) para centralizar e instanciar os diferentes perfis (Admin, Gerente, Vendedor), abstraindo a lógica de atribuição de permissões.
2. **Observer (Comportamental):** Utilizado na rotina de vendas (US04). Sempre que uma venda ocorre e o saldo de um produto é atualizado, o sistema "notifica" os observadores para verificar se o item atingiu a quantidade de "Estoque Mínimo", disparando o alerta visual.