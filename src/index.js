import './style.css';
import Todos from './todos.js';
import { addToLocalStorage } from './localStorage.js';

const todoList = document.getElementById('todo-lists');
const clearCompletedBtn = document.querySelector('.clear_completed_todo');
const clearAllBtn = document.querySelector('.clear');
const form = document.getElementById('form');

const MyTodos = new Todos();

MyTodos.renderTodos();

clearAllBtn.addEventListener('click', () => {
  MyTodos.TodoList = [];
  todoList.replaceChildren('');
  addToLocalStorage(MyTodos.TodoList);
});

clearCompletedBtn.addEventListener('click', () => {
  MyTodos.TodoList = MyTodos.TodoList.filter(
    (todo) => todo.completed === false,
  );
  todoList.replaceChildren('');
  MyTodos.renderTodos();
  addToLocalStorage(MyTodos.TodoList);
});

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const input = document.getElementById('input');
  MyTodos.addTodoTask(input.value);
  input.value = '';
});

todoList.addEventListener('click', (event) => {
  const element = event.target;
  if (element.getAttribute('name') === 'checkbox') {
    MyTodos.completeTodo(element);
  } else if (element.tagName === 'I') {
    if (element.getAttribute('name') === 'update') {
      MyTodos.updateTodo(element);
    } else if (element.getAttribute('name') === 'remove') {
      element.parentNode.parentNode.replaceChildren('');
      MyTodos.removeTodo(element.id);
    }
  }
});
