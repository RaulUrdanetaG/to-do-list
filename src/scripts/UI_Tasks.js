import addLogo from '../assets/duplicate-outline.svg';
import importantImg from '../assets/star-outline.svg';
import ellipsisImg from '../assets/ellipsis-vertical-outline.svg';

import Storage from './storage';
import { adjustTimezone, formatDate, reFormatDate } from './dateManager';
import { Task } from './task';

export function loadTasks() {
    clearTasks();
    let projectSelectedTitle = document.getElementById('tasks-project-title');
    if (projectSelectedTitle.innerText === 'All Tasks' || projectSelectedTitle.innerText === 'Today' || projectSelectedTitle.innerText === 'Next 7 Days' || projectSelectedTitle.innerText === 'Important') {
        const toDoList = Storage.getToDoList();

        const projectTasks = toDoList.getProject(projectSelectedTitle.innerText).getTasks();

        projectTasks.forEach(task => {
            showTask(task.name, task.description, task.date, task.important, task.completed);
        });
        if (document.getElementById('add-task-container')) {
            removeTaskBtn();
        }
    } else {
        const toDoList = Storage.getToDoList();

        const projectTasks = toDoList.getProject(projectSelectedTitle.innerText).getTasks();

        projectTasks.forEach(task => {
            showTask(task.name, task.description, task.date, task.important, task.completed);
        });

        if (document.getElementById('add-task-container')) {

        } else {
            addTaskBtn();
        }

    }

    handleTaskClicks();
}

function addTaskBtn() {
    const tasksContainer = document.getElementById('task-view-container');

    const addTaskContainer = document.createElement('div');
    addTaskContainer.id = 'add-task-container';
    addTaskContainer.innerHTML = `<img src = '${addLogo}'><p>Add Task</p>`;
    tasksContainer.appendChild(addTaskContainer);


    addTaskContainer.onclick = () => { showNewTaskForm() };
}

function removeTaskBtn() {
    const taskBtn = document.getElementById('add-task-container');
    const taskViewContainer = document.getElementById('task-view-container');

    taskViewContainer.removeChild(taskBtn);
}

function clearTasks() {
    const taskShower = document.getElementById('task-shower');
    taskShower.innerHTML = '';
}

function hideNewTaskForm() {
    const tasksContainer = document.getElementById('task-view-container');
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
    loadTasks();
}

function removeTask(projectName, taskName) {
    Storage.removeTask(projectName.innerText, taskName.innerText);
    loadTasks();
}

function editTask(projectName, currentTask, newTaskName, newTaskDesc, newTaskDate) {
    Storage.changeDescription(projectName.innerText, currentTask.innerText, newTaskDesc.value);
    Storage.changeDate(projectName.innerText, currentTask.innerText, adjustTimezone(newTaskDate.value));
    Storage.renameTask(projectName.innerText, currentTask.innerText, newTaskName.value);

    loadTasks();
}

function toogleCompleted(projectName, taskName) {
    Storage.toogleImportantTask(projectName.innerText, taskName.innerText);
    loadTasks();
}

function toogleImportant(projectName, taskName) {
    Storage.toogleCompleteTask(projectName.innerText, taskName.innerText);
    loadTasks();
}

function showTask(taskName, taskDesc, taskDate, important, completed) {
    const taskShower = document.getElementById('task-shower');
    const taskContainer = document.createElement('div');

    taskContainer.classList.add('task');
    taskContainer.innerHTML = `<div class = 'left-task-info'>
                                    <button class = 'completed-button'></button>
                                    <div class = 'task-info'>
                                        <h5 class = 'task-name'>${taskName}</h5>
                                        <h6 class = 'task-desc'>${taskDesc}</h6>
                                    </div>
                                </div>
                                <div class = 'right-task-info'>
                                    <h6 class = 'task-date'>${formatDate(taskDate)}</h6>
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
    // (important) ? importantImgContainer.classList.add('important') : importantImgContainer.classList.remove('important');
    // (completed)?completedImg.classList.add('completed'):completedImg.classList.remove('completed');
    taskShower.appendChild(taskContainer);
}


function showNewTaskForm() {
    if (document.getElementById('new-task-form')) {
        return
    } else {
        const projectTitle = document.getElementById('tasks-project-title');
        const addTaskBtn = document.getElementById('add-task-container');
        const tasksContainer = document.getElementById('task-view-container');
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
                                        <div class = 'new-form-buttons'>
                                            <button class = 'add-button' id = 'add-new-task'>Add</button>
                                            <button class = 'cancel-button' id = 'cancel-new-task'>Cancel</button>
                                        </div>`;
        tasksContainer.insertBefore(taskFormContainer, addTaskBtn);

        const cancelNewTaskBtn = document.getElementById('cancel-new-task');
        const addNewTaskBtn = document.getElementById('add-new-task');

        const taskNameInput = document.getElementById('new-task-name');
        const taskDescInput = document.getElementById('new-task-desc');
        const taskDateInput = document.getElementById('task-date');

        taskNameInput.focus();

        taskNameInput.addEventListener('keydown', e => {
            if (e.key === 'Enter') {
                e.preventDefault();
                taskDescInput.setSelectionRange(0, 0);
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
            }
        })

        addNewTaskBtn.onclick = () => {
            createTask(projectTitle, taskNameInput, taskDescInput, taskDateInput);
            hideNewTaskForm();
        };

        cancelNewTaskBtn.onclick = () => { hideNewTaskForm() };
    }
}

