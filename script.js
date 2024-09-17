// Get the input field
const inputField = document.querySelector('input[type="text"]');

// Get the button
const addButton = document.querySelector('button');

// Get the task list (ul)
const taskList = document.querySelector('#task-list');

// Function to save tasks to localStorage
function saveTasks() {
    const tasks = [];
    document.querySelectorAll('#task-list li').forEach(taskItem => {
        const taskText = taskItem.querySelector('span').textContent;
        const isCompleted = taskItem.classList.contains('completed'); // Check if task is completed
        tasks.push({ text: taskText, completed: isCompleted });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function to load tasks from localStorage
function loadTasks() {
    const savedTasks = JSON.parse(localStorage.getItem('tasks'));
    if (savedTasks) {
        savedTasks.forEach(task => {
            addTask(task.text, task.completed); // Load task with its completed status
        });
    }
}

// Function to add a task (used for both adding and loading tasks)
function addTask(taskText, isCompleted = false) {
    const newTask = document.createElement('li');

    const taskSpan = document.createElement('span');
    taskSpan.textContent = taskText;

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.style.marginLeft = '10px';
    deleteButton.style.backgroundColor = '#e74c3c';
    deleteButton.style.color = 'white';
    deleteButton.style.border = 'none';
    deleteButton.style.cursor = 'pointer';
    deleteButton.style.borderRadius = '5px';

    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.style.marginLeft = '10px';
    editButton.style.backgroundColor = '#3498db';
    editButton.style.color = 'white';
    editButton.style.border = 'none';
    editButton.style.cursor = 'pointer';
    editButton.style.borderRadius = '5px';

    const completeButton = document.createElement('button');
    completeButton.textContent = isCompleted ? 'Uncomplete' : 'Complete';
    completeButton.style.marginLeft = '10px';
    completeButton.style.backgroundColor = isCompleted ? '#95a5a6' : '#2ecc71'; // Gray for completed, green for incomplete
    completeButton.style.color = 'white';
    completeButton.style.border = 'none';
    completeButton.style.cursor = 'pointer';
    completeButton.style.borderRadius = '5px';

    // Apply completed style if task is already completed
    if (isCompleted) {
        newTask.classList.add('completed');
        taskSpan.style.textDecoration = 'line-through'; // Strikethrough for completed task
    }

    newTask.appendChild(taskSpan);
    newTask.appendChild(completeButton);
    newTask.appendChild(editButton);
    newTask.appendChild(deleteButton);

    taskList.appendChild(newTask);

    // Delete task
    deleteButton.addEventListener('click', function() {
        taskList.removeChild(newTask);
        saveTasks(); // Save tasks after deletion
    });

    // Edit task
    editButton.addEventListener('click', function() {
        const newText = prompt('Edit your task:', taskSpan.textContent);
        if (newText !== null && newText.trim() !== '') {
            taskSpan.textContent = newText;
            saveTasks(); // Save tasks after editing
        }
    });

    // Mark task as complete/incomplete
    completeButton.addEventListener('click', function() {
        newTask.classList.toggle('completed');
        const isNowCompleted = newTask.classList.contains('completed');
        taskSpan.style.textDecoration = isNowCompleted ? 'line-through' : 'none';
        completeButton.textContent = isNowCompleted ? 'Uncomplete' : 'Complete';
        completeButton.style.backgroundColor = isNowCompleted ? '#95a5a6' : '#2ecc71';
        saveTasks(); // Save tasks after marking as completed/incomplete
    });

    saveTasks(); // Save tasks after adding
}

// Add new task on button click
addButton.addEventListener('click', function() {
    const taskText = inputField.value;

    if (taskText === '') {
        alert('Please enter a task');
        return;
    }

    addTask(taskText); // Add the task

    inputField.value = ''; // Clear the input field
});

// Load tasks from localStorage when the page loads
loadTasks();
