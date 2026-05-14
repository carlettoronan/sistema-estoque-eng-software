# Sistema de Gestão de Estoque e Vendas (Desktop MVC)

**Disciplina:** Engenharia de Software - Prof. Johnatan Oliveira
**Período:** 2026/1

---

## 1. Identificação e Contextualização do Problema
Muitos comércios pequenos e médios ainda realizam o controle de seus estoques e o registro de vendas de forma manual (em cadernos) ou utilizando planilhas genéricas no Excel. Esse cenário gera diversos problemas: furos de estoque, perda de histórico de vendas e, principalmente, falhas de segurança, uma vez que funcionários de operação acabam tendo o mesmo nível de acesso a dados sensíveis (como fluxo de caixa e exclusão de registros) que os gerentes ou donos do estabelecimento.

## 2. Justificativa da Proposta de Solução
O desenvolvimento de uma aplicação **Desktop Nativa** centralizada justifica-se pela necessidade de um terminal de Ponto de Venda (PDV) com alta performance, tempo de resposta imediato e independência de conexão com a internet. O controle de acesso baseado em perfis na própria interface garante que cada funcionário interaja apenas com as funcionalidades pertinentes ao seu cargo, reduzindo erros operacionais e garantindo integridade aos dados.

## 3. Visão do Produto e Objetivos
O sistema é uma aplicação Desktop desenvolvida em Python (Tkinter) voltada para a operação de frente de caixa e gestão financeira/estoque. 

**Objetivos do projeto:**
* Desenvolver uma interface gráfica rápida para o registro de vendas e movimentações de caixa.
* Automatizar a baixa de estoque e unificar o histórico de movimentações financeiras.
* Implementar um sistema de seleção de perfil com renderização dinâmica de permissões visuais (Admin, Gerente e Operador de Caixa).
* Manter um banco de dados local seguro (SQLite) com histórico de todas as transações.

## 4. Definição do Escopo da Aplicação (MVP)
Nesta versão, a aplicação atua como um sistema de PDV focado em Lojas de Departamento:
1. **Controle de Acesso:** Seleção de perfil na inicialização blindando os botões da interface.
2. **Módulo Admin:** Acesso irrestrito a todas as funcionalidades do sistema.
3. **Módulo Gerente:** CRUD de produtos (cadastro, alteração de estoque, edição de dados), gestão do fluxo de caixa (entradas e retiradas manuais) e vendas.
4. **Módulo Operador:** Acesso restrito exclusivamente à tela de Vendas e consulta de saldo de estoque (modo leitura).
5. **Operação de Venda:** Funcionalidade central onde a venda é registrada e o sistema subtrai a quantidade automaticamente do banco de dados, validando se há saldo suficiente.

## 5. Organização Inicial do Projeto em Formato Ágil
O projeto é conduzido utilizando uma versão acadêmica simplificada do framework **Scrum**. O repositório no GitHub atua como ambiente oficial de versionamento e documentação técnica. 
* O **Product Backlog** é mantido no GitHub (utilizando Issues).
* O desenvolvimento ocorre em Sprints incrementais, com o planejamento e a revisão registrados na pasta `docs/sprints/`.

## 6. Composição do Grupo
* [Lucas Oliveira Rodrigues](https://github.com/luskation) - 202510434
* [Ronan Gustavo Carletto](https://github.com/carlettoronan) - 202220250
* [Luis Gustavo Silva Teodoro](https://github.com/Luis3Gustavo) - 202110229
* [Marco Antonio Roquini Espudario](https://github.com/marcoespudario-sys) - 202010160
* [Gabriel Henrique Balbino de Souza](https://github.com/gabrielh03) - 202210582
