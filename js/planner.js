// Academic planner: add, complete, delete (saved in localStorage)
const form = document.getElementById("taskForm");
const input = document.getElementById("taskInput");
const list = document.getElementById("taskList");
const errorBox = document.getElementById("taskError");
const counter = document.getElementById("counter");
const clearDoneBtn = document.getElementById("clearDone");

let tasks = loadTasks();

function loadTasks() {
  try {
    return JSON.parse(localStorage.getItem("plannerTasks")) || [];
  } catch (e) {
    return [];
  }
}

function saveTasks() {
  try {
    localStorage.setItem("plannerTasks", JSON.stringify(tasks));
  } catch (e) { /* storage unavailable: planner still works this session */ }
}

function addTask(text) {
  tasks.push({ id: Date.now(), text: text, done: false });
  saveTasks();
  render();
}

function toggleTask(id) {
  tasks = tasks.map(t => t.id === id ? { ...t, done: !t.done } : t);
  saveTasks();
  render();
}

function deleteTask(id) {
  tasks = tasks.filter(t => t.id !== id);
  saveTasks();
  render();
}

function render() {
  list.innerHTML = "";

  if (tasks.length === 0) {
    const empty = document.createElement("li");
    empty.className = "empty";
    empty.textContent = "No tasks yet. Add your first task above.";
    list.appendChild(empty);
  }

  tasks.forEach(task => {
    const li = document.createElement("li");
    li.className = "task" + (task.done ? " done" : "");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.done;
    checkbox.setAttribute("aria-label", "Mark \"" + task.text + "\" as completed");
    checkbox.addEventListener("change", () => toggleTask(task.id));

    const span = document.createElement("span");
    span.className = "text";
    span.textContent = task.text;

    const del = document.createElement("button");
    del.type = "button";
    del.className = "btn danger";
    del.textContent = "Delete";
    del.addEventListener("click", () => deleteTask(task.id));

    li.append(checkbox, span, del);
    list.appendChild(li);
  });

  const remaining = tasks.filter(t => !t.done).length;
  counter.textContent = tasks.length + " task" + (tasks.length === 1 ? "" : "s") + ", " + remaining + " remaining";
}

form.addEventListener("submit", function (e) {
  e.preventDefault();
  const text = input.value.trim();
  if (text === "") {
    errorBox.textContent = "Enter a task before adding it.";
    input.classList.add("invalid");
    return;
  }
  errorBox.textContent = "";
  input.classList.remove("invalid");
  addTask(text);
  input.value = "";
  input.focus();
});

clearDoneBtn.addEventListener("click", function () {
  tasks = tasks.filter(t => !t.done);
  saveTasks();
  render();
});

render();
