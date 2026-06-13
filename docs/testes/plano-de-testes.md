# Plano de Testes

O plano de qualidade do sistema divide-se em duas frentes:
1. **Testes Unitários (Backend):** Focados em garantir a resiliência da API (Python/unittest). Validam rotas, bloqueio de login inválido, inserção de dados negativos e tentativa de venda sem saldo.
2. **Testes Funcionais/Caixa Preta (Frontend):** Focados em usabilidade e regras de negócio sob a ótica do usuário.
   * **CT01:** Validação de segurança por perfil (ocultação de botões).
   * **CT02:** Bloqueio ativo de venda sem saldo.
   * **CT03:** Baixa automática e alerta de estoque mínimo.
   * **CT04:** Filtros e ordenação da interface.