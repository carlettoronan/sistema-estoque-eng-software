# Sprint 02 - Levantamento e Priorização de Requisitos

## 1. Identificação
* **Número da sprint:** 02
* **Período:** 13/04/2026 a 18/04/2026
* **Data da entrega:** 18/04/2026

## 2. Objetivo da sprint
Realizar a elicitação, análise e priorização dos requisitos para o Sistema de Gestão de Estoque. O foco desta etapa foi definir o escopo funcional para uma loja de departamentos, estabelecendo o que é essencial para o Produto Mínimo Viável (MVP) e garantindo a rastreabilidade entre as necessidades dos usuários e as funcionalidades propostas.

## 3. Itens do Sprint Backlog
- [x] Identificação e descrição das Partes Interessadas (Stakeholders).
- [x] Levantamento de Requisitos Funcionais (RF) e Não Funcionais (RNF).
- [x] Elaboração de Histórias de Usuário (User Stories) com Critérios de Aceitação.
- [x] Priorização do Backlog utilizando a técnica MoSCoW.
- [x] Definição consolidada dos perfis de acesso (Administrador, Gerente e Operador de Caixa).

## 4. Relação com o conteúdo da disciplina
A sprint aplicou conceitos fundamentais de Engenharia de Requisitos, utilizando técnicas de elicitação para transformar necessidades de negócio em requisitos técnicos. A priorização via Matriz MoSCoW foi utilizada para mitigar riscos de atraso, garantindo que as funcionalidades críticas (Must Have) sejam priorizadas no desenvolvimento, enquanto funcionalidades de menor impacto (Should e Could) foram flexibilizadas.

## 5. Artefatos produzidos
* [Backlog do Produto](../backlog-produto.md)

## 6. Evidências no GitHub
* **Commits realizados:** Criação e refinamento do arquivo de backlog e registro da sprint atual.
* **Organização:** Atualização da estrutura de pastas `docs/` para comportar a documentação exigida.

## 7. Evolução da aplicação
A aplicação foi definida como uma solução Desktop local para controle de fluxo de mercadorias e financeiro em lojas de departamento. Nesta sprint, estabeleceu-se que o sistema operará com três níveis de acesso, permitindo a gestão de produtos, o controle rigoroso de entrada/saída no fluxo de caixa e mecanismos de segurança para a seleção de perfil de operação.

## 8. Dificuldades encontradas
O principal desafio foi o refinamento do escopo para manter a aplicação funcional, porém exequível dentro do cronograma acadêmico. Houve a necessidade de simplificar requisitos inicialmente complexos para evitar o engessamento da arquitetura antes da fase de modelagem técnica e da escolha definitiva do motor gráfico da interface (UI).

## 9. Revisão do incremento
* **Concluído:** Mapeamento completo de requisitos funcionais e não funcionais, garantindo que o ciclo de "venda e baixa de estoque" esteja bem delimitado.
* **Critérios de Qualidade:** Os requisitos foram validados quanto à clareza e viabilidade técnica inicial para um ambiente Desktop.

## 10. Pendências para a próxima sprint
* Iniciar a **Sprint 03 - Modelagem do Sistema**.
* Elaborar o Diagrama de Casos de Uso com base nos perfis mapeados (Admin, Gerente, Operador de Caixa).
* Definir o Modelo de Dados (Tabelas e Relacionamentos) focado na persistência relacional com o banco SQLite.
