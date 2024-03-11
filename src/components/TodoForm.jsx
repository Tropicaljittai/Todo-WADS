import { useState } from "react";
import {db} from '../firebase';
import {collection, addDoc, Timestamp} from 'firebase/firestore';

export function TodoForm({ addTodo }) {
  const [newItem, setNewItem] = useState("");

  function handleSubmit(e) {
    e.preventDefault();

    if (newItem === "") return;

    addTodo(newItem);
    setNewItem("");
  }

  return (
    <div>
      <form className="new-item-form">
        <div className="form-row">
          <label className ={"text-2xl"}htmlFor="item">Let's list down today's activities</label>
          <p>Joseph Ruys</p>
          <p>2602116964</p>
          <input
            type="text"
            id="item"
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
          />
        </div>
        <button className="btn" onClick={handleSubmit}>
          Add
        </button>
      </form>
    </div>
  );
}