let tasks = [];

// Add a new task
function addTask() {
    const taskInput = document.getElementById('task-input').value;
    const taskDate = document.getElementById('task-date').value;
    
    if (taskInput === '') {
        alert('Please enter a task');
        return;
    }

    const task = {
        id: Date.now(),
        text: taskInput,
        date: taskDate,
        completed: false
    };

    tasks.push(task);
    document.getElementById('task-input').value = '';
    document.getElementById('task-date').value = '';

    renderTasks();
}

// Render the tasks to the UI
function renderTasks() {
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = '';

    tasks.forEach(task => {
        const li = document.createElement('li');
        li.className = task.completed ? 'completed' : '';
        li.innerHTML = `
            <span>${task.text} <small>${task.date ? `(Due: ${new Date(task.date).toLocaleString()})` : ''}</small></span>
            <div>
                <button onclick="toggleComplete(${task.id})">Complete</button>
                <button onclick="editTask(${task.id})">Edit</button>
                <button class="delete-btn" onclick="deleteTask(${task.id})">Delete</button>
            </div>
        `;
        taskList.appendChild(li);
    });
}

// Mark task as complete/incomplete
function toggleComplete(taskId) {
    tasks = tasks.map(task => {
        if (task.id === taskId) {
            task.completed = !task.completed;
        }
        return task;
    });

    renderTasks();
}

// Edit a task
function editTask(taskId) {
    const newTaskText = prompt('Edit your task');
    const newTaskDate = prompt('Edit your task date (YYYY-MM-DDTHH:MM)', '');

    tasks = tasks.map(task => {
        if (task.id === taskId) {
            task.text = newTaskText || task.text;
            task.date = newTaskDate || task.date;
        }
        return task;
    });

    renderTasks();
}

// Delete a task
function deleteTask(taskId) {
    tasks = tasks.filter(task => task.id !== taskId);
    renderTasks();
}

// Clear all tasks
function clearAllTasks() {
    tasks = [];
    renderTasks();
}
