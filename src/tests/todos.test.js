const displayTaks = jest.fn();
jest.mock("./displayTsks", () => displayTaks);

const getTasksFromLocalStorage = jest.fn(() => []);
const addToLocalStorage = jest.fn();
jest.mock("./localStorage", () => ({
  getTasksFromLocalStorage,
  addToLocalStorage,
}));

const Todos = require("./todos").default;

describe("Todos class", () => {
  let todos;
  beforeEach(() => {
    todos = new Todos();
  });

  test("should call getTasksFromLocalStorage on construction", () => {
    expect(getTasksFromLocalStorage).toHaveBeenCalled();
  });

  test("should call displayTaks on renderTodos", () => {
    todos.TodoList = [
      { index: 0, description: "Todo 1", completed: false },
      { index: 1, description: "Todo 2", completed: true },
    ];
    todos.renderTodos();
    expect(displayTaks).toHaveBeenCalledWith(0, "Todo 1", "");
    expect(displayTaks).toHaveBeenCalledWith(1, "Todo 2", "checked");
  });

  test("should call addToLocalStorage on addTodoTask", () => {
    document.getElementById = jest.fn(() => ({ value: "Todo 1" }));
    todos.addTodoTask();
    expect(displayTaks).toHaveBeenCalledWith(0, "Todo 1", false);
    expect(todos.TodoList).toEqual([
      { index: 0, description: "Todo 1", completed: false },
    ]);
    expect(addToLocalStorage).toHaveBeenCalledWith([
      { index: 0, description: "Todo 1", completed: false },
    ]);
  });

  test("should call addToLocalStorage on addTodo", () => {
    todos.addTodo("Todo 1", 0);
    expect(displayTaks).toHaveBeenCalledWith(0, "Todo 1", "");
    expect(todos.TodoList).toEqual([
      { index: 0, description: "Todo 1", completed: false },
    ]);
    expect(addToLocalStorage).toHaveBeenCalledWith([
      { index: 0, description: "Todo 1", completed: false },
    ]);
  });
});
