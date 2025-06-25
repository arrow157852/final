# API de Gerenciamento de Lutadores

API RESTful para o trabalho final, criada com Node.js, Express e MongoDB para gerenciar um cadastro de lutadores.

## Tecnologias Utilizadas
- Node.js
- Express
- MongoDB com Mongoose
- Cors

## Como Instalar e Executar

1.  Navegue até a pasta `backend`: `cd backend`
2.  Instale as dependências: `npm install`
3.  Configure sua string de conexão do MongoDB no arquivo `index.js`.
4.  Inicie o servidor: `npm start`
5.  O servidor estará rodando em `http://localhost:5000`.

## Exemplos de Chamadas da API

**Criar Lutador (POST /api/fighters)**
```json
{
  "name": "Ryu",
  "style": "Ansatsuken",
  "imageUrl": "[https://www.streetfighter.com/wp-content/uploads/2016/06/character_ryu.png](https://www.streetfighter.com/wp-content/uploads/2016/06/character_ryu.png)"
}