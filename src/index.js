import './style.css';

const list = document.getElementById('list');

const TodoList = [
  {
    index: 1,
    description: 'DO dishes',
    completed: false,
  },

  {
    index: 3,
    description: 'clean house',
    completed: false,
  },

  {
    index: 2,
    description: 'go to supermarket',
    completed: false,
  },
];

function addTodo() {
  TodoList.sort((a, b) => a.index - b.index).forEach((todo) => {
    const item = `
  <li class="item">
            <div>
              <input type="checkbox" id=${todo.index} name="checkbox" />
              <span>${todo.description}</span>
            </div>
            <i class="fa-regular fa-ellipsis-vertical"></i>
          </li>
  `;

    list.insertAdjacentHTML('beforeend', item);
  });
}

window.onload = () => {
  addTodo();
};
