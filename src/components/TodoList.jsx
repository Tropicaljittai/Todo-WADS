import React from "react";
import { TodoItem } from "./TodoItem";
import { useState } from "react";


export function TodoList({ todos, toggleTodo, deleteTodo, editTodo}) {
  
  return (
    
    <div className="listContainer">
      <h1 className="header">Todo List</h1>
      <ul className="list">
        {todos.length === 0 && "No todos"}
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            {...todo}
            toggleTodo={toggleTodo}
            deleteTodo={deleteTodo}
            editTodo={editTodo}
          />
        ))}
      </ul>
    </div>
  );
}