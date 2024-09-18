// Get the input field, button, and task list
const inputField = document.querySelector('input[type="text"]');
const addButton = document.querySelector('button');
const taskList = document.querySelector('#task-list');
const categorySelect = document.querySelector('#category');

// Function to save tasks to localStorage
function saveTasks() {
    const tasks = [];
    document.querySelectorAll('#task-list li').forEach(taskItem => {
        const taskText = taskItem.querySelector('span').textContent;
        const taskCategory = taskItem.querySelector('.category').textContent;
        const isCompleted = taskItem.classList.contains('completed');
        tasks.push({ text: taskText, category: taskCategory, completed: isCompleted });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function to load tasks from localStorage
function loadTasks() {
    const savedTasks = JSON.parse(localStorage.getItem('tasks'));
    if (savedTasks) {
        savedTasks.forEach(task => {
            addTask(task.text, task.category, task.completed);
        });
    }
}

// Function to add a task
function addTask(taskText, taskCategory, isCompleted = false) {
    const newTask = document.createElement('li');

    const taskSpan = document.createElement('span');
    taskSpan.textContent = taskText;

    const categorySpan = document.createElement('span');
    categorySpan.textContent = taskCategory;
    categorySpan.classList.add('category');
    categorySpan.style.marginLeft = '10px';
    categorySpan.style.fontStyle = 'italic';
    categorySpan.style.color = '#888';

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
    completeButton.style.backgroundColor = isCompleted ? '#95a5a6' : '#2ecc71';
    completeButton.style.color = 'white';
    completeButton.style.border = 'none';
    completeButton.style.cursor = 'pointer';
    completeButton.style.borderRadius = '5px';

    if (isCompleted) {
        newTask.classList.add('completed');
        taskSpan.style.textDecoration = 'line-through';
    }

    newTask.appendChild(taskSpan);
    newTask.appendChild(categorySpan);
    newTask.appendChild(completeButton);
    newTask.appendChild(editButton);
    newTask.appendChild(deleteButton);

    taskList.appendChild(newTask);

    // Delete task
    deleteButton.addEventListener('click', function() {
        taskList.removeChild(newTask);
        saveTasks();
    });

    // Edit task
    editButton.addEventListener('click', function() {
        const newText = prompt('Edit your task:', taskSpan.textContent);
        if (newText !== null && newText.trim() !== '') {
            taskSpan.textContent = newText;
            saveTasks();
        }
    });

    // Mark task as complete/incomplete
    completeButton.addEventListener('click', function() {
        newTask.classList.toggle('completed');
        const isNowCompleted = newTask.classList.contains('completed');
        taskSpan.style.textDecoration = isNowCompleted ? 'line-through' : 'none';
        completeButton.textContent = isNowCompleted ? 'Uncomplete' : 'Complete';
        completeButton.style.backgroundColor = isNowCompleted ? '#95a5a6' : '#2ecc71';
        saveTasks();
    });

    saveTasks();
}

// Add new task on button click
addButton.addEventListener('click', function() {
    const taskText = inputField.value;
    const taskCategory = categorySelect.value;

    if (taskText === '') {
        alert('Please enter a task');
        return;
    }

    if (taskCategory === '') {
        alert('Please select a category');
        return;
    }

    addTask(taskText, taskCategory);

    // Сброс поля ввода и категории
    inputField.value = ''; // Clear the input field
    categorySelect.value = ''; // Reset the category selection
});

// Load tasks from localStorage when the page loads
loadTasks();
