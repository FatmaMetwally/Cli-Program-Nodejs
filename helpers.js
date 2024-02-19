const fs = require('fs');
const dataFilePath = process.env.DetaFilePath||'todos.json';
const writeTodosToFile = (todos) => {
    fs.writeFileSync(dataFilePath, JSON.stringify(todos, null, 2));
  };
  /****/
const readTodos = () => {
    const todos = fs.readFileSync(dataFilePath, 'utf8');
    return JSON.parse(todos);
 
};
 /****/
const addTodo = (title, body, checked) => {
  if (!fs.existsSync(dataFilePath)) {
    fs.writeFileSync(dataFilePath, '[]');
}
    const todos = readTodos();
    const id = Date.now();
    todos.push({ id, title, body, checked });
    writeTodosToFile(todos);
    console.log(`Todo added with ID: ${id}`);
  };
  /**************/
const editTodo = (id, title, body, checked) => {
    let todos = readTodos();
    const index = todos.findIndex(todo => todo.id === id);
    if (index !== -1) {
      todos[index].title = title;
      todos[index].body = body;
      todos[index].checked = checked;
      writeTodosToFile(todos);
      console.log(`Todo with ID ${id} edited successfully`);
    } else {
      console.log(`Todo with ID ${id} not found`);
    }
  };
const deleteTodo = (id) => {
    let todos = readTodos();
    todos = todos.filter(todo => todo.id !== +id);
    writeTodosToFile(todos);
    console.log(`Todo with ID ${id} deleted successfully`);
  };
/*****/
const listAllTodos = () => {
    const todos = readTodos();
    console.log('All Todos: ');
  //   todos.forEach(todo => {
  //     console.log(`ID: ${todo.id}, Title: ${todo.title}, Body: ${todo.body}, Checked: ${todo.checked ? 'Yes' : 'No'}`);
  //   });
  console.log(todos);
  };
  /****/
  const listCheckedTodos = () => {
    const todos = readTodos().filter(todo => todo.checked);
    console.log('Checked Todos:');
    console.log(todos);
   
  };
  /***** */
  const listUncheckedTodos = () => {
    const todos = readTodos().filter(todo => !todo.checked);
    console.log('Unchecked Todos:');
    console.log(todos);
  };
//////////////////////////////////////////////
const prepairedArguments = (args) => {
    
    return args.reduce((options, currentElemnt) => {
        const [key, value] = currentElemnt.split('=');
        options[key] = value;
        return options;
      }, {});
};
module.exports={
    writeTodosToFile,
    readTodos,
    addTodo,
    editTodo,
    deleteTodo,
    listAllTodos,
    listCheckedTodos,
    listUncheckedTodos,
    prepairedArguments
}