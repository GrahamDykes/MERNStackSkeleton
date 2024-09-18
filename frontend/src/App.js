import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TodoForm from './TodoForm';
import './App.css';


const App = () => {
const [todos, setTodos] = useState([]);

const addTodo = (newTodo) => {
    setTodos([...todos, newTodo]);
  };
  
  
  useEffect(() => {
    // Fetch data from the Express server
    axios.get('http://localhost:5000/todos')
      .then(response => setTodos(response.data))
      .catch(error => console.error(error));
  }, []);



  return (
    <div>
      <h1>MERN Stack Todo App</h1>
      <TodoForm onAdd={addTodo} />
      <ul className='todoul'>
        {todos.map((todo) => (
          <li key={todo._id}>{todo.task}{todo.completed===false?<p>NotDone</p>:<p>Done</p>}</li>
        ))}
      </ul>
    </div>
  );
};
export default App;