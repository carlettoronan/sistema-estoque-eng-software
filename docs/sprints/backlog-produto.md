# Backlog do Produto - Sistema de Gestão de Estoque

## 1. Partes Interessadas (Stakeholders)

* **Administrador (Master):** Responsável pela gestão do sistema e da segurança. Tem acesso irrestrito a todas as funcionalidades, cria e gerencia os perfis de acesso (Vendedores e Gerentes) e garante a integridade do uso do software, podendo redefinir senhas e desativar contas.
* **Gerente:** Responsável pela operação logística e controle administrativo da loja. Suas principais funções incluem cadastrar novos produtos, atualizar preços, organizar as categorias e monitorar os níveis de estoque para agir sobre alertas de escassez.
* **Operador/Vendedor:** Responsável pelo atendimento direto ao cliente e giro de mercadorias. Utiliza o sistema para realizar consultas rápidas de disponibilidade e registrar a saída de produtos no momento da venda, garantindo a baixa automática e em tempo real do estoque.

## 2. Requisitos Funcionais (RF)
| ID | Descrição | Prioridade (MoSCoW) |
|:---:|---|:---:|
| RF01 | O sistema deve permitir o cadastro, edição, consulta e desativação de usuários (CRUD). | Must |
| RF02 | O sistema deve realizar a autenticação (login) para identificar o perfil do usuário. | Must |
| RF03 | O sistema deve permitir o cadastro, edição, consulta e desativação de produtos. | Must |
| RF04 | O sistema deve permitir o registro de vendas, subtraindo automaticamente o item do estoque. | Must |
| RF05 | O sistema deve bloquear a venda se a quantidade solicitada for maior que o estoque. | Must |
| RF06 | O sistema deve emitir um alerta visual para produtos com quantidade abaixo do "Estoque Mínimo". | Should |
| RF07 | O sistema deve permitir filtrar a visualização do estoque por categorias. | Should |
| RF08 | O sistema deve permitir o upload de uma imagem (foto) para o produto. | Could |
| RF09 | O sistema deve gerar e imprimir cupons fiscais das vendas realizadas. | Won't |

## 3. Requisitos Não Funcionais (RNF)
| ID | Descrição | Categoria | Prioridade (MoSCoW) |
|:---:|---|---|:---:|
| RNF01 | O sistema deve restringir o acesso a funções administrativas apenas para o perfil "Admin". | Segurança | Must |
| RNF02 | O sistema deve armazenar as senhas dos usuários de forma segura. | Segurança | Must |
| RNF03 | O sistema deve ser desenvolvido como uma aplicação Web. | Arquitetura | Must |
| RNF04 | O sistema deve armazenar os dados de forma persistente para garantir a integridade do estoque. | Armazenamento | Must |
| RNF05 | O sistema deve responder às ações de venda em menos de 5 segundos para não atrasar o caixa. | Desempenho | Should |
| RNF06	| O sistema deve seguir uma arquitetura modular (Frontend e Backend independentes). | Arquitetura | Must |
| RNF07	| A comunicação entre o Módulo Web e o Servidor deve ser feita via API REST (JSON). | Interoperabilidade | Must |
| RNF08 | O sistema deve garantir baixo acoplamento entre os módulos de Vendas e Cadastro. | Manutenibilidade | Should |

## 4. Priorização (Matriz MoSCoW)
* **Must Have (Essencial):** RF01, RF02, RF03, RF04, RF05, RNF01, RNF02, RNF03, RNF04, RNF06, RNF07. *(O núcleo do sistema e da arquitetura base).*
* **Should Have (Importante):** RF06, RF07, RNF05, RNF08. *(Facilita o gerenciamento e manutenção).*
* **Could Have (Desejável):** RF08. *(Seria um diferencial visual se sobrar tempo).*
* **Won't Have (Fica para depois):** RF09. *(Fora do escopo deste semestre acadêmico).*

## 5. Histórias de Usuário (User Stories)

### Perfil: Administrador

#### US01 - Gestão de Usuários
* **Descrição:** Como Administrador, eu quero gerenciar os usuários do sistema (vendedores e gerentes) para controlar quem pode realizar operações de estoque e vendas.
* **Critérios de Aceitação:**
    > 1. O sistema deve permitir que o Administrador crie novos usuários com: Nome, Login, Senha e Perfil (Admin ou Vendedor).  
    > 2. O Administrador deve conseguir redefinir a senha de qualquer usuário.  
    > 3. O sistema deve permitir "Desativar" um usuário em vez de apenas eliminar, para manter a integridade dos históricos de vendas, impedindo logins futuros.  
    > 4. Apenas usuários com perfil "Administrador" podem acessar a tela de gestão de usuários.

---

### Perfil: Gerente

#### US02 - Gestão de Produtos (CRUD)
* **Descrição:** Como Gerente, eu quero cadastrar e gerenciar produtos com informações detalhadas para que o inventário seja preciso e a localização física dos itens seja rápida.
* **Critérios de Aceitação:**
    > 1. O sistema deve impedir o cadastro de dois produtos com o mesmo código de barras.  
    > 2. Campos obrigatórios: Nome, Preço de Venda, Unidade de Medida (Ex: UN, KG, CX) e Quantidade Inicial maior que zero.  
    > 3. O sistema deve permitir a edição de qualquer campo do produto e a sua exclusão lógica (desativação).  
    > 4. O sistema deve permitir a definição de um "Estoque Mínimo" e o registro da "Localização Física" (Seção/Prateleira).  
    > 5. **(Opcional - Could Have)** O sistema deve permitir o upload de uma imagem (foto) do produto.

#### US03 - Consulta de Inventário e Alertas
* **Descrição:** Como Gerente, eu quero visualizar a lista de todos os produtos cadastrados para monitorar os níveis de estoque e identificar itens abaixo do mínimo.
* **Critérios de Aceitação:**
    > 1. O sistema deve exibir uma tabela com Nome, Categoria, Localização e Quantidade Atual de todos os itens.  
    > 2. Itens com quantidade igual ou inferior ao "Estoque Mínimo" devem ser destacados visualmente (ex: cor vermelha).  
    > 3. Deve ser possível filtrar a consulta por Categoria ou busca por Nome.

---

### Perfil: Vendedor

#### US04 - Registro de Venda e Baixa de Estoque
* **Descrição:** Como Vendedor, eu quero registrar a saída de um produto no momento da venda para que o estoque seja atualizado em tempo real.
* **Critérios de Aceitação:**
    > 1. O sistema deve permitir a seleção de um produto via busca por nome ou código.  
    > 2. Ao confirmar a venda, a quantidade vendida deve ser subtraída automaticamente do saldo em estoque no banco de dados.  
    > 3. O sistema deve impedir a venda de quantidades superiores ao saldo disponível em estoque.  
    > 4. Cada venda deve registrar automaticamente o ID do vendedor, a data e o valor total da transação.
    > 5. **(Técnico):** O processamento da baixa de estoque e a validação de saldo devem ser executados exclusivamente pelo Módulo de Lógica de Negócio (Backend), garantindo a responsabilidade única e a segurança da regra.
