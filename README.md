# Projeto CRUD de Lutadores

Este é um projeto full stack desenvolvido como trabalho final da disciplina de Linguagem de Programação para Internet. A aplicação permite o cadastro, visualização, edição e exclusão de lutadores, utilizando React no front-end e Node.js com Express e MongoDB no back-end.

## Tecnologias Utilizadas

* **Front-end:**
    * React
    * React Router DOM
    * Axios
    * CSS Modules

* **Back-end:**
    * Node.js
    * Express
    * Mysql
    * CORS

## Instalação e Execução

### Front-end

1.  Clone o repositório:
    ```bash
    git clone [https://github.com/seu-usuario/seu-repositorio.git](https://github.com/seu-usuario/seu-repositorio.git)
    ```
2.  Navegue até o diretório do front-end:
    ```bash
    cd final
    ```
3.  Instale as dependências:
    ```bash
    npm install
    ```
4.  Inicie a aplicação:
    ```bash
    npm start
    ```
    A aplicação estará disponível em `http://localhost:3000`.

### Back-end

(Instruções para o back-end, caso esteja em um diretório separado)

## Exemplos de Chamadas da API

As seguintes rotas estão disponíveis para manipulação dos dados dos lutadores:

* **Listar todos os lutadores:**
    * `GET /personagens`

* **Buscar um lutador por ID:**
    * `GET /personagens/:id`

* **Cadastrar um novo lutador:**
    * `POST /personagens`
    * **Corpo da requisição (JSON):**
        ```json
        {
          "nome": "Nome do Lutador",
          "idade": 30,
          "imagem": "URL da imagem",
          "descricao": "Descrição do lutador",
          "habilidades": "Habilidades do lutador"
        }
        ```

* **Atualizar um lutador:**
    * `PUT /personagens/:id`
    * **Corpo da requisição (JSON):**
        ```json
        {
          "nome": "Novo Nome do Lutador",
          "idade": 31,
          "imagem": "Nova URL da imagem",
          "descricao": "Nova descrição do lutador",
          "habilidades": "Novas habilidades do lutador"
        }
        ```

* **Excluir um lutador:**
    * `DELETE /personagens/:id`
