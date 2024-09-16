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

app.use(cors());


//this cors setup should work in future projects
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


  app.get('/todos', async (req, res) => {
    const todos = await Todo.find();
    res.json(todos);
  });

// Create a new todo
app.post('/todos', async (req, res) => {
  console.log('Task:/n', req.task)
  let tasky = req.task
  console.log('Tasky:/n', tasky)
  // fucking promise?? read up on this broooo
  //    https://stackoverflow.com/questions/59632734/promises-in-js-using-axios-to-write-to-mongodb
  // document not saving task at all. not even blank
    const newTodo = new Todo( {task: tasky, completed:false} );
    await newTodo.save();
    console.log('mongo:/n', newTodo)
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



app.use(express.json());
// Connect to MongoDB


// Define routes and middleware
app.listen(PORT, () => {
  mongoose.connect(`mongodb+srv://grahamdykes:lQvKJDBj7YQviHmZ@skeleton.uqb84.mongodb.net/`)
  .then(()=>console.log('Connected to DataBase'))
  .catch(()=>console.log('DataBase failure'))
  console.log(`Server is running on port ${PORT}`);
});
