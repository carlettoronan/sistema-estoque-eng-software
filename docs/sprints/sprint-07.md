# Sprint 7 – Planejamento e Documentação de Testes

## 1. Identificação
* **Número da sprint:** 07
* **Período:** 18/05/2026 a 23/05/2026
* **Data da entrega:** 23/05/2026

## 2. Objetivo da Sprint
Planejar a estratégia de testes da solução Web, estabelecendo critérios claros de validação para os principais incrementos do projeto. O foco é garantir que o MVP cumpra as regras de negócio de estoque, respeite as restrições de segurança por perfil, entregue usabilidade na busca de itens e que a API (Backend) e a Interface (Frontend) funcionem em sincronia.

## 3. Definição dos Objetivos e Tipos de Teste
Para o MVP do Sistema de Gestão de Estoque, a estratégia adotada baseia-se em abordagens simplificadas que não exigem frameworks complexos de automação nesta fase inicial acadêmica:
* **Testes Funcionais de Caixa Preta (Manual):** Validar se o sistema se comporta conforme as Histórias de Usuário, testando as entradas na interface HTML e verificando os resultados na tela.
* **Teste de Integração (API REST):** Avaliar se o Frontend em JavaScript consegue enviar o JSON corretamente e se o Flask (Backend) responde com o status HTTP adequado (ex: 200 OK, 403 Proibido).
* **Teste de Regras de Negócio e Segurança:** Foco exclusivo nas permissões (controle de tela por perfil) e na integridade física do estoque (baixa automática e limite de saldo).

## 4. Revisão dos Critérios de Aceitação (Garantia de Qualidade)
Antes da modelagem dos cenários, os critérios de aceitação das User Stories cruciais (US01 e US04) foram revisados para garantir que fossem 100% testáveis:
* **US01 (Controle de Acesso):** Refinado para garantir que a barreira de segurança funcione visualmente, comparando a renderização da interface entre perfis administrativos e operacionais.
* **US04 (Baixa de Estoque):** Refinado para assegurar a atomicidade da operação — a venda só é registrada se a subtração no banco SQLite for consolidada com sucesso, impedindo saldos negativos.

## 5. Casos e Cenários de Teste (Checklist)
Abaixo estão os cenários críticos modelados para validação do MVP:

### CT01: Validação de Segurança (Acesso por Perfil)
* **Ação:** Fazer login com um usuário de perfil "Operador/Vendedor" e comparar com o acesso de um "Gerente/Admin".
* **Resultado Esperado:** O perfil Gerente deve visualizar todos os botões de ação (Editar/Excluir). Já o sistema deve ocultar/bloquear esses mesmos botões no Frontend para o Operador, restringindo-o apenas à ação de Vender.

### CT02: Impedir Venda de Produto Sem Saldo
* **Ação:** Tentar registrar no carrinho uma venda de unidades superior ao que o produto possui no banco de dados.
* **Resultado Esperado:** A API deve recusar a venda e devolver um alerta de erro para o Frontend avisando "Saldo insuficiente em estoque". Nenhuma dedução deve ocorrer no banco SQLite.

### CT03: Baixa Automática e Alerta de Estoque
* **Ação:** Realizar uma venda bem-sucedida de unidades de um produto X.
* **Resultado Esperado:** A tabela deve registrar a transação e a quantidade do produto X deve diminuir a exata quantidade vendida de forma imediata. Tratando-se de estoque com 5 ou menos unidades (estoque mínimo), o sistema deve sinalizar a linha do produto visualmente (ex: cor vermelha).

### CT04: Usabilidade (Busca e Ordenação Reativa)
* **Ação:** Digitar fragmentos do nome de um produto na barra de pesquisa e alternar os critérios na caixa de seleção de ordenação (Menor Preço, Maior Preço, A-Z).
* **Resultado Esperado:** A tabela deve filtrar os produtos em tempo real (no evento de digitação) e reordenar as linhas corretamente, sem necessidade de recarregar a página.

## 6. Matriz de Rastreabilidade (Requisitos vs Testes)
A tabela abaixo comprova que as validações cobrem os requisitos fundamentais priorizados no Backlog (Matriz MoSCoW):

| ID do Requisito | Descrição Resumida | Caso de Teste Relacionado |
|:---:|---|---|
| **RF02 / RNF01** | Autenticação e restrição de funções administrativas. | CT01 (Validação de Segurança) |
| **RF05** | Bloquear venda se quantidade for maior que o estoque. | CT02 (Impedir venda sem saldo) |
| **RF04 / RF06** | Baixa no estoque e alerta visual de estoque mínimo (<= 5). | CT03 (Baixa automática e Alerta) |
| **RF07**| Funcionalidade de busca e organização de listagem. | CT04 (Busca e Ordenação Reativa) |

## 7. Registro da Sprint e Incremento
* **Incremento Produzido:** Elaboração do plano estrutural de testes de software, definição de cenários críticos, revisão dos critérios de aceitação e modelagem da matriz de rastreabilidade.
* **Evidência:** Este documento (`sprint-07.md`) homologado na pasta de documentação do repositório.
* **Próximos Passos:** Avançar para a Sprint 08 com a execução prática deste plano, coleta de evidências de sucesso dos testes e consolidação do deploy final em produção.