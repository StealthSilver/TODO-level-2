const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

let tasks = [];


app.get('/tasks', (req, res) => {
    res.json(tasks);
});

app.post('/tasks', (req, res) => {
    const { title } = req.body;
    if (!title) {
        return res.status(400).json({ error: "Task title is required" });
    }
    const task = { id: Date.now(), title, completed: false };
    tasks.push(task);
    res.status(201).json(task);
});


app.delete('/tasks/:id', (req, res) => {
    const { id } = req.params;
    tasks = tasks.filter(task => task.id !== parseInt(id));
    res.status(200).json({ message: 'Task deleted successfully' });
});


app.patch('/tasks/:id', (req, res) => {
    const { id } = req.params;
    const task = tasks.find(task => task.id === parseInt(id));
    if (task) {
        task.completed = !task.completed;
        return res.json(task);
    }
    res.status(404).json({ error: 'Task not found' });
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});