# Backlog do Produto - Sistema de Gestão de Estoque

## 1. Partes Interessadas (Stakeholders)

* **Administrador:** Responsável pela gestão do sistema. Tem acesso irrestrito a todas as funcionalidades e telas.
* **Gerente:** Responsável pela operação logística e controle administrativo da loja. Suas principais funções incluem cadastrar novos produtos, atualizar preços e gerenciar as movimentações manuais do módulo de Caixa.
* **Operador de Caixa:** Responsável pelo atendimento direto ao cliente. Utiliza o sistema apenas para realizar consultas rápidas de disponibilidade no estoque e registrar a saída de produtos no momento da venda.

## 2. Requisitos Funcionais (RF)
| ID | Descrição | Prioridade (MoSCoW) |
|:---:|---|:---:|
| RF01 | O sistema deve possuir uma tela de seleção de perfil na inicialização. | Must |
| RF02 | O sistema deve adaptar a interface ocultando botões baseando-se no perfil selecionado. | Must |
| RF03 | O sistema deve permitir o cadastro, edição e listagem de produtos genéricos. | Must |
| RF04 | O sistema deve permitir o registro de vendas, subtraindo automaticamente o item do estoque. | Must |
| RF05 | O sistema deve bloquear a venda se a quantidade solicitada for maior que o estoque. | Must |
| RF06 | O sistema deve possuir um módulo de Caixa para unificar vendas e movimentações manuais (entradas/retiradas). | Must |
| RF07 | O sistema deve permitir a gestão de clientes e histórico de gastos. | Should |

## 3. Requisitos Não Funcionais (RNF)
| ID | Descrição | Categoria | Prioridade (MoSCoW) |
|:---:|---|---|:---:|
| RNF01 | O sistema deve restringir o acesso a funções administrativas via controle de renderização da UI (Tkinter). | Segurança | Must |
| RNF02 | O sistema deve ser desenvolvido como uma aplicação Desktop Nativa utilizando Python. | Arquitetura | Must |
| RNF03 | O sistema deve armazenar os dados de forma persistente em um banco relacional local (SQLite3). | Armazenamento | Must |
| RNF04 | O sistema deve responder às interações de clique de forma fluida, sem travamentos de ciclo de evento (TclError). | Desempenho | Must |
| RNF05 | O sistema deve seguir o padrão arquitetural MVC (Model-View-Controller) local. | Arquitetura | Must |
| RNF06 | O código-fonte deve aplicar Padrões de Projeto (ex: Singleton) para otimizar o uso do banco de dados. | Manutenibilidade | Should |

## 4. Priorização (Matriz MoSCoW)
* **Must Have:** RF01 a RF06, RNF01 a RNF05. *(O núcleo do sistema PDV).*
* **Should Have:** RF07, RNF06. *(Facilita o gerenciamento e manutenção técnica).*

## 5. Histórias de Usuário (User Stories)

### Perfil: Operador de Caixa
#### US01 - Navegação Restrita
* **Descrição:** Como Operador de Caixa, eu quero ver apenas os módulos de Vendas e Consulta de Estoque, para não modificar acidentalmente as configurações gerenciais da loja.
* **Critérios de Aceitação:** Ao selecionar o perfil "Operador", os botões de "Caixa" e "Clientes" não devem ser renderizados na tela principal.

#### US02 - Registro de Venda
* **Descrição:** Como Operador, eu quero registrar a saída de produtos para que o estoque e o caixa sejam atualizados imediatamente.
* **Critérios de Aceitação:** O sistema deve calcular o total automaticamente e impedir a venda se não houver saldo no banco de dados.

### Perfil: Gerente
#### US03 - Gestão de Caixa e Movimentações
* **Descrição:** Como Gerente, eu quero registrar retiradas (sangria) ou entradas (suprimento) manuais no caixa, para que o DRE da loja bata com o dinheiro físico no fim do dia.
* **Critérios de Aceitação:** O módulo de caixa deve exibir um histórico unificado misturando as vendas automáticas com as movimentações manuais inseridas por mim.
