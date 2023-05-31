import displayTasks from '../modules/displayTasks';

describe('displayTasks function', () => {
  test('should create a new task item in the list with the correct values', () => {
    // Arrange
    document.body.innerHTML = `
      <ul id="todo-lists"></ul>
    `;
    const id = 0;
    const todo = 'Test-task';
    const checked = false;

    // Act
    displayTasks(id, todo, checked);

    // Assert
    const taskItem = document.querySelector('.task');
    expect(taskItem).toBeTruthy();
    expect(taskItem.querySelector('input[type="checkbox"]').getAttribute('id')).toBe('0');
    expect(taskItem.querySelector('input[type="checkbox"]').getAttribute('name')).toBe('checkbox');
    expect(taskItem.querySelector('input[type="checkbox"]').getAttribute('checked')).toBeFalsy();
    expect(taskItem.querySelector('input[type="text"]').getAttribute('class')).toContain('label');
    expect(taskItem.querySelector('input[type="text"]').getAttribute('name')).toBe('todo');
    expect(taskItem.querySelector('input[type="text"]').getAttribute('value')).toBe('Test-task');
    expect(taskItem.querySelector('i').getAttribute('id')).toBe('0');
    expect(taskItem.querySelector('i').getAttribute('name')).toBe('update');
  });

  test('should create a new task item with the "done" class when checked is true', () => {
    // Arrange
    document.body.innerHTML = `
      <ul id="todo-lists"></ul>
    `;
    const id = 0;
    const todo = 'Test-task';
    const checked = true;

    // Act
    displayTasks(id, todo, checked);

    // Assert
    const taskItem = document.querySelector('#todo-lists li');
    expect(taskItem).toBeDefined();
    expect(taskItem.classList).toContain('task');
    expect(taskItem.classList).toContain('done');
    expect(taskItem.getAttribute('id')).toBe('item');
    expect(taskItem.querySelector('input[type="checkbox"]').getAttribute('id')).toBe('0');
    expect(taskItem.querySelector('input[type="checkbox"]').getAttribute('name')).toBe('checkbox');
    //  expect(taskItem.querySelector('input[type="checkbox"]').checked).toBe('null');

    expect(taskItem.querySelector('input[type="text"]').getAttribute('id')).toBe('Todo');
    expect(taskItem.querySelector('input[type="text"]').getAttribute('class')).toContain('label');
    expect(taskItem.querySelector('input[type="text"]').getAttribute('name')).toBe('todo');
    expect(taskItem.querySelector('input[type="text"]').getAttribute('value')).toBe('Test-task');
    expect(taskItem.querySelector('i').getAttribute('id')).toBe('0');
    expect(taskItem.querySelector('i').getAttribute('name')).toBe('update');
  });
});
