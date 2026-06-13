# Arquitetura de Software

O sistema adota uma arquitetura **Cliente-Servidor** baseada na web, estruturada em duas camadas principais e independentes (desacopladas):

* **Frontend (Cliente):** Desenvolvido utilizando HTML5, CSS3 e JavaScript Vanilla. Responsável pela interface do usuário, interatividade (buscas e filtros reativos) e comunicação assíncrona.
* **Backend (Servidor):** Desenvolvido em Python utilizando o microframework Flask. Responsável pela lógica de negócios, validação de regras (ex: bloqueio de venda sem saldo) e persistência de dados no banco relacional SQLite.
* **Comunicação:** A integração entre as camadas ocorre estritamente via **API REST**, trocando informações no formato JSON.