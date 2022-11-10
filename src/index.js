import './style.css';
import Todos from './todos.js';

const list = document.getElementById('list');
const input = document.getElementById('input');
const clearCompleteTodo = document.querySelector('.clear_completed_todo');
const clearAll = document.querySelector('.clear');

const MyTodos = new Todos();

let id = MyTodos.TodoList.length;

window.onload = () => {
  MyTodos.renderTodos();
};

clearAll.addEventListener('click', () => {
  MyTodos.TodoList = [];
  list.replaceChildren('');
  localStorage.setItem('todos', JSON.stringify(MyTodos.TodoList));
});

clearCompleteTodo.addEventListener('click', () => {
  MyTodos.TodoList = MyTodos.TodoList.filter(
    (todo) => todo.completed === false,
  );
  list.replaceChildren('');
  MyTodos.renderTodos();
  localStorage.setItem('todos', JSON.stringify(MyTodos.TodoList));
});

input.addEventListener('keydown', (event) => {
  if (event.code === 'Enter') {
    const toDo = input.value;
    if (toDo) {
      MyTodos.addTodo(toDo, id);
      id += 1;
    }
    input.value = '';
  }
});

list.addEventListener('click', (event) => {
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