function handleTaskClicks() {
    const tasks = document.querySelectorAll('.task');
    const tasksContainer = document.getElementById('task-shower')
    const projectName = document.getElementById('tasks-project-title');

    tasksContainer.addEventListener('click', e => {       //Add event listener for whole screen
        let clickOutside = true;

        tasks.forEach(task => {
            const optionsContainer = task.querySelector('.task-options-container');
            const taskName = task.querySelector('.task-name');
            const importantBtn = task.querySelector('.important-img');
            const completedBtn = task.querySelector('.completed-button');
            const ellipsis = task.querySelector('.option');
            const editBtn = task.querySelector('.edit-task');
            const deleteBtn = task.querySelector('.delete-task');

            if (e.target === ellipsis || e.target === optionsContainer) {
                clickOutside = false;
                optionsContainer.classList.remove('hidden');
            } else {
                optionsContainer.classList.add('hidden');
            }

            if (e.target === deleteBtn) {
                removeTask(projectName, taskName);
            }

            if (e.target === editBtn) {
                hideEditTaskForm(); //hides all task edits 
                showEditTaskForm(task); //opens selected task edit
            }
            if (e.target === importantBtn) {
                toogleCompleted(projectName, taskName);
                console.log('important');
            }
            if (e.target === completedBtn) {
                toogleImportant(projectName, taskName);
                console.log('completed');
            }
        });

        if (clickOutside) {
            const allOptionsContainer = document.querySelectorAll('.task-options-container');

            allOptionsContainer.forEach(optionContainer => {
                optionContainer.classList.add('hidden');
            })
        }
    })
}

function showEditTaskForm(task) {
    const currentProject = document.getElementById('tasks-project-title');
    const currentTaskName = task.querySelector('.task-name');
    const currentTaskDesc = task.querySelector('.task-desc');
    const currentTaskDate = task.querySelector('.task-date');
    const leftTaskInfo = task.querySelector('.left-task-info');
    const rightTaskInfo = task.querySelector('.right-task-info');

    leftTaskInfo.classList.add('hidden');
    rightTaskInfo.classList.add('hidden');

    const editTaskForm = document.createElement('div');
    editTaskForm.classList.add('edit-task-form'); //creates whole form
    editTaskForm.innerHTML = `<div class = 'new-form'>
                                            <label for='new-task-name'>Title:</label>
                                            <input type = 'text' id = 'edit-task-name' placeholder = 'Enter your task name' autocomplete = 'off'>
                                            <label for='new-task-desc'>Description (optional):</label>
                                            <textarea type = 'text' id = 'edit-task-desc' placeholder = 'Enter a description for your task' autocomplete = 'off' wrap="hard"></textarea>
                                            <label for='task-date'>Due date:</label>
                                            <input type = 'date' id = 'edit-task-date'>
                                        </div>
                                        <div class = 'new-form-buttons'>
                                            <button class = 'add-button' id = 'edit-task'>Save</button>
                                            <button class = 'cancel-button' id = 'cancel-edit-task'>Cancel</button>
                                        </div>`;
    task.appendChild(editTaskForm);

    const newTaskName = task.querySelector('#edit-task-name');
    const newTaskDesc = task.querySelector('#edit-task-desc');
    const newTaskDate = task.querySelector('#edit-task-date');
    const editBtn = task.querySelector('#edit-task');
    const cancelRename = task.querySelector('#cancel-edit-task');

    newTaskName.focus();

    newTaskName.value = currentTaskName.innerText;
    newTaskDesc.value = currentTaskDesc.innerText;
    newTaskDate.value = reFormatDate(currentTaskDate.innerText); //Brings simplified date (i.e 19 Aug 2023) to input date format (2023-08-19)

    newTaskName.addEventListener('keydown', e => {
        if (e.key === 'Enter') {
            e.preventDefault();
            newTaskDesc.focus();
        }
    });

    newTaskDesc.addEventListener('keydown', e => {
        if (e.key === 'Enter') {
            newTaskDate.focus();
        }
    })

    newTaskDate.addEventListener('keydown', e => {
        if (e.key === 'Enter') {
            editTask(currentProject, currentTaskName, newTaskName, newTaskDesc, newTaskDate);
        }
    })

    editBtn.onclick = () => {
        editTask(currentProject, currentTaskName, newTaskName, newTaskDesc, newTaskDate);
    };

    cancelRename.onclick = () => {
        hideEditTaskForm();
    }
}

function hideEditTaskForm() {
    const tasks = document.querySelectorAll('.task');

    tasks.forEach(task => {
        const renameTaskForm = task.querySelector('.edit-task-form');

        if (renameTaskForm !== null) {
            task.removeChild(renameTaskForm);

            task.querySelector('.left-task-info').classList.remove('hidden');
            task.querySelector('.right-task-info').classList.remove('hidden');
        }
    })
}
