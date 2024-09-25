// Task DOM elements
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');
const addBtn = document.getElementById('addBtn');

// Bootstrap Toast setup
const toastElement = document.getElementById('liveToast');
const toastBody = document.getElementById('toastBody');
const toast = new bootstrap.Toast(toastElement);

// Add task event listener
addBtn.addEventListener('click', addTask);

// Add task function
function addTask() {
    const taskText = taskInput.value.trim();
    
    if (taskText === "") {
        showToast("Boş görev eklenemez!");
        return;
    }

    // Create new task element
    const taskItem = document.createElement('li');
    taskItem.classList.add('list-group-item');
    taskItem.innerHTML = `
        <span class="task-text">${taskText}</span>
        <button class="btn-close" aria-label="Delete"></button>
    `;

    // Add event listener for marking task as completed
    taskItem.addEventListener('click', function() {
        this.classList.toggle('completed');
    });

    // Add event listener for deleting task
    taskItem.querySelector('.btn-close').addEventListener('click', function(e) {
        e.stopPropagation(); // Prevent task from being marked as done
        taskItem.remove();
    });

    // Add task to list
    taskList.appendChild(taskItem);
    taskInput.value = ''; // Clear input field
}

// Function to display toast notification
function showToast(message) {
    toastBody.textContent = message;
    toast.show();
}

// Prevent adding empty task by Enter key
taskInput.addEventListener('keydown', function(e) {
    if (e.key === 'Enter') {
        addTask();
    }
});
