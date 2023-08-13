import addLogo from '../assets/duplicate-outline.svg';
import importantImg from '../assets/star-outline.svg';
import ellipsisImg from '../assets/ellipsis-vertical-outline.svg';

import Storage from './storage';
import { adjustTimezone } from './dateManager';
import { Task } from './task';
import { formatDate } from './dateManager';

export function addTaskBtn() {
    const tasksContainer = document.getElementById('tasks-container');

    const addTaskContainer = document.createElement('div');
    addTaskContainer.id = 'add-task-container';
    addTaskContainer.innerHTML = `<img src = '${addLogo}'><p>Add Task</p>`;
    tasksContainer.appendChild(addTaskContainer);


    addTaskContainer.onclick = () => { showNewTaskForm() };
}

export function loadTasks() {
    clearTasks();
    let projectSelectedTitle = document.getElementById('tasks-project-title');
    const toDoList = Storage.getToDoList();

    const projectTasks = toDoList.getProject(projectSelectedTitle.innerText).getTasks();

    projectTasks.forEach(task => {
        showTask(task.name, task.description, task.date, task.important, task.completed);
    });
}

function clearTasks() {
    const taskShower = document.getElementById('task-shower');
    taskShower.innerHTML = '';
}

function hideNewTaskForm() {
    const tasksContainer = document.getElementById('tasks-container');
    const taskFormContainer = document.getElementById('new-task-form');
    const inputName = document.getElementById('new-task-name');
    const inputDesc = document.getElementById('new-task-desc');
    const inputDate = document.getElementById('task-date');
    inputName.value = '';
    inputDesc.value = '';
    inputDate.value = '';
    tasksContainer.removeChild(taskFormContainer);
}

function createTask(projectName, taskName, taskDesc, taskDate) {
    Storage.addTask(projectName.innerText, new Task(taskName.value, taskDesc.value, adjustTimezone(taskDate.value), false, false)); //sets important and completed to false automatically
}

function showTask(taskName, taskDesc, taskDate, important, completed) {
    const taskShower = document.getElementById('task-shower');
    const taskContainer = document.createElement('div');

    taskContainer.classList.add('task');
    taskContainer.innerHTML = `<div class = 'left-task-info'>
                                    <button class = 'completed-button'></button>
                                    <h5 class = 'task-name'>${taskName}</h5>
                                    <h6 class = 'task-desc'>${taskDesc}</h6>
                                </div>
                                <div class = 'right-task-info'>
                                    <h5 class = 'task-date'>${formatDate(taskDate)}</h5>
                                        <img class ='important-img' src='${importantImg}'>
                                        <img class = 'option' src = '${ellipsisImg}'>
                                    <div class = 'task-options-container hidden'>
                                        <p class = 'edit-task'>Edit</p>
                                        <p class = 'delete-task'>Delete</p>
                                    </div>
                                </div >`;
    const importantImgContainer = taskContainer.querySelector('.important-img');
    // const completed = taskContainer.querySelector('')
    // if (important) {
    //     importantImg.classList.add('important');
    // } else {
    //     importantImg.classList.remove('important');
    // }
    (important) ? importantImgContainer.classList.add('important') : importantImgContainer.classList.remove('important');
    // (completed)?completedImg.classList.add('completed'):completedImg.classList.remove('completed');
    taskShower.appendChild(taskContainer);
}


function showNewTaskForm() {
    if (document.getElementById('new-task-form')) {
        return
    } else {
        const projectTitle = document.getElementById('tasks-project-title');
        const addTaskBtn = document.getElementById('add-task-container');
        const tasksContainer = document.getElementById('tasks-container');
        const taskFormContainer = document.createElement('div');
        taskFormContainer.id = 'new-task-form';
        taskFormContainer.innerHTML = `< div class = 'new-form' >
        <label for='new-task-name'>Title:</label>
        <input type = 'text' id = 'new-task-name' placeholder = 'Enter your task name' autocomplete = 'off'>
        <label for='new-task-desc'>Description (optional):</label>
        <textarea type = 'text' id = 'new-task-desc' placeholder = 'Enter a description for your task' autocomplete = 'off' wrap="hard"></textarea>
        <label for='task-date'>Due date:</label>
        <input type = 'date' id = 'task-date'>
        </div>
        <div class = 'new-form-buttons'><button class = 'add-button' id = 'add-new-task'>Add</button>
        <button class = 'cancel-button' id = 'cancel-new-task'>Cancel</button></div>`;
        tasksContainer.insertBefore(taskFormContainer, addTaskBtn);

        const cancelNewTaskBtn = document.getElementById('cancel-new-task');
        const addNewTaskBtn = document.getElementById('add-new-task');

        const taskNameInput = document.getElementById('new-task-name');
        const taskDescInput = document.getElementById('new-task-desc');
        const taskDateInput = document.getElementById('task-date');

        taskNameInput.focus();

        taskNameInput.addEventListener('keydown', e => { //Create project whe enter is pressed down
            if (e.key === 'Enter') {
                taskDescInput.focus();
            }
        });

        taskDescInput.addEventListener('keydown', e => {
            if (e.key === 'Enter') {
                taskDateInput.focus();
            }
        })

        taskDateInput.addEventListener('keydown', e => {
            if (e.key === 'Enter') {
                createTask(projectTitle, taskNameInput, taskDescInput, taskDateInput);
                hideNewTaskForm();
                loadTasks();
            }
        })

        addNewTaskBtn.onclick = () => {
            createTask(projectTitle, taskNameInput, taskDescInput, taskDateInput);
            hideNewTaskForm();
            loadTasks();
        };

        cancelNewTaskBtn.onclick = () => { hideNewTaskForm() };
    }
}