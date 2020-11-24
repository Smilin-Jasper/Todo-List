//Create all the required elements for the app

const appMenuDiv = document.createElement("div");
appMenuDiv.className = "app-menu";
const appTasksDiv = document.createElement("div");
appTasksDiv.className = "app-tasks";
const add = document.createElement("p");
const addText = document.createTextNode("TO-DO");
const addButton = document.createElement("button");
const addButtonText = document.createTextNode("+");
const enterTask = document.createElement("input");
enterTask.type = "text";
enterTask.placeholder = "What do you want to do...";
const noTaskWarning = document.createElement("p");
noTaskWarning.className = "no-task-warning";
const noTaskWarningEdit = document.createElement("p");
noTaskWarningEdit.className = "no-task-warning-edit";
const noTaskWarningText = document.createTextNode("Please enter a task!");
const noTaskWarningEditText = document.createTextNode("Please enter a task!");

document.body.appendChild(appMenuDiv);
document.body.appendChild(appTasksDiv);
appMenuDiv.appendChild(add);
add.appendChild(addText);
appMenuDiv.appendChild(enterTask);
appMenuDiv.appendChild(addButton);
addButton.appendChild(addButtonText);
noTaskWarning.appendChild(noTaskWarningText);
noTaskWarningEdit.appendChild(noTaskWarningEditText);

//Function to create a new task to-do

let taskColorNo = 0;
const arrayOfTasks = [];
const arrayOfTaskDivs = [];
const localTasks = [];
const storedTasks = JSON.parse(window.localStorage.getItem("localTaskDivs"));

function createTask(taskText = document.createTextNode(enterTask.value)) {
    if (taskText.nodeValue != "") {
        taskColorNo++;
        const taskDiv = document.createElement("div");
        taskDiv.className = "task-div";
        const task = document.createElement("p");
        task.className = "task";

        if (taskText.nodeValue != enterTask.value) {
            taskText = document.createTextNode(taskText);
        }

        const taskTextDiv = document.createElement("div");
        taskTextDiv.className = "task-text-div";

        appTasksDiv.appendChild(taskDiv);
        taskDiv.appendChild(taskTextDiv);
        taskTextDiv.appendChild(task);
        task.appendChild(taskText);

        const taskOptionsDiv = document.createElement("div");
        taskOptionsDiv.className = "task-options-container";
        const editTaskButton = document.createElement("button");
        editTaskButton.className = "edit-task-button";
        const removeTaskButton = document.createElement("button");
        removeTaskButton.className = "checkmark-button";
        const removeTaskButtonText = document.createTextNode("-");

        taskDiv.appendChild(taskOptionsDiv);
        taskOptionsDiv.appendChild(editTaskButton);
        taskOptionsDiv.appendChild(removeTaskButton);
        removeTaskButton.appendChild(removeTaskButtonText);
        const applyEditButton = document.createElement("button");
        applyEditButton.className = "checkmark-button";

        arrayOfTasks.push(task);
        arrayOfTaskDivs.push(taskDiv);

        removeTaskButton.onclick = () => {
            let i = arrayOfTasks.indexOf(task);
            task.classList.add("strike-through");
            if (taskColorNo == 1) {
                taskColorNo = 0;
            } else if (taskColorNo == 2) {
                taskColorNo = 1;
            } else if (taskColorNo == 0) {
                taskColorNo = 2;
            }

            setTimeout(() => {
                for (i; i + 1 < arrayOfTasks.length; i++) {
                    arrayOfTasks[i].innerHTML = arrayOfTasks[i + 1].innerHTML;
                }

                appTasksDiv.removeChild(arrayOfTaskDivs[arrayOfTaskDivs.length - 1]);
                arrayOfTaskDivs.pop(arrayOfTaskDivs.length - 1);
                arrayOfTasks.pop(arrayOfTasks.length - 1);
                task.classList.remove("strike-through");
            }, 600);

            localTasks.splice(index, 1);
            window.localStorage.setItem("localTaskDivs", JSON.stringify(localTasks));
        }

        editTaskButton.onclick = () => {
            editTaskButton.style.display = "none";
            removeTaskButton.style.display = "none";
            task.contentEditable = "true";
            task.style.cursor = "text";
            task.style.borderBottom = "1px solid black";
            taskTextDiv.appendChild(applyEditButton);
        }

        function applyEdit() {
            if (task.innerHTML != "") {
                task.contentEditable = "false";
                taskTextDiv.removeChild(applyEditButton);
                editTaskButton.style.display = "block";
                removeTaskButton.style.display = "block";
                task.style.borderBottom = "none";

                localTasks[index] = task.innerHTML;
                window.localStorage.setItem("localTaskDivs", JSON.stringify(localTasks));

                if (taskDiv.contains(noTaskWarningEdit)) {
                    taskDiv.removeChild(noTaskWarningEdit);
                }

            } else {
                taskTextDiv.before(noTaskWarningEdit);
            }
        }

        applyEditButton.onclick = () => { applyEdit() };

        document.onkeydown = function(event) {
            let key = event.keyCode;
            if (key == 13) {
                event.preventDefault();
                applyEdit();
            }
        }

        enterTask.value = "";

        if (taskColorNo == 2) {
            taskDiv.style.borderColor = "#7427D8";
        } else if (taskColorNo == 3) {
            taskDiv.style.borderColor = "#D8278B";
            taskColorNo = 0;
        }

        localTasks.push(task.innerHTML);
        window.localStorage.setItem("localTaskDivs", JSON.stringify(localTasks));
        const index = localTasks.indexOf(task.innerHTML);

        task.onfocus = () => {
            if (taskDiv.contains(noTaskWarningEdit)) {
                taskDiv.removeChild(noTaskWarningEdit);
            }
        }

        task.oninput = () => {
            if (taskDiv.contains(noTaskWarningEdit)) {
                taskDiv.removeChild(noTaskWarningEdit);
            }
        }
    } else {
        appMenuDiv.appendChild(noTaskWarning);
    }
}

enterTask.onfocus = () => {
    if (appMenuDiv.contains(noTaskWarning)) {
        appMenuDiv.removeChild(noTaskWarning);
    }
}

enterTask.oninput = () => {
    if (appMenuDiv.contains(noTaskWarning)) {
        appMenuDiv.removeChild(noTaskWarning);
    }
}

//Run createTask() when clicked or 'enter' is pressed

addButton.onclick = () => { createTask(); }

enterTask.addEventListener("keydown", (event) => {
    let key = event.keyCode;
    if (key == 13) {
        createTask();
    }
});

if (storedTasks != null) {
    for (let i = 0; i < storedTasks.length; i++) {
        createTask(storedTasks[i]);
    }
}