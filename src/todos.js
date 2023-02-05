import displayTaks from './displayTsks';
import { getTasksFromLocalStorage, addToLocalStorage } from './localStorage';

export default class Todos {
  constructor() {
    this.TodoList = getTasksFromLocalStorage();
  }

  renderTodos() {
    this.TodoList.sort((a, b) => a.index - b.index).forEach((todo) => {
      const checked = todo.completed ? 'checked' : '';
      displayTaks(todo.index, todo.description, checked);
    });
  }

  addTodoTask() {
    const id = this.TodoList.length;
    const input = document.getElementById('input');
    const todo = input.value;

    if (todo) {
      displayTaks(id, todo, false);

      this.TodoList.push({
        index: id,
        description: todo,
        completed: false,
      });

      addToLocalStorage(this.TodoList);
      input.value = '';
    }
  }

  addTodo(todo, id, status = false) {
    const checked = status ? 'checked' : '';

    displayTaks(id, todo, checked);

    this.TodoList.push({
      index: id,
      description: todo,
      completed: false,
    });

    addToLocalStorage(this.TodoList);
  }

  completeTodo(element) {
    if (element.checked) {
      element.removeAttribute('checked');
    } else {
      element.setAttribute('checked', true);
    }
    element.parentNode.classList.toggle('done');
    this.TodoList[element.id].completed = !this.TodoList[element.id].completed;
    addToLocalStorage(this.TodoList);
  }

  removeTodo(element) {
    const currentTodoId = parseInt(element.id, 10);

    this.TodoList = this.TodoList.filter(
      (todo) => todo.index !== currentTodoId,
    );

    for (let i = currentTodoId; i < this.TodoList.length; i += 1) {
      this.TodoList[i].index -= 1;
    }
    element.parentNode.parentNode.replaceChildren('');
    this.renderTodos();
    addToLocalStorage(this.TodoList);
  }

  updateTodo(element) {
    const parent = element.parentNode;
    const input = parent.querySelector('input[name=todo]');
    input.removeAttribute('readonly');
    input.focus();
    element.classList = 'fa-solid fa-trash-can';
    element.setAttribute('name', 'remove');
    parent.style.backgroundColor = 'rgb(244, 202, 15)';

    input.addEventListener('keydown', (event) => {
      if (event.code === 'Enter') {
        input.setAttribute('readOnly', true);
        parent.style.backgroundColor = 'transparent';
        element.classList = 'fa-solid fa-ellipsis-vertical';
        element.setAttribute('name', 'update');
        this.TodoList[element.id].description = event.target.value;

        addToLocalStorage(this.TodoList);
      }
    });
  }
}
