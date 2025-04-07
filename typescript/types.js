"use strict";
var _a, _b, _c;
(_a = document.getElementById("addTaskBtn")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", addTask);
(_b = document.getElementById("taskList")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", handleListClick);
(_c = document.getElementById("searchInput")) === null || _c === void 0 ? void 0 : _c.addEventListener("input", searchTasks);
let tasks = []; // Array to keep track of tasks
function addTask() {
    const taskInput = document.getElementById("taskInput");
    const taskText = taskInput.value.trim();
    if (taskText) {
        tasks.push(taskText); // Add task to the array
        updateTaskList();
        taskInput.value = "";
    }
}
function updateTaskList() {
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = ""; // Clear existing list
    tasks.forEach((task, index) => {
        const li = document.createElement("li");
        li.innerHTML = `${index + 1}. <span class="task-text">${task}</span>
                        <button class="edit" title="Edit">&#9998;</button> 
                        <button class="delete" title="Delete">&#128465;</button>`;
        taskList.appendChild(li);
    });
}
function handleListClick(event) {
    const target = event.target;
    const listItems = Array.from(document.querySelectorAll("#taskList li"));
    const index = listItems.indexOf(target.parentElement);
    if (target.classList.contains("delete")) {
        tasks.splice(index, 1); // Remove task from the array
        updateTaskList();
    }
    else if (target.classList.contains("edit")) {
        const taskTextElement = target.previousElementSibling;
        const currentTask = taskTextElement.textContent || "";
        taskTextElement.innerHTML = `<input type="text" class="edit-input" value="${currentTask}" />`;
        const inputField = taskTextElement.querySelector(".edit-input");
        inputField.focus();
        inputField.addEventListener("blur", () => {
            const newTask = inputField.value.trim();
            if (newTask) {
                tasks[index] = newTask; // Update task in the array
                updateTaskList();
            }
            else {
                taskTextElement.innerHTML = currentTask;
            }
        });
    }
}
function searchTasks() {
    var _a;
    const searchInput = document.getElementById("searchInput").value
        .trim()
        .toLowerCase();
    const noTaskMessage = document.getElementById("noTaskMessage");
    const taskList = document.getElementById("taskList");
    let found = false;
    if (noTaskMessage) {
        noTaskMessage.remove();
    }
    taskList
        .querySelectorAll("li")
        .forEach((li) => (li.style.backgroundColor = ""));
    if (searchInput) {
        tasks.forEach((task, index) => {
            var _a;
            if (task.toLowerCase() === searchInput) {
                taskList.children[index].setAttribute("style", "background-color: #d3ffd3;");
                const message = document.createElement("div");
                message.style.color = "green";
                message.textContent = `Task found: "${task}" at position ${index + 1}.`;
                (_a = document.querySelector(".container")) === null || _a === void 0 ? void 0 : _a.appendChild(message);
                found = true;
            }
        });
    }
    if (!found && searchInput) {
        const message = document.createElement("div");
        message.id = "noTaskMessage";
        message.style.color = "red";
        message.textContent = "There is no task called this.";
        (_a = document.querySelector(".container")) === null || _a === void 0 ? void 0 : _a.appendChild(message);
    }
}
