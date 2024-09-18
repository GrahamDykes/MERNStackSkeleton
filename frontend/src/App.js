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

  const deleteTodo = async (e) => {
    let deleteTarget = e.target.value

    try {
      console.log('Frontend is sending:\n', e.target.value)
      const response = await axios.delete(`http://localhost:5000/todos/${deleteTarget}`);
      // onAdd(response.data);
      // setTask('');
    } catch (error) {
      console.error(error);
    }

    setTodos(todos => todos.filter((u) => u._id !== deleteTarget));
  };

  return (
    <div>
      <h1>MERN Stack Todo App</h1>
      <TodoForm onAdd={addTodo} />
      <ul className='todoul'>
        {todos.map((todo) => (
          <li key={todo._id}>
            {todo.task}
            {<button onClick={deleteTodo} value={todo._id}>X</button>}
            {todo.completed===false?<p>NotDone</p>:<p>Done</p>}
            </li>
        ))}
      </ul>
    </div>
  );
};
export default App;