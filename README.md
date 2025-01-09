# Saturn Analytics API

A Saturn Analytics API é uma API desenvolvida em Node.js como parte de uma aplicação web para visualização de indicadores assistenciais. Este projeto foi criado para auxiliar na gestão da saúde hospitalar, disponibilizando dados de KPIs (Key Performance Indicators) através de um painel de indicadores.

A API consulta dados armazenados em um banco de dados NoSQL hospedado no MongoDB Atlas, que contém informações sobre os KPIs e os usuários que podem acessar o sistema.

## Tecnologias Utilizadas
- JavaScript
- Node.js
- Express.js
- MongoDB Atlas
- JWT (JSON Web Token)

## Funcionalidades

- Consulta de KPIs: Permite a obtenção de informações de indicadores assistenciais relevantes para a gestão hospitalar.
- Autenticação e segurança: Todos os dados são protegidos e acessíveis apenas mediante autenticação do usuário.
- Gerenciamento de usuários: A API gerencia os usuários habilitados a acessar o sistema.

## Estrutura do Projeto

```plaintext
/
├── server.cjs            # Arquivo principal que configura o app Express
├── src/
│   ├── controllers/      # Controladores que contêm a lógica das rotas
│   ├── models/           # Modelos para conexão com o banco de dados MongoDB
│   ├── routes/           # Definição de rotas da API
│   └── middleware/       # Middlewares como autenticação, validação e envio de e-mail
├── package.json          # Dependências e scripts do projeto
├── vercel.json           # Configurações para build da aplicação no Vercel
├── README.md             # Documentação do projeto
└── LICENSE               # Arquivo de licença
```

## Objetivo

A API tem como foco disponibilizar os dados dos indicadores de forma organizada, segura e com bom desempenho para as aplicações de front end. Esses indicadores visam melhorar a tomada de decisão e a gestão hospitalar, promovendo eficiência e qualidade nos serviços de saúde. Os indicadores se baseiam nos 14 KPIs propostos pela ANS através do [**Programa de Monitoramento da Qualidade dos Prestadores de Serviços Diagnósticos na Saúde Suplementar – PM-QUALISS**](https://www.gov.br/ans/pt-br/assuntos/prestadores/qualiss-programa-de-qualificacao-dos-prestadores-de-servicos-de-saude-1), que incentiva a melhoria da qualidade dos serviços prestados pelos hospitais brasileiros.

## Instalação e Uso

### Pré-requisitos

Antes de rodar a API, certifique-se de ter instalado:
- Node.js (versão 16 ou superior)
- npm ou yarn
- Postman

### Passos para Rodar o Projeto

1. Clone este repositório:
   ```bash
   git clone https://github.com/dsrodrigovieira/saturn-analytics-api.git
   ```

2. Acesse o diretório do projeto:
   ```bash
   cd saturn-analytics-api
   ```

3. Instale as dependências do projeto:
    ```bash
    npm i
    ```

4. Configure as variáveis de ambiente criando um arquivo `.env` na raiz do projeto com as seguintes informações:    
    ```env
    MONGO_URI=<string-de-conexão-mongodb>
    JWT_SECRET=<chave-para-toke-jwt>
    TIMEZONE="America/Sao_Paulo"
    EMAIL_USER=<conta-email-para-envio-recuperacao-senha>
    EMAIL_PASS=<senha-do-email>
    PORT=<porta-da-api>
    ```

5. Inicie o servidor:
    ```bash
    npm run dev
    ```

6. Acesse a API em:
    ```bash
    http://localhost:<porta-da-api>
    ```

7. Para autenticação, utilize os endpoints específicos para login e obtenha um token JWT para acessar as demais funcionalidades.

### Endpoints principais
- `POST /register`: Registra um novo usuário.
- `POST /auth`: Realiza a autenticação e retorna um token JWT.
- `POST /reset_password`: Gera um token para redefinir a senha do usuário.
- `GET /kpi`: Retorna a lista de KPIs disponíveis (requer autenticação).
- `GET /results`: Retorna os resultados dos KPIs de determinada competência (requer autenticação).

### Contribuição
Contribuições são bem-vindas! Se você deseja melhorar o projeto ou reportar problemas, sinta-se à vontade para abrir uma issue ou enviar um pull request.

### Licença
Este projeto está licenciado sob a [MIT License](LICENSE).

### Contato
Para dúvidas ou sugestões, entre em contato com:
- **Rodrigo Vieira**
    - Email: dsrodrigovieira@gmail.com
    - LinkedIn: [dsrodrigovieira](https://linkedin.com/in/dsrodrigovieira)
