import './style.css';
import Todos from './todos.js';
import { addToLocalStorage } from './localStorage';

const listTodo = document.getElementById('todo-lists');
const clearCompleteTodo = document.querySelector('.clear_completed_todo');
const clearAll = document.querySelector('.clear');
const form = document.getElementById('form');

const MyTodos = new Todos();

MyTodos.renderTodos();

clearAll.addEventListener('click', () => {
  MyTodos.TodoList = [];
  listTodo.replaceChildren('');
  addToLocalStorage(MyTodos.TodoList);
});

clearCompleteTodo.addEventListener('click', () => {
  MyTodos.TodoList = MyTodos.TodoList.filter(
    (todo) => todo.completed === false,
  );
  listTodo.replaceChildren('');
  MyTodos.renderTodos();
  addToLocalStorage(MyTodos.TodoList);
});

form.addEventListener('submit', (e) => {
  e.preventDefault();
  MyTodos.addTodoTask();
});

listTodo.addEventListener('click', (event) => {
  const element = event.target;
  if (element.getAttribute('name') === 'checkbox') {
    MyTodos.completeTodo(element);
  } else if (element.tagName === 'I') {
    if (element.getAttribute('name') === 'update') {
      MyTodos.updateTodo(element);
    } else if (element.getAttribute('name') === 'remove') {
      MyTodos.removeTodo(element);
    }
  }
});
