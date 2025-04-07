var _a, _b, _c;
(_a = document.getElementById("addTaskBtn")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", addTask);
(_b = document.getElementById("taskList")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", handleListClick);
(_c = document.getElementById("searchInput")) === null || _c === void 0 ? void 0 : _c.addEventListener("input", searchTasks);
var tasks = []; // Array to keep track of tasks
function addTask() {
    var taskInput = document.getElementById("taskInput");
    var taskText = taskInput.value.trim();
    if (taskText) {
        tasks.push(taskText); // Add task to the array
        updateTaskList();
        taskInput.value = "";
    }
}
function updateTaskList() {
    var taskList = document.getElementById("taskList");
    taskList.innerHTML = ""; // Clear existing list
    tasks.forEach(function (task, index) {
        var li = document.createElement("li");
        li.innerHTML = "".concat(index + 1, ". <span class=\"task-text\">").concat(task, "</span>\n                        <button class=\"edit\" title=\"Edit\">&#9998;</button> \n                        <button class=\"delete\" title=\"Delete\">&#128465;</button>");
        taskList.appendChild(li);
    });
}
function handleListClick(event) {
    var target = event.target;
    var listItems = Array.from(document.querySelectorAll("#taskList li"));
    var index = listItems.indexOf(target.parentElement);
    if (target.classList.contains("delete")) {
        tasks.splice(index, 1); // Remove task from the array
        updateTaskList();
    }
    else if (target.classList.contains("edit")) {
        var taskTextElement_1 = target.previousElementSibling;
        var currentTask_1 = taskTextElement_1.textContent || "";
        taskTextElement_1.innerHTML = "<input type=\"text\" class=\"edit-input\" value=\"".concat(currentTask_1, "\" />");
        var inputField_1 = taskTextElement_1.querySelector(".edit-input");
        inputField_1.focus();
        inputField_1.addEventListener("blur", function () {
            var newTask = inputField_1.value.trim();
            if (newTask) {
                tasks[index] = newTask; // Update task in the array
                updateTaskList();
            }
            else {
                taskTextElement_1.innerHTML = currentTask_1;
            }
        });
    }
}
function searchTasks() {
    var _a;
    var searchInput = document.getElementById("searchInput").value
        .trim()
        .toLowerCase();
    var noTaskMessage = document.getElementById("noTaskMessage");
    var taskList = document.getElementById("taskList");
    var found = false;
    if (noTaskMessage) {
        noTaskMessage.remove();
    }
    taskList
        .querySelectorAll("li")
        .forEach(function (li) { return (li.style.backgroundColor = ""); });
    if (searchInput) {
        tasks.forEach(function (task, index) {
            var _a;
            if (task.toLowerCase() === searchInput) {
                taskList.children[index].setAttribute("style", "background-color: #d3ffd3;");
                var message = document.createElement("div");
                message.style.color = "green";
                message.textContent = "Task found: \"".concat(task, "\" at position ").concat(index + 1, ".");
                (_a = document.querySelector(".container")) === null || _a === void 0 ? void 0 : _a.appendChild(message);
                found = true;
            }
        });
    }
    if (!found && searchInput) {
        var message = document.createElement("div");
        message.id = "noTaskMessage";
        message.style.color = "red";
        message.textContent = "There is no task called this.";
        (_a = document.querySelector(".container")) === null || _a === void 0 ? void 0 : _a.appendChild(message);
    }
}
