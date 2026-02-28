const taskInput = document.getElementById("taskInput");
const addTaskBtn = document.getElementById("addTaskBtn");
const taskList = document.getElementById("taskList");
const clearAllBtn = document.getElementById("clearAllBtn");

let tasks = [];

// Load tasks from localStorage
window.addEventListener("DOMContentLoaded", function () {
  const stored = localStorage.getItem("todoTasks");
  if (stored) {
    tasks = JSON.parse(stored);
    renderAllTasks();
  }
});

// Add Task
addTaskBtn.addEventListener("click", function () {
  const text = taskInput.value.trim();
  if (text === "") {
    alert("Task cannot be empty");
    return;
  }

  const task = {
    id: Date.now(),
    text: text,
    completed: false,
  };

  tasks.push(task);
  saveTasks();
  renderAllTasks();

  taskInput.value = "";
});

// Render All Tasks
function renderAllTasks() {
  taskList.innerHTML = "";

  tasks.forEach(function (task) {
    const li = document.createElement("li");

    if (task.completed) {
      li.classList.add("completed");
    }

    const span = document.createElement("span");
    span.textContent = task.text;

    // Toggle Complete
    span.addEventListener("click", function () {
      task.completed = !task.completed;
      saveTasks();
      renderAllTasks();
    });

    // Edit Button
    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";

    editBtn.addEventListener("click", function () {
      const newText = prompt("Edit task:", task.text);
      if (newText && newText.trim() !== "") {
        task.text = newText.trim();
        saveTasks();
        renderAllTasks();
      }
    });

    // Delete Button
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";

    deleteBtn.addEventListener("click", function () {
      tasks = tasks.filter(function (t) {
        return t.id !== task.id;
      });
      saveTasks();
      renderAllTasks();
    });

    li.appendChild(span);
    li.appendChild(editBtn);
    li.appendChild(deleteBtn);

    taskList.appendChild(li);
  });
}

// Save to localStorage
function saveTasks() {
  localStorage.setItem("todoTasks", JSON.stringify(tasks));
}

// Clear All
clearAllBtn.addEventListener("click", function () {
  tasks = [];
  localStorage.removeItem("todoTasks");
  renderAllTasks();
});
