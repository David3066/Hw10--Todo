require('dotenv').config();
const express = require('express');
const path = require('path');
const createDatabaseProvider = require('./database/factory');

const app = express();
let db;

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// View engine setup
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

// Initialize database connection
async function initDatabase() {
  try {
    db = createDatabaseProvider();
    await db.connect();
    console.log(`Using ${process.env.DB_TYPE} database`);
  } catch (error) {
    console.error('Failed to initialize database:', error);
    process.exit(1);
  }
}

// Routes

// GET - Display all todos
app.get('/', async (req, res) => {
  try {
    const todos = await db.getAllTodos();
    res.render('index', { todos });
  } catch (error) {
    console.error('Error loading todos:', error);
    res.render('index', { todos: [], error: 'Failed to load todos' });
  }
});

// POST - Add a new todo
app.post('/add-todo', async (req, res) => {
  try {
    const { task } = req.body;

    if (!task || task.trim() === '') {
      return res.redirect('/');
    }

    await db.addTodo(task.trim());
    res.redirect('/');
  } catch (error) {
    console.error('Error adding todo:', error);
    res.redirect('/');
  }
});

// POST - Toggle todo completion status
app.post('/toggle-todo/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { isComplete } = req.body;

    const isCompleteBoolean = isComplete === 'true' || isComplete === true;
    await db.updateTodo(id, isCompleteBoolean);

    res.redirect('/');
  } catch (error) {
    console.error('Error updating todo:', error);
    res.redirect('/');
  }
});

// POST - Delete a todo
app.post('/delete-todo/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await db.deleteTodo(id);
    res.redirect('/');
  } catch (error) {
    console.error('Error deleting todo:', error);
    res.redirect('/');
  }
});

// Start server
const PORT = process.env.PORT || 3000;

initDatabase().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
  });
});
