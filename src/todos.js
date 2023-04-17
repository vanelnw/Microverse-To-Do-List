import { getTasksFromLocalStorage, addToLocalStorage } from './localStorage';
import displayTasks from './displayTasks';

export default class Todos {
  constructor() {
    this.TodoList = getTasksFromLocalStorage();
  }

  renderTodos() {
    this.TodoList.sort((a, b) => a.index - b.index).forEach((todo) => {
      const checked = todo.completed ? 'checked' : '';
      displayTasks(todo.index, todo.description, checked);
    });
  }

  addTodoTask(todo) {
    const id = this.TodoList.length;

    if (todo) {
      displayTasks(id, todo, false);

      this.TodoList.push({
        index: id,
        description: todo,
        completed: false,
      });

      addToLocalStorage(this.TodoList);
    }
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

  removeTodo(id) {
    const currentTodoId = parseInt(id, 10);

    this.TodoList = this.TodoList.filter(
      (todo) => todo.index !== currentTodoId,
    );

    for (let i = currentTodoId; i < this.TodoList.length; i += 1) {
      this.TodoList[i].index -= 1;
    }

    addToLocalStorage(this.TodoList);

    this.renderTodos();
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
        this.TodoList[parseInt(element.id, 10)].description = event.target.value;

        addToLocalStorage(this.TodoList);
      }
    });
  }
}