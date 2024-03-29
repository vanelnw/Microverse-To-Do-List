function displayTasks(id, todo, checked) {
  const listTodo = document.getElementById('todo-lists');
  const done = checked ? 'done' : '';
  const item = `
    <li class="task ${done}" id="item">  
              <div>     
                <input type="checkbox" id=${id} name="checkbox" ${checked}/>
                <input type="text" id="Todo" class="label input_field" value=${todo} name="todo" readonly/>
              </div>
              <i class="fa-solid fa-ellipsis-vertical" id=${id} name="update"></i>
            </li>
    `;
  listTodo.insertAdjacentHTML('beforeend', item);
}

export default displayTasks;
