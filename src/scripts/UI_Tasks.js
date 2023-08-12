import addLogo from '../assets/duplicate-outline.svg';
import importantImg from '../assets/star-outline.svg';
import ellipsisImg from '../assets/ellipsis-vertical-outline.svg';

import Storage from './storage';
import { Project } from './project';
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
    Storage.addTask(projectName.innerText, new Task(taskName, taskDesc, taskDate, false, false)); //sets important and completed to false autimatically

}

function showTask(taskName, taskDesc, taskDate, important, completed) {
    const taskContainer = document.createElement('div');

    taskContainer.classList.add('task');
    taskContainer.innerHTML = `<button class = 'completed-button'>
    <div class = 'task-info'>
    <h5 class = 'task-name'>${taskName}</h5>
    <h6 class = 'task-desc'>${taskDesc}</h6>
                                </div>
                                <h5>${formatDate(taskDate)}</h5>
                                <img src='${importantImg}'>
                                <img class = 'option' src = '${ellipsisImg}'>
                                <div class = 'task-options-container hidden'>
                                <p class = 'edit-task'>Edit</p>
                                <p class = 'delete-task'>Delete</p>
                                </div>`;
}

function showNewTaskForm() {
    if (document.getElementById('new-task-form')) {
        return
    } else {
        const addTaskBtn = document.getElementById('add-task-container');
        const tasksContainer = document.getElementById('tasks-container');
        const taskFormContainer = document.createElement('div');
        taskFormContainer.id = 'new-task-form';
        taskFormContainer.innerHTML = `<div class = 'new-form'>
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
        const taskNameInput = document.getElementById('new-task-name');

        taskNameInput.focus();

        cancelNewTaskBtn.onclick = () => { hideNewTaskForm() };
    }
}

function showNewProjectForm() {

    if (document.getElementById('new-project-form')) { // if button was already pressed dont append another form
        return;
    } else {
        const addProjectBtn = document.querySelector('.add-project-container');
        const sideBar = document.getElementById('side-bar');
        const projectFormContainer = document.createElement('div');
        projectFormContainer.id = 'new-project-form';
        projectFormContainer.innerHTML = `<div class = 'new-form'>
                                    <input type = 'text' id = 'new-project-name' placeholder = 'Enter your project name' autocomplete = 'off'>
                                    </div>
                                    <div class = 'new-form-buttons'>
                                        <button class = 'add-button' id = 'add-new-project'>Add</button>
                                        <button class = 'cancel-button' id = 'cancel-new-project'>Cancel</button>
                                    </div>`;
        sideBar.insertBefore(projectFormContainer, addProjectBtn);

        const addProjectButton = document.getElementById('add-new-project');
        const cancelNewProjectBtn = document.getElementById('cancel-new-project');

        const projectNameInput = document.getElementById('new-project-name'); //Focus automatically to write in the input
        projectNameInput.focus();

        projectNameInput.addEventListener('keydown', e => { //Create project whe enter is pressed down
            if (e.key === 'Enter') {
                createProject();
                hideNewProjectForm();
            }
        })

        addProjectButton.onclick = () => {
            createProject();
            hideNewProjectForm();
        };

        cancelNewProjectBtn.onclick = () => { hideNewProjectForm() };

    }
}