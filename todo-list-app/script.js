const taskInput = document.getElementById("task-input");
const addBtn = document.getElementById("add-btn");
const taskList = document.getElementById("task-list");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

// Load tasks on page load
function loadTasks() {
    taskList.innerHTML = "";
    tasks.forEach((task, index) => {
        addTaskToDOM(task.text, task.completed, index);
    });
}

function addTaskToDOM(text, completed = false, index) {
    const li = document.createElement("li");
    li.classList.add("task");
    if (completed) li.classList.add("completed");

    li.innerHTML = `
        <span>${text}</span>
        <button class="complete-btn"><i class="fas fa-check"></i></button>
        <button class="edit-btn"><i class="fas fa-edit"></i></button>
        <button class="delete-btn"><i class="fas fa-trash"></i></button>
    `;

    // Complete task
    li.querySelector(".complete-btn").addEventListener("click", () => {
        tasks[index].completed = !tasks[index].completed;
        saveAndReload();
    });

    // Edit task
    li.querySelector(".edit-btn").addEventListener("click", () => {
        const newText = prompt("Edit task:", text);
        if (newText && newText.trim()) {
            tasks[index].text = newText.trim();
            saveAndReload();
        }
    });

    // Delete task
    li.querySelector(".delete-btn").addEventListener("click", () => {
        tasks.splice(index, 1);
        saveAndReload();
    });

    taskList.appendChild(li);
}

function saveAndReload() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    loadTasks();
}

// Add new task
addBtn.addEventListener("click", () => {
    const text = taskInput.value.trim();
    if (text) {
        tasks.push({ text, completed: false });
        taskInput.value = "";
        saveAndReload();
    }
});

taskInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") addBtn.click();
});

// Initial load
loadTasks();