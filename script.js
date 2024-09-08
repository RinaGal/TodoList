// Get the input field
const inputField = document.querySelector('input[type="text"]');

// Get the button
const addButton = document.querySelector('button');

// Get the task list (ul)
const taskList = document.querySelector('#task-list');

// Function to add a new task
addButton.addEventListener('click', function() {
    const taskText = inputField.value;

    if (taskText === '') {
        alert('Please enter a task');
        return;
    }

    const newTask = document.createElement('li');
    newTask.textContent = taskText;

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.style.marginLeft = '10px';
    deleteButton.style.backgroundColor = '#e74c3c';
    deleteButton.style.color = 'white';
    deleteButton.style.border = 'none';
    deleteButton.style.cursor = 'pointer';
    deleteButton.style.borderRadius = '5px';
    deleteButton.style.height = '40px'; // Устанавливаем одинаковую высоту
    deleteButton.style.width = '100px'; // Устанавливаем ширину, если нужно

    newTask.appendChild(deleteButton);
    taskList.appendChild(newTask);
    inputField.value = '';

    deleteButton.addEventListener('click', function() {
        taskList.removeChild(newTask);
    });
});
