document.getElementById("addTaskBtn")?.addEventListener("click", addTask);
document.getElementById("taskList")?.addEventListener("click", handleListClick);
document.getElementById("searchInput")?.addEventListener("input", searchTasks);

let tasks: string[] = []; // Array to keep track of tasks

function addTask(): void {
  const taskInput = document.getElementById("taskInput") as HTMLInputElement;
  const taskText: string = taskInput.value.trim();
  if (taskText) {
    tasks.push(taskText); // Add task to the array
    updateTaskList();
    taskInput.value = "";
  }
}

function updateTaskList(): void {
  const taskList = document.getElementById("taskList") as HTMLUListElement;
  taskList.innerHTML = ""; // Clear existing list
  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.innerHTML = `${index + 1}. <span class="task-text">${task}</span>
                        <button class="edit" title="Edit">&#9998;</button> 
                        <button class="delete" title="Delete">&#128465;</button>`;
    taskList.appendChild(li);
  });
}

function handleListClick(event: Event): void {
  const target = event.target as HTMLElement;
  const listItems = Array.from(
    document.querySelectorAll("#taskList li")
  ) as HTMLLIElement[];
  const index = listItems.indexOf(target.parentElement as HTMLLIElement);

  if (target.classList.contains("delete")) {
    tasks.splice(index, 1); // Remove task from the array
    updateTaskList();
  } else if (target.classList.contains("edit")) {
    const taskTextElement = target.previousElementSibling as HTMLSpanElement;
    const currentTask = taskTextElement.textContent || "";
    taskTextElement.innerHTML = `<input type="text" class="edit-input" value="${currentTask}" />`;

    const inputField = taskTextElement.querySelector(
      ".edit-input"
    ) as HTMLInputElement;
    inputField.focus();
    inputField.addEventListener("blur", () => {
      const newTask = inputField.value.trim();
      if (newTask) {
        tasks[index] = newTask; // Update task in the array
        updateTaskList();
      } else {
        taskTextElement.innerHTML = currentTask;
      }
    });
  }
}

function searchTasks(): void {
  const searchInput = (
    document.getElementById("searchInput") as HTMLInputElement
  ).value
    .trim()
    .toLowerCase();
  const noTaskMessage = document.getElementById("noTaskMessage");
  const taskList = document.getElementById("taskList") as HTMLUListElement;
  let found = false;

  if (noTaskMessage) {
    noTaskMessage.remove();
  }

  taskList
    .querySelectorAll("li")
    .forEach((li) => (li.style.backgroundColor = ""));

  if (searchInput) {
    tasks.forEach((task, index) => {
      if (task.toLowerCase() === searchInput) {
        taskList.children[index].setAttribute(
          "style",
          "background-color: #d3ffd3;"
        );
        const message = document.createElement("div");
        message.style.color = "green";
        message.textContent = `Task found: "${task}" at position ${index + 1}.`;
        document.querySelector(".container")?.appendChild(message);
        found = true;
      }
    });
  }

  if (!found && searchInput) {
    const message = document.createElement("div");
    message.id = "noTaskMessage";
    message.style.color = "red";
    message.textContent = "There is no task called this.";
    document.querySelector(".container")?.appendChild(message);
  }
}
