import React, { useState, useEffect } from "react";
import axios from "axios";
import TodoForm from "./TodoForm";
import "./App.css";

const App = () => {
  const [todos, setTodos] = useState([]);

  const addTodo = (newTodo) => {
    setTodos([...todos, newTodo]);
  };

  // const onAdd = (updatedTodo) => {
  //   setTodos((prevTodos) => 
  //     prevTodos.map((todo) => 
  //       todo._id === updatedTodo._id ? updatedTodo : todo
  //     )
  //   );
  // };

  useEffect(() => {
    // Fetch data from the Express server
    axios
      .get("http://localhost:5000/todos")
      .then((response) => setTodos(response.data))
      .catch((error) => console.error(error));
  }, []);

  const deleteTodo = async (e) => {
    let deleteTarget = e.target.value;
    try {
      console.log("Frontend is sending:\n", e.target.value);
      const response = await axios.delete(
        `http://localhost:5000/todos/${deleteTarget}`
      );
      // onAdd(response.data);
      // setTask('');
      console.log('delete await complete')
      console.log('delete response:\n', response)
    } catch (error) {
      console.error(error);
    }
    setTodos((todos) => todos.filter((u) => u._id !== deleteTarget));
  };

  const updateTodo = async (e) => {
    let updatingTarget = e.target.value;
    // console.log("e.target:\n", e.target);
    // console.log("e.target.value:\n", e.target.value);
    try {
      console.log("Frontend update sending:\n", e.target.value);
      const response = await axios.put(
        `http://localhost:5000/todos/${updatingTarget}`
      );
      console.log('update await complete')
      console.log("update response:\n", response);
      setTodos(response.data.todos)
      // setTask('');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>MERN Stack Todo App</h1>
      <TodoForm onAdd={addTodo} />
      <ul className="todoul">
        {todos.map((todo) => (
          <li key={todo._id}>
            {todo.task}
            {
              <button onClick={deleteTodo} value={todo._id}>
                X
              </button>
            }
            {todo.completed === false ? (
              <button onClick={updateTodo} value={todo._id}>
                NotDone
              </button>
            ) : (
              <button onClick={updateTodo} value={todo._id}>
                Done
              </button>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};
export default App;
