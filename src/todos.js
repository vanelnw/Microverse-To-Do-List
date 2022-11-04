function displayTaks(id, todo, checked) {
  const list = document.getElementById('list');
  const done = checked ? 'done' : '';
  const item = `
  <li class="item ${done}" id="item">       
              <input type="checkbox" id=${id} name="checkbox" ${checked}/>
              <input type="text" id="Todo" value=${todo} name="todo" readonly/>
            <i class="fa-solid fa-ellipsis-vertical" id=${id} name="update"></i>
          </li>
  `;
  list.insertAdjacentHTML('beforeend', item);
}

export default class Todos {
  constructor() {
    this.TodoList = JSON.parse(localStorage.getItem('todos')) || [];
  }

  renderTodos() {
    this.TodoList.sort((a, b) => a.index - b.index).forEach((todo) => {
      const checked = todo.completed ? 'checked' : '';
      displayTaks(todo.index, todo.description, checked);
    });
  }

  addTodo(todo, id, status = false) {
    const checked = status ? 'checked' : '';

    displayTaks(id, todo, checked);

    this.TodoList.push({
      index: id,
      description: todo,
      completed: false,
    });

    localStorage.setItem('todos', JSON.stringify(this.TodoList));
  }

  completeTodo(element) {
    if (element.checked) {
      element.removeAttribute('checked');
    } else {
      element.setAttribute('checked', true);
    }
    element.parentNode.classList.toggle('done');
    this.TodoList[element.id].completed = !this.TodoList[element.id].completed;
    localStorage.setItem('todos', JSON.stringify(this.TodoList));
  }

  removeTodo(element) {
    const cuurId = parseInt(element.id, 10);

    this.TodoList = this.TodoList.filter((todo) => todo.index !== cuurId);

    for (let i = cuurId; i < this.TodoList.length; i += 1) {
      this.TodoList[i].index -= 1;
    }
    element.parentNode.parentNode.replaceChildren('');
    this.renderTodos();
    localStorage.setItem('todos', JSON.stringify(this.TodoList));
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

        localStorage.setItem('todos', JSON.stringify(this.TodoList));
      }
    });
  }
}
