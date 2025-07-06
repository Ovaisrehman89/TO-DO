const express = require('express');
const app = express();
app.use(express.json());

const todoList = [
  { id: 1, title: "Assignment Submission", completed: false },
  { id: 2, title: "Attend Class", completed: true }
];

app.get('/', (req, res) => {
  res.json({ message: "TO-DO List", todos: todoList });
});

app.post('/todos', (req, res) => {
  const { title } = req.body;
  if (!title) return res.status(400).json({ error: 'Title is required' });

  const newTodo = {
    id: todoList.length ? todoList[todoList.length - 1].id + 1 : 1,
    title,
    completed: false
  };

  todoList.push(newTodo);
  res.status(201).json(newTodo);
});

app.put('/todos/:id', (req, res) => {
  const todoId = parseInt(req.params.id);
  const { title, completed } = req.body;
  const todo = todoList.find(t => t.id === todoId);
  if (!todo) return res.status(404).json({ error: 'Todo not found' });

  if (title !== undefined) todo.title = title;
  if (completed !== undefined) todo.completed = completed;

  res.json({ message: "Todo updated successfully", updatedTodo: todo });
});

app.patch('/todos/:id', (req, res) => {
  const todoId = parseInt(req.params.id);
  const { title, completed } = req.body;
  const todo = todoList.find(t => t.id === todoId);
  if (!todo) return res.status(404).json({ error: 'Todo not found' });

  if (title !== undefined) todo.title = title;
  if (completed !== undefined) todo.completed = completed;

  res.json({ message: "Todo partially updated", updatedTodo: todo });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`TO-DO server running on port ${PORT}`);
});
