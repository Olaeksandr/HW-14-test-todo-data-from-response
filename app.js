'use strict';
const addTaskForm = document.getElementById('addTaskForm');
const taskNameInput = document.getElementById('taskNameInput');
const taskList = document.getElementById('taskList');
const taskItemTemplate = document.getElementById('taskItemTemplate').innerHTML;

addTaskForm.addEventListener('submit', onAddTaskFormSubmit);
taskList.addEventListener('click', onTaskListClick);

function onAddTaskFormSubmit(event) {
    event.preventDefault();

    submitForm();
}

function onTaskListClick(e) {
    const classList = e.target.classList;

    switch (true) {
        case classList.contains('task-item'):
            toggleTaskState(e.target);
            break;
        case classList.contains('delete-btn'):
            deleteTask(e.target.parentNode);
            break;
    }
}

function submitForm() {
    const task = { title: taskNameInput.value };

    addTask(task);
    resetForm();
}

function addTask(task) {
    const html = taskItemTemplate.replace('{{title}}', task.title);

    // taskList.innerHTML = taskList.innerHTML + html;

    const newTaskEl = htmlToElement(html);
    taskList.appendChild(newTaskEl);
}

function deleteTask(el) {
    el.remove();
}

function resetForm() {
    addTaskForm.reset();
}

function toggleTaskState(el) {
    el.classList.toggle('done');
}

function htmlToElement(html) {
    const template = document.createElement('template');
    html = html.trim();
    template.innerHTML = html;
    return template.content.firstChild;
}

//********** Modifided TodoList v2******************
function addTaskFromResponse(responsTask, stage) {
    addTaskResponse(responsTask);
    chekStageStatus(stage);
}
let newTaskElResponse;

function addTaskResponse(responseTask) {
    newTaskElResponse = htmlToElement(taskItemTemplate.replace('{{title}}', responseTask));
    taskList.appendChild(newTaskElResponse);
}

function chekStageStatus(currentStage) {
    if(currentStage == true) {
        newTaskElResponse.classList.add('done');
    } 
}

fetch('https://jsonplaceholder.typicode.com/todos')
    .then((response) => {
        response.json()
        .then(data =>
            data.forEach(function(id) {
                addTaskFromResponse(id.title, id.completed);
            })
        )
    }
);