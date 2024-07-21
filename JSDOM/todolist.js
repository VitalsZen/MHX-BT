document.getElementById("formTask").onsubmit = function(event) {
    event.preventDefault();
    const inputNode = document.getElementById("inputTask");
    const categorySelectNode = document.getElementById("categorySelect");
    const taskText = inputNode.value.trim();
    const category = categorySelectNode.value;

    if (taskText !== "" && category) {
        const task = {
            text: taskText,
            category: category,
            status: 'pending', 
            completed: false
        };
        addTask(task);
        inputNode.value = ""; 
    }
}

document.getElementById("formCategory").onsubmit = function(event) {
    event.preventDefault();
    const inputNode = document.getElementById("inputCategory");
    const categoryText = inputNode.value.trim();
    const categorySelectNode = document.getElementById("categorySelect");

    if (categoryText !== "" && !categoryExists(categoryText)) {
        addCategory(categoryText);
        inputNode.value = "";
    } else {
        alert("Category already exists or is empty.");
    }
}

const tasks = JSON.parse(localStorage.getItem("tasks"));
if (tasks) {
    for (let task of tasks) {
        addTask(task);
    }
}

const categories = JSON.parse(localStorage.getItem("categories"));
if (categories) {
    for (let category of categories) {
        addCategory(category);
    }
}

function addTask(task) {
    const taskList = document.getElementById("tasks");
    const taskItem = document.createElement("li");
    const removeButton = document.createElement("button");
    const comboBox = document.createElement("select");
    const options = [
        { value: 'pending', text: 'Pending' },
        { value: 'in-progress', text: 'In Progress' },
        { value: 'complete', text: 'Complete' }
    ];
    options.forEach((optionData) => {
        const option = document.createElement('option');
        option.value = optionData.value;
        option.text = optionData.text;
        comboBox.appendChild(option);
    });

    const taskTextNode = document.createElement("span");
    taskTextNode.className = "task-text";
    taskTextNode.textContent = task.text;

    const categoryNode = document.createElement("span");
    categoryNode.className = "task-category";
    categoryNode.textContent = `Category: ${task.category}`;

    taskItem.setAttribute("data-category", task.category);

    comboBox.value = task.status || 'pending';

    if (task.completed) {
        taskItem.classList.add("completed");
    }

    removeButton.textContent = "Remove";
    removeButton.addEventListener("click", function() {
        taskList.removeChild(taskItem);
        updateLocalStorage();
    });

    comboBox.addEventListener('change', () => {
        const selectedValue = comboBox.value;
        const isCompleted = selectedValue === "complete";

        if (isCompleted) {
            taskItem.classList.add("completed");
        } else {
            taskItem.classList.remove("completed");
        }

        task.completed = isCompleted;
        task.status = selectedValue;
        updateLocalStorage();
    });

    taskItem.appendChild(taskTextNode);
    taskItem.appendChild(categoryNode);
    taskItem.appendChild(comboBox);
    taskItem.appendChild(removeButton);
    taskList.appendChild(taskItem);

    updateLocalStorage();
}

function updateLocalStorage() {
    const tasks = [];
    const taskList = document.getElementById("tasks");
    for (let taskItem of taskList.getElementsByTagName("li")) {
        const task = {
            text: taskItem.querySelector(".task-text").textContent,
            category: taskItem.getAttribute("data-category"),
            status: taskItem.querySelector("select").value,
            completed: taskItem.classList.contains("completed")
        };
        tasks.push(task);
    }
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function addCategory(category) {
    const categorySelectNode = document.getElementById("categorySelect");
    const option = document.createElement('option');
    option.value = category;
    option.text = category;
    categorySelectNode.appendChild(option);
    if (categoryExists(category)) return;

   
    let categories = JSON.parse(localStorage.getItem("categories")) || [];
    categories.push(category);
    localStorage.setItem("categories", JSON.stringify(categories));
}

function categoryExists(category) {
    const categories = JSON.parse(localStorage.getItem("categories")) || [];
    return categories.includes(category);
}
