# Sistema Web de Gestão de Estoque e Vendas

**Disciplina:** Engenharia de Software - Prof. Johnatan Oliveira
**Período:** 2026/1

---

## 1. Identificação e Contextualização do Problema
Muitos comércios pequenos e médios ainda realizam o controle de seus estoques e alguns ainda realizam o registro de vendas de forma manual (em cadernos) ou utilizando planilhas genéricas no excel. Esse cenário gera diversos problemas: furos de estoque, perda de histórico de vendas e, principalmente, falhas de segurança, uma vez que funcionários de operação acabam tendo o mesmo nível de acesso a dados sensíveis (como custos e exclusão de registros) que os gerentes ou donos do estabelecimento.

## 2. Justificativa da Proposta de Solução
O desenvolvimento de uma aplicação web centralizada justifica-se pela necessidade de automatizar a baixa de produtos e garantir a integridade e segurança dos dados. Um sistema com controle de acesso baseado em perfis garante que cada funcionário interaja apenas com as funcionalidades pertinentes ao seu cargo, reduzindo erros operacionais e fornecendo aos gestores um controle exato e em tempo real do que entra e sai da loja.

## 3. Visão do Produto e Objetivos
O sistema será uma aplicação web voltada para a operação de frente de caixa e gestão de estoque de loja. 

**Objetivos do projeto:**
* Desenvolver uma interface para o registro rápido de vendas.
* Automatizar a atualização (baixa) do estoque a cada operação de venda realizada.
* Implementar um sistema de autenticação e autorização com diferentes níveis de privilégio (Master, Gerente e Operador).
* Manter um registro histórico e seguro de todas as movimentações.

## 4. Definição do Escopo Inicial da Aplicação Web
Nesta primeira versão (MVP), a aplicação web contemplará as seguintes funcionalidades e regras:
1. **Login e Controle de Acesso:** Autenticação de usuários validando seu nível de permissão.
2. **Módulo "Master" (Administrador):** CRUD completo de usuários (cadastro, edição, inativação e definição de papéis: Operador ou Gerente).
3. **Módulo "Gerente":** CRUD completo de produtos (cadastro, alteração de quantidades manuais, edição de dados) e permissão para realizar vendas.
4. **Módulo "Operador":** Acesso restrito à listagem de produtos (sem edição) e à interface de registro de vendas.
5. **Operação de Venda:** Funcionalidade central onde a venda é registrada e o sistema subtrai a quantidade correspondente automaticamente do banco de dados do estoque.

### 4.1. Implantação e Links da Solução em Produção (MVP)
O sistema foi completamente implantado em ambiente de nuvem utilizando uma arquitetura modular com desacoplamento total entre as camadas:

* **Interface da Aplicação (Frontend):** Hosted via [Netlify](https://wwws.netlify.com/) -> `https://deft-monstera-dc34fa.netlify.app/`
* **API REST e Banco de Dados (Backend):** Hosted via [PythonAnywhere](https://www.pythonanywhere.com/) -> `https://carlettoronan.pythonanywhere.com/api/usuarios`

*(Nota: Os dados inseridos, alterados ou deletados por qualquer usuário através da interface web são persistidos em tempo real no banco de dados SQLite centralizado no servidor cloud).*

## 5. Organização Inicial do Projeto em Formato Ágil
O projeto será conduzido utilizando uma versão acadêmica simplificada do framework **Scrum**. O repositório no GitHub atuará como ambiente oficial de versionamento e documentação técnica. 
* O **Product Backlog** será mantido no GitHub (utilizando Issues).
* O desenvolvimento ocorrerá em Sprints incrementais, com o planejamento e a revisão registrados na pasta `docs/sprints/`.

## 6. Composição do Grupo
* [Lucas Oliveira Rodrigues](https://github.com/luskation) - 202510434
* [Ronan Gustavo Carletto](https://github.com/carlettoronan) - 202220250
* [Luis Gustavo Silva Teodoro](https://github.com/Luis3Gustavo) - 202110229
* [Marco Antonio Roquini Espudario](https://github.com/marcoespudario-sys) - 202010160
* [Gabriel Henrique Balbino de Souza](https://github.com/gabrielh03) - 202210582 
