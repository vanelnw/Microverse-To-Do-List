import './style.css';
import Todos from './todos.js';

const list = document.getElementById('list');
const input = document.getElementById('input');

const MyTodos = new Todos();

let id = MyTodos.TodoList.length;

window.onload = () => {
  MyTodos.renderTodos();
};

document.addEventListener('keydown', (event) => {
  if (event.code === 'Enter') {
    const toDo = input.value;
    if (toDo) {
      MyTodos.addTodo(toDo, id);
      // eslint-disable-next-line no-plusplus
      id++;
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