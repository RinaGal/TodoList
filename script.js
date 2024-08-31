// script.js

document.getElementById('add-task-btn').addEventListener('click', function() {
    const taskText = document.getElementById('new-task').value;
    if (taskText === '') return;

    const taskItem = document.createElement('li');
    taskItem.className = 'task-item';
    taskItem.textContent = taskText;

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.addEventListener('click', function() {
        taskItem.remove();
    });

    taskItem.appendChild(deleteBtn);
    document.getElementById('task-list').appendChild(taskItem);

    document.getElementById('new-task').value = ''; // Очистка поля ввода
});
