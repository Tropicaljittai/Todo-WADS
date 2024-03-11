import "../App.css";
import { useState, useEffect } from "react";
import { TodoForm } from "../components/TodoForm";
import { TodoList } from "../components/TodoList";
import {db, auth, useAuth} from '../firebase';
import { CiLogout } from "react-icons/ci";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import {collection, addDoc, Timestamp, query, onSnapshot, QuerySnapshot, updateDoc, doc, deleteDoc, setDoc, getDoc} from 'firebase/firestore';
import Avatar from "@mui/material/Avatar";

function Todo() {
  const currentUser = useAuth();
  const [photoURL, setPhotoURL] = useState("");
  const [todos, setTodos] = useState([]);
  const [list, setList] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState("all");
  const navigate = useNavigate();
  

  useEffect(() => {
    if (currentUser?.photoURL){
      setPhotoURL(currentUser.photoURL)
    }
  }, [currentUser])

  useEffect(() => {
    const unsubscribeAuth = auth.onAuthStateChanged(async (user) => {
        if (user) {
        const docSnap = await getDoc(doc(db, 'users', user.uid));

        if (docSnap.exists()) {
          console.log("Document already exists:", docSnap.data());
        } else {
          console.log("Document does not exist, creating new one...");
          await setDoc(doc(db, 'users', user.uid), {
            fName: null,
            lName: null,
            DOB: null,
            email: user.email,
          });
        }
          const q = query(collection(db, user.uid));
          const unsubscribeSnapshot = onSnapshot(q, (querySnapshot) => {
            let todosArr = [];
            querySnapshot.forEach((doc) => {
              todosArr.push({ ...doc.data(), id: doc.id });
            });
            setTodos(todosArr);
          });
    
          return () => unsubscribeSnapshot();
        }
      });
    
      return () => unsubscribeAuth();
  }, []);

  const profile = () => {
    navigate("/profile");
  };

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

  async function addTodo(title) {
    await addDoc(collection(db, auth.currentUser.uid), {
      title: title,
      completed: false
    })
    
  }

  async function toggleTodo(id, completed) {
    await updateDoc(doc(db, auth.currentUser.uid, id), {
      completed: completed
    })
  }

  async function deleteTodo(id) {
    await deleteDoc(doc(db, auth.currentUser.uid, id));
  }

  async function editTodo(id, newTitle) {
    await updateDoc(doc(db, auth.currentUser.uid, id), {
      title: newTitle
    })
  }

  return (
    <>
      <div className="profilePic" onClick={profile}>
        <Avatar src={photoURL} sx={{ width: 60, height: 60 }} />
      </div>
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
