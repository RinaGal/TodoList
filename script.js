// Get input field, add button, task list, category select, sort select, and delete completed button
const inputField = document.querySelector('input[type="text"]');
const addButton = document.querySelector('button');
const taskList = document.querySelector('#task-list');
const categorySelect = document.querySelector('#category');
const sortSelect = document.querySelector('#sort'); // Select for sorting tasks
const deleteCompletedButton = document.querySelector('#delete-completed'); // New button for deleting completed tasks

// Array to store all tasks
let tasks = [];

// Save tasks to localStorage
function saveTasks() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Load tasks from localStorage
function loadTasks() {
    const savedTasks = JSON.parse(localStorage.getItem('tasks'));
    if (savedTasks) {
        tasks = savedTasks;
        renderTasks();
    }
}

// Show tasks in the list
function renderTasks() {
    taskList.innerHTML = ''; // Clear the current list
    tasks.forEach(task => createTaskElement(task));
}

// Create a new task element
function createTaskElement(task) {
    // Create a new list item (li)
    const newTask = document.createElement('li');

    // Create a span for the task text
    const taskSpan = document.createElement('span');
    taskSpan.textContent = task.text;

    // Create a span for the category
    const categorySpan = document.createElement('span');
    categorySpan.textContent = task.category;
    categorySpan.classList.add('category');
    categorySpan.style.marginLeft = '10px';
    categorySpan.style.fontStyle = 'italic';
    categorySpan.style.color = '#888';

    // Create the delete button
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.style.marginLeft = '10px';
    deleteButton.style.backgroundColor = '#e74c3c';
    deleteButton.style.color = 'white';
    deleteButton.style.border = 'none';
    deleteButton.style.cursor = 'pointer';
    deleteButton.style.borderRadius = '5px';

    // Create the edit button
    const editButton = document.createElement('button');
    editButton.textContent = 'Edit';
    editButton.style.marginLeft = '10px';
    editButton.style.backgroundColor = '#3498db';
    editButton.style.color = 'white';
    editButton.style.border = 'none';
    editButton.style.cursor = 'pointer';
    editButton.style.borderRadius = '5px';

    // Create the complete button
    const completeButton = document.createElement('button');
    completeButton.textContent = task.completed ? 'Uncomplete' : 'Complete';
    completeButton.style.marginLeft = '10px';
    completeButton.style.backgroundColor = task.completed ? '#95a5a6' : '#2ecc71';
    completeButton.style.color = 'white';
    completeButton.style.border = 'none';
    completeButton.style.cursor = 'pointer';
    completeButton.style.borderRadius = '5px';

    // If task is completed, style it differently
    if (task.completed) {
        newTask.classList.add('completed');
        taskSpan.style.textDecoration = 'line-through';
    }

    // Add all elements to the new task (li)
    newTask.appendChild(taskSpan);
    newTask.appendChild(categorySpan);
    newTask.appendChild(completeButton);
    newTask.appendChild(editButton);
    newTask.appendChild(deleteButton);

    // Add the new task to the task list (ul)
    taskList.appendChild(newTask);

    // Delete the task
    deleteButton.addEventListener('click', function() {
        // Remove task from array
        tasks = tasks.filter(t => t !== task);
        
        // Save updated tasks to localStorage
        saveTasks();
        
        // Re-render tasks to reflect changes
        renderTasks();
    });

    // Edit the task
    editButton.addEventListener('click', function() {
        const newText = prompt('Edit your task:', task.text);
        if (newText !== null && newText.trim() !== '') {
            task.text = newText; // Update the task text in memory
            saveTasks();
            renderTasks(); // Re-render tasks to reflect changes
        }
    });

    // Mark the task as complete or incomplete
    completeButton.addEventListener('click', function() {
        task.completed = !task.completed; // Toggle completed status
        saveTasks();
        renderTasks(); // Re-render tasks to reflect changes
    });
}

// Add new task when the "Add" button is clicked
addButton.addEventListener('click', function() {
    const taskText = inputField.value; // Get task text
    const taskCategory = categorySelect.value; // Get selected category

    // Check if the input is empty
    if (taskText === '') {
        alert('Please enter a task');
        return;
    }

    // Check if a category is selected
    if (taskCategory === '') {
        alert('Please select a category');
        return;
    }

    // Create new task object
    const newTask = {
        text: taskText,
        category: taskCategory,
        completed: false,
        timestamp: Date.now()
    };

    // Add the task to array and save
    tasks.push(newTask);
    saveTasks();
    createTaskElement(newTask); // Create a new task element

    inputField.value = ''; // Clear the input field
    categorySelect.value = ''; // Reset the category selection
});

// Delete all completed tasks when the "Delete Completed Tasks" button is clicked
deleteCompletedButton.addEventListener('click', function() {
    // Remove completed tasks from the tasks array
    tasks = tasks.filter(task => !task.completed);

    // Save updated tasks to localStorage
    saveTasks();

    // Re-render tasks
    renderTasks();
});

// Sort tasks based on selected type
function sortTasks(type) {
    switch (type) {
        case 'alphabetical':
            tasks.sort((a, b) => a.text.localeCompare(b.text)); // Sort by text A-Z
            break;
        case 'reverse-alphabetical':
            tasks.sort((a, b) => b.text.localeCompare(a.text)); // Sort by text Z-A
            break;
        case 'category':
            tasks.sort((a, b) => a.category.localeCompare(b.category)); // Sort by category
            break;
        case 'date':
            tasks.sort((a, b) => a.timestamp - b.timestamp); // Sort by date (oldest first)
            break;
        case 'date-reverse':
            tasks.sort((a, b) => b.timestamp - a.timestamp); // Sort by date (newest first)
            break;
        default:
            break;
    }
    renderTasks(); // Re-render tasks after sorting
}

// When the sort type is changed, sort tasks
sortSelect.addEventListener('change', function() {
    sortTasks(this.value);
});

// Load tasks when the page loads
loadTasks();
