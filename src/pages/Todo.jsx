import "../App.css";
import { useState, useEffect } from "react";
import { TodoForm } from "../components/TodoForm";
import { TodoList } from "../components/TodoList";

function Todo() {
  const [todos, setTodos] = useState([]);
  const [list, setList] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState("all");

  useEffect(() => {
    filterTodos(selectedFilter);
  }, [todos, selectedFilter]);

  const filterTodos = (filter) => {
    switch (filter) {
      case "all":
        setList(todos);
        break;
      case "completed":
        setList(todos.filter((todo) => todo.completed === true));
        break;
      case "uncompleted":
        setList(todos.filter((todo) => todo.completed === false));
        break;
      default:
        setList(todos);
    }
  };

  const handleFilterChange = (event) => {
    setSelectedFilter(event.target.value);
  };

  function addTodo(title) {
    setTodos((currentTodos) => [
      ...currentTodos,
      { id: crypto.randomUUID(), title, completed: false },
    ]);
  }

  function toggleTodo(id, completed) {
    setTodos((currentTodos) =>
      currentTodos.map((todo) =>
        todo.id === id ? { ...todo, completed } : todo
      )
    );
  }

  function deleteTodo(id) {
    setTodos((currentTodos) => currentTodos.filter((todo) => todo.id !== id));
  }

  function editTodo(id, newTitle) {
    setTodos((currentTodos) =>
      currentTodos.map((todo) =>
        todo.id === id ? { ...todo, title: newTitle } : todo
      )
    );
  }

  return (
    <>
      <div className="main">
        <TodoForm addTodo={addTodo} />
      <div>
        <div className="select">
          <select
            name="todos"
            className="filter-todo"
            value={selectedFilter}
            onChange={handleFilterChange}
          >
            <option value="all">All</option>
            <option value="completed">Completed</option>
            <option value="uncompleted">Active</option>
          </select>
        </div>
      </div>
      <TodoList
        todos={list}
        toggleTodo={toggleTodo}
        deleteTodo={deleteTodo}
        editTodo={editTodo}
      />
      </div>
      
    </>
  );
}

export default Todo;
