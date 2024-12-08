const taskInput = document.getElementById('taskInput');
const addTaskButton = document.getElementById('addTaskButton');
const taskList = document.getElementById('taskList');

const API_URL = 'http://localhost:3000/tasks';

// Fetch tasks from server
const fetchTasks = async () => {
    const res = await fetch(API_URL);
    const tasks = await res.json();
    renderTasks(tasks);
};

// Add a task
const addTask = async () => {
    const title = taskInput.value.trim();
    if (title) {
        const res = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title }),
        });
        const newTask = await res.json();
        renderTasks([newTask], true);
        taskInput.value = '';
    }
};

// Delete a task
const deleteTask = async (id) => {
    await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    document.getElementById(id).remove();
};

// Toggle task completion
const toggleTaskCompletion = async (id) => {
    const res = await fetch(`${API_URL}/${id}`, { method: 'PATCH' });
    const updatedTask = await res.json();
    const taskElement = document.getElementById(id);
    taskElement.classList.toggle('completed', updatedTask.completed);
};

// Render tasks
const renderTasks = (tasks, append = false) => {
    if (!append) taskList.innerHTML = '';
    tasks.forEach(task => {
        const li = document.createElement('li');
        li.id = task.id;
        li.className = task.completed ? 'completed' : '';
        li.innerHTML = `
            ${task.title}
            <div>
                <button onclick="toggleTaskCompletion(${task.id})">✔</button>
                <button onclick="deleteTask(${task.id})">✖</button>
            </div>
        `;
        taskList.appendChild(li);
    });
};

addTaskButton.addEventListener('click', addTask);
taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addTask();
});

fetchTasks();