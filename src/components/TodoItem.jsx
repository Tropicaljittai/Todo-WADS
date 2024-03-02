export function TodoItem({ completed, id, title, toggleTodo, deleteTodo, editTodo }) {
  return (
    <li>
      <div id="lol">
        <label>
          <input
            type="checkbox"
            checked={completed}
            onChange={(e) => toggleTodo(id, e.target.checked)}
          />
          {title}
          <button className="btn btn-danger" onClick={() => deleteTodo(id)}>
            Delete
          </button>
          <button className="btn edit-danger" onClick={() => editTodo(id)}>
            Edit
          </button>
        </label>
      </div>
      
    </li>
  );
}
