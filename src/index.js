const express = require('express');
const cors = require('cors');

const { v4: uuidv4 } = require('uuid');

const app = express();

app.use(cors());
app.use(express.json());

const users = [];

// Middleware
/**
 * Middleware que verifica se o usuário existe
 */
function checksExistsUserAccount(request, response, next) {
  // Complete aqui
  const { username } = request.headers;

  const user = users.find(u => u.username === username);

  if(!user){
    return response.status(400).json({ error: 'User not found' });
  }

  request.user = user;

  return next();

}


// Rota de cadastro de usuário
/**
 * Cadastro de usuário no sistema
 * 
 * name - nome do usuário
 * username - "nick" de usuário
 * 
 * 201 -> Retorna um usuário com id, name, username, e lista de afazeres vazia
 * 
 * 400 -> Erro - Usuário já existe
 */

app.post('/users', (request, response) => {
  // Complete aqui
  const {name, username} = request.body;

  const userExists = users.find(u => u.username === username);

  if (userExists) {
    return response.status(400).json({error: 'User already exists.'});
  }

  const user = {
    id: uuidv4(),
    name,
    username,
    todos: []
  }

  users.push(user);

  return response.status(201).json(user);

});

// Rota para obter as tarefas de um usuários
/**
 *  Obter todas as tarefas de um usuário
 * 
 *  Retorna todas as tarefas do usuário
 * 
 *  Erro - Usuário não encontrado
 */
app.get('/todos', checksExistsUserAccount, (request, response) => {
  // Complete aqui
  const { user } = request;
  return response.json(user.todos);
});


app.post('/todos', checksExistsUserAccount, (request, response) => {
  // Complete aqui
});

app.put('/todos/:id', checksExistsUserAccount, (request, response) => {
  // Complete aqui
});

app.patch('/todos/:id/done', checksExistsUserAccount, (request, response) => {
  // Complete aqui
});

app.delete('/todos/:id', checksExistsUserAccount, (request, response) => {
  // Complete aqui
});

module.exports = app;