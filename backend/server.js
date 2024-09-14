const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 5000;

const todoSchema = new mongoose.Schema({
    task: String,
    completed: Boolean,
  });
  const Todo = mongoose.model('Todo', todoSchema);

  app.get('/todos', async (req, res) => {
    const todos = await Todo.find();
    res.json(todos);
  });

// Create a new todo
app.post('/todos', async (req, res) => {
    const newTodo = new Todo(req.body);
    await newTodo.save();
    res.json(newTodo);
  });
  // Update an existing todo
  app.put('/todos/:id', async (req, res) => {
    const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedTodo);
  });
  // Delete a todo
  app.delete('/todos/:id', async (req, res) => {
    await Todo.findByIdAndRemove(req.params.id);
    res.json({ message: 'Todo deleted successfully' });
  });



app.use(cors());
app.use(express.json());
// Connect to MongoDB
mongoose.connect(`mongodb+srv://grahamdykes:<lQvKJDBj7YQviHmZ>@skeleton.uqb84.mongodb.net/`, { useNewUrlParser: true, useUnifiedTopology: true });
// Define routes and middleware
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

// mongoose angry! even old project isnt working properly heh