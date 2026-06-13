# Princípios e Decisões de Projeto

As decisões arquiteturais e de projeto foram baseadas em princípios de alta coesão e baixo acoplamento:

1. **Separação de Responsabilidades (MVC):** A lógica de negócio está isolada no Backend (Model/Controller), enquanto o Frontend lida apenas com a apresentação (View).
2. **Validação no Servidor:** Por questões de segurança, restrições críticas (como impedir a venda de produtos esgotados) não dependem do frontend, sendo validadas nativamente pela API.