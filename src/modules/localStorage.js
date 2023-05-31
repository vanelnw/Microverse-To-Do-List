const getTasksFromLocalStorage = () => {
  const myTasks = JSON.parse(localStorage.getItem('todos')) || [];
  return myTasks;
};

const addToLocalStorage = (todos) => {
  localStorage.setItem('todos', JSON.stringify(todos));
};

export { getTasksFromLocalStorage, addToLocalStorage };
