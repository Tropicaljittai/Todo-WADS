import "../App.css";
import { useState } from "react";
import { TodoForm } from "../components/TodoForm";
import { TodoList } from "../components/TodoList";


function Todo() {
  const [todos, setTodos] = useState([]);
  const [list, setList] = useState(todos);
  const [selectedFilter, setSelectedFilter] = useState('all');

  const noFilter = () => {
    setList(todos);
  };

  const handleFilterDone = () => {
    const filtered = todos.filter(todo => todo.completed == true);
    setList(filtered);
  };

  const handleFilterUndone = () => {
    const filtered = todos.filter(todo => todo.completed == false);
    setList(filtered);
  };

  const handleFilterChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedFilter(selectedValue);

    if (selectedValue === 'all') {
      noFilter()
    } else if (selectedValue === 'completed') {
      handleFilterDone()
    } else if (selectedValue === 'uncompleted') {
      handleFilterUndone()
    }
  };

  const checkSelect = (selectedValue, id) => {
    if (selectedValue === 'all') {
      noFilter()
    } else if (selectedValue === 'completed') {
      handleFilterDone()
    } else if (selectedValue === 'uncompleted') {
      handleFilterUndone()
    }
  };

  function addTodo(title) {
    setTodos((currentTodos) => {
      return [
        ...currentTodos,
        { id: crypto.randomUUID(), title, completed: false},
      ];
    });
    checkSelect(selectedFilter);
  }

  function toggleTodo(id, completed) {
    setTodos((currentTodos) => {
      return currentTodos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, completed };
        }
        return todo;
      });
    });
  }

  function toggle(id, completed) {
    toggleTodo(id, completed);
    checkSelect(selectedFilter);
  }


  function deleteTodo(id) {
    setTodos((currentTodos) => {
      return currentTodos.filter((todo) => todo.id !== id);
    });
    checkSelect(selectedFilter)
  }

  function editTodo(id, newTitle) {
    setTodos((currentTodos) =>
      currentTodos.map((todo) =>
        todo.id === id ? { ...todo, title: newTitle } : todo
      )
    );
    checkSelect(selectedFilter)
  }

  return (
    <>
      <TodoForm addTodo={addTodo} />
      <div>
        <div className="select">
          <select name="todos" className="filter-todo" value={selectedFilter} onChange={handleFilterChange}>
              <option value="all">All</option>
              <option value="completed">Completed</option>
              <option value="uncompleted">Active</option>
          </select>
        </div>
      </div>
      <TodoList todos={list} toggleTodo={toggle} deleteTodo={deleteTodo} editTodo={editTodo}/>
    </>
  );
}

export default Todo;
