import Todos from '../modules/todos';
import { getTasksFromLocalStorage, addToLocalStorage } from '../modules/localStorage';
import displayTasks from '../modules/displayTasks';

jest.mock('../modules/localStorage.js');
jest.mock('../modules/displayTasks.js', () => jest.fn());

describe('Todos class', () => {
  let todos;

  beforeEach(() => {
    todos = new Todos();
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('constructor', () => {
    it('should initialize TodoList with tasks from local storage', () => {
      expect(getTasksFromLocalStorage).toHaveBeenCalledTimes(1);
      expect(todos.TodoList).toEqual(getTasksFromLocalStorage());
    });
  });

  describe('renderTodos', () => {
    it('should sort TodoList by index and display each task using displayTasks function', () => {
      // Arrange
      const mockTasks = [{ index: 2, description: 'Task 2', completed: true }, { index: 1, description: 'Task 1', completed: false }];
      todos.TodoList = mockTasks;

      // Act
      todos.renderTodos();

      // Assert
      expect(todos.TodoList).toEqual(mockTasks.sort((a, b) => a.index - b.index));
      expect(displayTasks).toHaveBeenCalledTimes(2);
      expect(displayTasks).toHaveBeenCalledWith(1, 'Task 1', '');
      expect(displayTasks).toHaveBeenCalledWith(2, 'Task 2', 'checked');
    });
  });

  describe('addTodoTask', () => {
    it('should add a new task to TodoList and update local storage', () => {
      // Arrange
      const todo = 'New task';
      const mockTodoList = [{ index: 0, description: 'Task 1', completed: false }];
      todos.TodoList = mockTodoList;

      // Act
      todos.addTodoTask(todo);

      // Assert
      expect(displayTasks).toHaveBeenCalledTimes(1);
      expect(displayTasks).toHaveBeenCalledWith(1, 'New task', false);
      expect(todos.TodoList.length).toBe(2);
      expect(todos.TodoList[1]).toEqual({ index: 1, description: 'New task', completed: false });
      expect(addToLocalStorage).toHaveBeenCalledTimes(1);
      expect(addToLocalStorage).toHaveBeenCalledWith(todos.TodoList);
    });
  });

  describe('removeTodo', () => {
    it('should remove the specified todo from TodoList and update local storage', () => {
      // Arrange
      const mockTodoList = [{ index: 0, description: 'Task 1', completed: false }, { index: 1, description: 'Task 2', completed: true }, { index: 2, description: 'Task 3', completed: false }];
      todos.TodoList = mockTodoList;
      const expectedTodoList = [{ index: 0, description: 'Task 1', completed: false }, { index: 1, description: 'Task 3', completed: false }];

      // Act
      todos.removeTodo(1);

      // Assert
      expect(todos.TodoList).toEqual(expectedTodoList);
      expect(addToLocalStorage).toHaveBeenCalledTimes(1);
      expect(addToLocalStorage).toHaveBeenCalledWith(todos.TodoList);
    });
  });
});