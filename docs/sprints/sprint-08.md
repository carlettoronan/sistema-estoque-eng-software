# Sprint 8 – Consolidação, Evidências Finais e Revisão dos Incrementos

## 1. Identificacao
Numero da sprint: 08
Periodo: 25/05/2026 a 30/05/2026
Data da entrega: 30/05/2026

## 2. Objetivo da sprint
Consolidar todos os artefatos produzidos ao longo do projeto, revisar a evolução incremental do software, apresentar as evidências de validação (Testes Funcionais e Unitários) planejadas na Sprint 7 e preparar a versão final da aplicação web para a demonstração final.

## 3. Itens do Sprint Backlog
* Executar o ciclo de testes funcionais (Caixa Preta) documentados na Sprint 07.
* Executar testes unitários no Backend (API).
* Consolidar a documentação final nas pastas exigidas pelo regulamento.
* Preparar o ambiente para a apresentação final (Deploy/Homologação).

## 4. Relacao com o conteudo da disciplina
Relaciona-se à segunda parte do conteúdo de Testes e à integração final dos conteúdos estudados, com foco em validação, revisão e fechamento do projeto.

## 5. Artefatos produzidos
* Arquivo de Evidências de Testes (`docs/testes/evidencias-testes.md`).
* Documentos estruturais consolidados (`visao-geral.md`, `arquitetura.md`, `decisoes-de-projeto.md`, `padroes-de-projeto.md`).
* Versão final do código-fonte estabilizada.

## 6. Evidencias no GitHub
Arquivos criados/atualizados: `docs/testes/evidencias-testes.md`, arquivos de documentação estrutural e atualização da `sprint-08.md`.
Commits relevantes: Commit de consolidação da documentação final e evidências de testes.

## 7. Evolucao da aplicacao web (Síntese do Projeto)
* **Sprints 01 a 03:** Definição de escopo, levantamento de requisitos (Matriz MoSCoW), diagramação e estruturação do banco de dados relacional.
* **Sprints 04 a 06:** Criação do Módulo Backend (Flask/Python) com separação de responsabilidades (MVC) e desenvolvimento da interface Frontend Web. Implementação de regras de negócio essenciais e aplicação de Padrões de Projeto (ex: Factory Method para controle de usuários).
* **Sprint 07:** Elaboração do plano de qualidade, contemplando cenários de Testes Funcionais (Caixa Preta) e Testes Unitários.
* **Sprint 08:** Execução do ciclo de testes, correção de vulnerabilidades e regras de validação no backend, aprimoramento do feedback visual (UX), deploy da arquitetura distribuída e documentação dos resultados.

A aplicação Web encontra-se totalmente funcional, hospedada e pronta para demonstração, cumprindo o objetivo de modernizar, centralizar e tornar seguro o processo de gestão de estoque.

## 8. Dificuldades encontradas
Ajustes finais de integração entre o frontend reativo e o backend para garantir que as mensagens de erro (ex: saldo insuficiente) fossem exibidas corretamente na interface durante os testes.

## 9. Revisao do incremento (Status Final do Backlog)
O MVP encerra o ciclo de desenvolvimento atendendo aos requisitos essenciais:
* **Must Haves (100% Concluídos):** Autenticação (RF02), CRUD de Usuários e Produtos (RF01, RF03), Venda com Baixa Automática e Restrição de Saldo (RF04, RF05). Toda a arquitetura foi modularizada (RNF06) operando via API REST (RNF07).
* **Should Haves (Concluídos):** Implementada a barra de pesquisa reativa em JavaScript e ordenação da tabela por preço e ordem alfabética para facilitar a usabilidade.
O que ficou pendente: implementações de funcionalidades não essencias para MVP.

## 10. Pendencias para a proxima sprint
Não há próximas sprints. O projeto foi concluído. O foco agora é unicamente a Apresentação Final da solução.