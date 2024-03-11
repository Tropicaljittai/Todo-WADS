import "./App.css";
import Todo from "./pages/Todo";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useEffect, useState } from "react";
import Welcome from "./components/Welcome";
import Profile from "./pages/Profile";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Welcome />} exact />
        <Route path="/profile" element={<Profile />} />
        <Route path="/todo" element={<Todo />} />
      </Routes>
    </Router>

    // <Todo />
  );
}

export default App;
