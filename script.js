const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const clearBtn = document.getElementById("clearBtn");
const count = document.getElementById("count");

// Load tasks when page opens
window.onload = loadTasks;

// Add task
addBtn.addEventListener("click", addTask);

// Press Enter to add task
taskInput.addEventListener("keypress", function(e){
    if(e.key === "Enter"){
        addTask();
    }
});

// Clear all tasks
clearBtn.addEventListener("click", function(){

    if(confirm("Are you sure you want to delete all tasks?")){
        taskList.innerHTML = "";
        updateCount();
        saveTasks();
    }

});

function addTask(){

    const text = taskInput.value.trim();

    if(text === ""){
        alert("Please enter a task.");
        return;
    }

    createTask(text,false);

    taskInput.value = "";

    saveTasks();

    updateCount();

}

function createTask(text,completed){

    const li = document.createElement("li");

    const taskDiv = document.createElement("div");
    taskDiv.className = "task";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = completed;

    const span = document.createElement("span");
    span.innerText = text;

    if(completed){
        span.classList.add("completed");
    }

    checkbox.addEventListener("change",function(){

        span.classList.toggle("completed");

        saveTasks();

    });

    const deleteBtn = document.createElement("button");

    deleteBtn.innerHTML = "Delete";

    deleteBtn.className = "delete-btn";

    deleteBtn.onclick = function(){

        li.remove();

        updateCount();

        saveTasks();

    };

    taskDiv.appendChild(checkbox);

    taskDiv.appendChild(span);

    li.appendChild(taskDiv);

    li.appendChild(deleteBtn);

    taskList.appendChild(li);

}

function updateCount(){

    count.innerText = taskList.children.length;

}

function saveTasks(){

    const tasks = [];

    document.querySelectorAll("#taskList li").forEach(function(item){

        tasks.push({

            text: item.querySelector("span").innerText,

            completed: item.querySelector("input").checked

        });

    });

    localStorage.setItem("tasks",JSON.stringify(tasks));

}

function loadTasks(){

    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    tasks.forEach(function(task){

        createTask(task.text,task.completed);

    });

    updateCount();

}