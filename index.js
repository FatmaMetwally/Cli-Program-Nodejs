const fs = require('fs');
const dataFilePath = process.env.DetaFilePath||'todos.json';
const [, , crud, ...data] = process.argv;
const {
    addTodo,
    deleteTodo,
    listAllTodos,
    editTodo,
    listCheckedTodos,
    listUncheckedTodos,
    prepairedArguments
} = require('./helpers');

switch (crud) {
  case 'add':
    const { title, body, checked } = prepairedArguments(data);
    addTodo(title, body, checked === 'true');
    break;
  case 'delete':
    deleteTodo(parseInt(data[0]));
    break;
  case 'listAll':
    listAllTodos();
    break;
  case 'edit':
    const { id, newTitle, newBody, newChecked } = prepairedArguments(data);
    editTodo(parseInt(id), newTitle, newBody, newChecked === 'true');
    break;
  case 'listChecked':
    listCheckedTodos();
    break;
  case 'listUnchecked':
    listUncheckedTodos();
    break;
  default:
    console.log('Invalid crud operation');
}

