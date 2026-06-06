const form = document.querySelector("#todoForm");
const input = document.querySelector("#todoInput");
const todoList = document.querySelector("#todoList");
const itemsLeft = document.querySelector("#itemsLeft");
const filters = document.querySelector(".filters");
const clearCompletedBtn = document.querySelector("#clearCompleted");

let todos = JSON.parse(localStorage.getItem("todos")) || [];
let currentFilter = "all";

function saveAndRender() {
    localStorage.setItem("todos", JSON.stringify(todos));
    render();
}

function render() {
    todoList.innerHTML = "";
    
    let filteredTodos = todos;
    if (currentFilter === "active") {
        filteredTodos = todos.filter(t => !t.completed);
    } else if (currentFilter === "completed") {
        filteredTodos = todos.filter(t => t.completed);
    }

    filteredTodos.forEach(todo => {
        const li = document.createElement("li");
        li.dataset.id = todo.id;
        if (todo.completed) li.classList.add("completed");

        const checkbox = document.createElement("div");
        checkbox.className = `checkbox ${todo.completed ? 'checked' : ''}`;
        if (todo.completed) checkbox.textContent = "✓";

        const span = document.createElement("span");
        span.className = "todo-text";
        span.textContent = todo.text;

        const deleteBtn = document.createElement("button");
        deleteBtn.className = "delete-btn";
        deleteBtn.textContent = "✖";

        li.appendChild(checkbox);
        li.appendChild(span);
        li.appendChild(deleteBtn);
        todoList.appendChild(li);
    });

    const activeCount = todos.filter(t => !t.completed).length;
    itemsLeft.textContent = `${activeCount} item${activeCount !== 1 ? 's' : ''} left`;
}

form.addEventListener("submit", e => {
    e.preventDefault();
    const text = input.value.trim();
    if (!text) return;

    todos.push({
        id: Date.now().toString(),
        text,
        completed: false
    });
    
    input.value = "";
    saveAndRender();
});

todoList.addEventListener("click", e => {
    const li = e.target.closest("li");
    if (!li) return;
    const id = li.dataset.id;

    if (e.target.classList.contains("checkbox") || e.target.classList.contains("todo-text")) {
        const todo = todos.find(t => t.id === id);
        if (todo) {
            todo.completed = !todo.completed;
            saveAndRender();
        }
    }

    if (e.target.classList.contains("delete-btn")) {
        todos = todos.filter(t => t.id !== id);
        saveAndRender();
    }
});

todoList.addEventListener("dblclick", e => {
    if (e.target.classList.contains("todo-text")) {
        const li = e.target.closest("li");
        const id = li.dataset.id;
        const todo = todos.find(t => t.id === id);
        
        const inputEdit = document.createElement("input");
        inputEdit.type = "text";
        inputEdit.className = "edit-input";
        inputEdit.value = todo.text;
        
        li.innerHTML = "";
        li.appendChild(inputEdit);
        inputEdit.focus();

        inputEdit.addEventListener("blur", () => finishEdit(id, inputEdit.value));
        inputEdit.addEventListener("keydown", ev => {
            if (ev.key === "Enter") finishEdit(id, inputEdit.value);
            if (ev.key === "Escape") saveAndRender();
        });
    }
});

function finishEdit(id, newText) {
    const text = newText.trim();
    if (text) {
        const todo = todos.find(t => t.id === id);
        if (todo) todo.text = text;
    } else {
        todos = todos.filter(t => t.id !== id);
    }
    saveAndRender();
}

filters.addEventListener("click", e => {
    if (e.target.classList.contains("filter-btn")) {
        document.querySelectorAll(".filter-btn").forEach(btn => btn.classList.remove("active"));
        e.target.classList.add("active");
        currentFilter = e.target.dataset.filter;
        render();
    }
});

clearCompletedBtn.addEventListener("click", () => {
    todos = todos.filter(t => !t.completed);
    saveAndRender();
});

render();
