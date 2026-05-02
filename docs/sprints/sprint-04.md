# Sprint 4 – Princípios de projeto e decisões de solução

## 1. Objetivo
Definir a arquitetura do Sistema de Gestão de Estoque e justificar as decisões de projeto adotadas, garantindo que a estrutura de software proposta siga os princípios de qualidade: alta coesão, baixo acoplamento, modularidade e responsabilidade bem definida.

## 2. Decomposição da Solução em Módulos
Para garantir a organização e escalabilidade do projeto, o sistema foi decomposto em três grandes módulos principais, seguindo o padrão de arquitetura em camadas (Client-Server):

1. **Módulo de Apresentação (Frontend / Web):**
   * **Responsabilidade:** Interface com os usuários (Administrador, Gerente, Vendedor). Responsável por renderizar telas, formulários e exibir os alertas de estoque.
   * **Componentes:** Telas de Login, Dashboard de Vendas, Gerenciamento de Usuários e Produtos.

2. **Módulo de Lógica de Negócio (Backend / API):**
   * **Responsabilidade:** Processar as regras de negócio, realizar autenticação e validar os dados antes da persistência.
   * **Componentes:** Controladores de Autenticação (RF02), Gestor de Estoque (Validação de saldo - RF05) e Gestor de Entidades (CRUDs - RF01 e RF03).

3. **Módulo de Persistência (Banco de Dados):**
   * **Responsabilidade:** Armazenamento seguro e permanente das informações.
   * **Componentes:** Tabelas relacionais modeladas na Sprint 3 (`USUARIO`, `PRODUTO`, `VENDA`, `ITEM_VENDA`).

## 3. Justificativas com base em Princípios de Projeto
As decisões arquiteturais foram baseadas nos seguintes princípios da Engenharia de Software:

* **Modularidade e Separação de Preocupações (Separation of Concerns):** A separação entre Frontend e Backend garante que a interface gráfica não contenha regras de negócio, e que o banco de dados não dependa de como a tela é desenhada.
* **Baixo Acoplamento:** O Frontend se comunicará com o Backend exclusivamente via API (ex: requisições HTTP/JSON). Isso significa que uma alteração no layout da tela não quebra a lógica do servidor, reduzindo o impacto das manutenções.
* **Alta Coesão e Responsabilidade Única:** Cada componente do Backend foi pensado para ter uma única responsabilidade. O módulo de Vendas, por exemplo, cuida apenas do registro da transação e da baixa do estoque, sem interferir no módulo de cadastro de usuários.

## 4. Análise de Alternativas de Implementação
Durante a concepção da arquitetura, analisamos a alternativa de construir o sistema como um **Monolito** (onde o código HTML da tela e as consultas ao banco de dados ficam no mesmo arquivo). 

**Decisão:** Essa alternativa foi **descartada**. Optamos por uma arquitetura separada por módulos via API (Backend independente do Frontend) porque, embora um monolito seja mais rápido de configurar inicialmente, ele fere o princípio do baixo acoplamento, dificultando futuras atualizações, a divisão de tarefas entre a equipe e uma possível futura criação de um aplicativo mobile para os vendedores.

## 5. Alinhamento entre Requisitos e Estrutura Proposta
A arquitetura modular proposta suporta diretamente os requisitos elicitados nas Sprints anteriores:
* A separação do **Módulo de Autenticação** garante a segurança e restrição de perfis exigida pelo **RF02**.
* O isolamento do **Módulo de Gestão de Estoque** centraliza a regra de negócio de baixa automática (**RF04**) e bloqueio de vendas sem saldo (**RF05**), evitando que essa regra fique espalhada pelo código.
* A camada de **Persistência Relacional** garante a segurança e integridade dos dados, atendendo diretamente ao **RNF04**.

## 6. Registro de Acompanhamento da Sprint (Sprint Backlog)
Durante esta sprint, as seguintes tarefas foram executadas e registradas:
* Definição e decomposição dos módulos conceituais do sistema (Frontend, Backend e Banco de Dados).
* Análise técnica de alternativas arquiteturais (Monolito vs. Arquitetura Modular).
* Atualização do Product Backlog com a inclusão de novos requisitos não funcionais arquiteturais (RNF06 e RNF07).
* Documentação das justificativas de projeto baseadas em princípios de software (Alta Coesão e Baixo Acoplamento).
