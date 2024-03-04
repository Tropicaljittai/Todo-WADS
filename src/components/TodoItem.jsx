import React, { useState } from "react";
import { CiEdit } from "react-icons/ci";
import { FaRegTrashAlt } from "react-icons/fa";


export function TodoItem({completed, id, title, toggleTodo, deleteTodo, editTodo,}) 
  {
  const [editing, setEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(title);

  const handleEdit = () => {
    if (newTitle.trim() !== "") {
      editTodo(id, newTitle);
      setEditing(false);
    }
  };

  return (
    <li>
      {editing ? (
        <input
          className="input-edit"
          type="text"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          onKeyDown={event => {
            if (event.key === 'Enter') {
              handleEdit()
            }
          }}
          autoFocus
        />
      ) : (
        <div className="item-todo">            
            <div>
              <label className="labelList">
                <input
              className="todo-checkbox"
              type="checkbox"
              checked={completed}
              onChange={(e) => toggleTodo(id, e.target.checked)}
            />
            {title}
            </label>
            
            </div>
            

            <div className="buttons">
              <button className="btnred bg-red-500/50 hover:bg-red-700 py-2 px-2 rounded" onClick={() => deleteTodo(id)}>
              <FaRegTrashAlt size={"2em"} color="red" />
              </button>

              <button
                className="bg-black hover:bg-slate-500	 py-2 px-2 rounded"
                onClick={() => setEditing(true)}>
                <CiEdit size={"2em"}/>
              </button>
            </div>   
        </div>
        
      )}
    </li>
  );
}