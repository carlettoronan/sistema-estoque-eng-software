# Sprint 8 – Consolidação, Evidências Finais e Revisão dos Incrementos

## 1. Identificação
* **Número da sprint:** 08
* **Período:** 25/05/2026 a 30/05/2026
* **Data da entrega:** 30/05/2026

## 2. Objetivo da Sprint
Consolidar todos os artefatos produzidos ao longo do projeto, revisar a evolução incremental do software, apresentar as evidências de validação (Testes Funcionais e Unitários) planejadas na Sprint 7 e preparar a versão final da aplicação web para a demonstração final.

## 3. Síntese da Evolução do Projeto (Sprints 1 a 8)
* **Sprints 01 a 03:** Definição de escopo, levantamento de requisitos (Matriz MoSCoW), diagramação e estruturação do banco de dados relacional.
* **Sprints 04 a 06:** Criação do Módulo Backend (Flask/Python) com separação de responsabilidades (MVC) e desenvolvimento da interface Frontend Web. Implementação de regras de negócio essenciais e aplicação de Padrões de Projeto (ex: Factory Method para controle de usuários).
* **Sprint 07:** Elaboração do plano de qualidade, contemplando cenários de Testes Funcionais (Caixa Preta) e Testes Unitários.
* **Sprint 08:** Execução do ciclo de testes, correção de vulnerabilidades e regras de validação no backend, aprimoramento do feedback visual (UX), deploy da arquitetura distribuída e documentação dos resultados.

## 4. Evidências de Teste (Resultados)

### 4.1. Testes Funcionais e de Regra de Negócio (Frontend)
Os cenários modelados na Sprint 7 foram validados no ambiente de produção/homologação com sucesso:

**[CT01] Validação de Segurança por Perfil -> PASSOU**
* **Evidência:** Como mostrado abaixo, a interface se adapta ao usuário. O perfil "Gerente" possui acesso total ao CRUD, enquanto o perfil "Vendedor" sofre restrição, com a supressão automática dos botões de edição, exclusão e gestão administrativa.
![Evidência CT01 Gerente](../img/ct01_gerente.png)
![Evidência CT01 Vendedor](../img/ct01_vendedor.png)

**[CT02] Impedir Venda de Produto Sem Saldo -> PASSOU**
* **Evidência:** A tentativa de vender uma quantidade superior ao saldo em estoque foi barrada ativamente pelo backend, disparando um alerta visual para o operador.
![Evidência CT02](../img/ct02.png)

**[CT03] Baixa Automática e Alerta de Estoque-> PASSOU**
* **Evidência:** A efetivação de uma venda subtraiu imediatamente o saldo da tabela, mantendo a integridade do banco de dados e refletindo os novos valores na interface visual sem erros. Adicionalmente também é possível verificar o alerta visual para estoque em quantidade inferior ou igual a 5 (cinco).
![Evidência CT03](../img/ct03.png)  

**[CT04] Usabilidade (Busca e Ordenação Reativa) -> PASSOU**
* **Evidência:** A manipulação dos filtros funcionou corretamente na memória do navegador. O sistema isolou o produto pesquisado e aplicou as regras de ordenação de preço instantaneamente.
![Evidência CT04 Busca](../img/ct04_busca.png)
![Evidência CT04 Organizacao](../img/ct04_organizacao.png)

### 4.2. Testes Unitários (Backend)
Para garantir a estabilidade do núcleo de software (API) e a blindagem contra dados inválidos, executamos scripts de testes automatizados utilizando a biblioteca nativa `unittest` do Python.
* **Evidência:** O log do terminal confirma a aprovação de todos os 4 casos de teste (Disponibilidade da API, Bloqueio de Login Inválido, Bloqueio de Venda Sem Saldo via API e Bloqueio de Cadastro com Dados Vazios/Negativos).
![Evidência Teste Unitário](../img/teste_unitario.png)

## 5. Status Final do Product Backlog
O MVP encerra o ciclo de desenvolvimento atendendo aos requisitos essenciais:
* **Must Haves (100% Concluídos):** Autenticação (RF02), CRUD de Usuários e Produtos (RF01, RF03), Venda com Baixa Automática e Restrição de Saldo (RF04, RF05). Toda a arquitetura foi modularizada (RNF06) operando via API REST (RNF07).
* **Should Haves (Concluídos):** Implementada a barra de pesquisa reativa em JavaScript e ordenação da tabela por preço e ordem alfabética para facilitar a usabilidade.

## 6. Conclusão e Entrega
A aplicação Web encontra-se totalmente funcional, hospedada e pronta para demonstração, cumprindo o objetivo de modernizar, centralizar e tornar seguro o processo de gestão de estoque.