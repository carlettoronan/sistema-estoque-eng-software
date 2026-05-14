# Sprint 4 – Princípios de projeto e decisões de solução

## 1. Objetivo
Definir e consolidar a arquitetura do Sistema de Gestão de Estoque, justificando a migração do escopo inicial Web para uma solução **Desktop Nativa (Client-Side)** baseada no padrão MVC.

## 2. Decomposição da Solução (Arquitetura MVC Desktop)
Para garantir desempenho e estabilidade em terminais de Ponto de Venda (PDV), o sistema foi decomposto no padrão MVC (Model-View-Controller):

1. **View (Interface de Usuário - Tkinter):**
   * **Responsabilidade:** Renderizar as janelas modulares, capturar eventos de mouse/teclado e aplicar restrições visuais baseadas no perfil do usuário logado.
   * **Componentes Principais:** `MainWindow` (com renderização dinâmica de permissões), `VendaWindow`, `CaixaWindow`.

2. **Controller (Lógica de Negócio):**
   * **Responsabilidade:** Intermediar a View e o Model, aplicando as regras de negócio (ex: validar saldo de estoque antes de autorizar uma venda) e orquestrando as queries SQL.
   * **Componentes Principais:** `ProdutoController`, `CaixaController`, `VendaController`.

3. **Model (Persistência - SQLite):**
   * **Responsabilidade:** Garantir a integridade dos dados, histórico de transações financeiras e controle de estoque de forma local.

## 3. Justificativas e Mudança de Rota
No planejamento inicial, previu-se o uso de uma API Web. A arquitetura Web foi totalmente substituída por uma aplicação Desktop nativa em Python pelas seguintes razões:
* **Baixa Latência no PDV:** Operações de frente de caixa exigem tempo de resposta imediato. Depender de requisições HTTP e navegadores cria gargalos desnecessários para uma loja física.
* **Independência de Infraestrutura:** O uso do banco relacional SQLite local dispensa a necessidade de conexão com a internet ou contratação de servidores em nuvem, barateando o custo operacional.
* **Separação de Preocupações (SoC):** O uso rigoroso do MVC manteve o baixo acoplamento. A camada visual (View) não possui regras de banco de dados; ela atua estritamente consumindo os métodos limpos dos Controllers.

## 4. Revisão da Sprint
* **O que foi feito:** Migração técnica conceitual de Web para Desktop MVC e implementação do motor gráfico nativo.
* **Próximos Passos:** Aplicar padrões de projeto para controle de instâncias do banco de dados e estabilização de eventos da interface gráfica.
