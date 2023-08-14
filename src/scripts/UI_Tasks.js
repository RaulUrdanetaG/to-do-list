import addLogo from '../assets/duplicate-outline.svg';
import importantOutlineImg from '../assets/star-outline.svg';
import importantImg from '../assets/star.svg';
import ellipsisImg from '../assets/ellipsis-vertical-outline.svg';
import notCompletedImg from '../assets/circle-outline.svg';
import completedImg from '../assets/checkmark-circle-outline.svg';

import Storage from './storage';
import { adjustTimezone, formatDate, reFormatDate } from './dateManager';
import { Task } from './task';

export function loadTasks() {
    clearTasks();
    let projectSelectedTitle = document.getElementById('tasks-project-title');
    if (projectSelectedTitle.innerText === 'All Tasks') {
        const toDoList = Storage.getToDoList();

        toDoList.updateAllTasksProject();
        Storage.saveLocal(toDoList);

        Storage.getToDoList().getProject('All Tasks').getTasks().forEach(task => {
            showHomeTask(task.projectName, task.name, task.description, task.date, task.important, task.completed);
        });
        if (document.getElementById('add-task-container')) {
            removeTaskBtn();
        };
        const nearestDateText = document.getElementById('nearest-date');
        nearestDateText.innerText = `${toDoList.getNearestDate('All Tasks')}`;

    } else if (projectSelectedTitle.innerText === 'Today') {

        const toDoList = Storage.getToDoList();

        toDoList.updateTodayTasks();
        Storage.saveLocal(toDoList);

        Storage.getToDoList().getProject('Today').getTasks().forEach(task => {
            showHomeTask(task.projectName, task.name, task.description, task.date, task.important, task.completed);
        });
        if (document.getElementById('add-task-container')) {
            removeTaskBtn();
        }
        const nearestDateText = document.getElementById('nearest-date');
        nearestDateText.innerText = `${toDoList.getNearestDate('Today')}`;

    } else if (projectSelectedTitle.innerText === 'Next 7 Days') {

        const toDoList = Storage.getToDoList();

        toDoList.updateNextWeekTasks();
        Storage.saveLocal(toDoList);

        Storage.getToDoList().getProject('Next 7 Days').getTasks().forEach(task => {
            showHomeTask(task.projectName, task.name, task.description, task.date, task.important, task.completed);
        });
        if (document.getElementById('add-task-container')) {
            removeTaskBtn();
        }
        const nearestDateText = document.getElementById('nearest-date');
        nearestDateText.innerText = `${toDoList.getNearestDate('Next 7 Days')}`;

    } else if (projectSelectedTitle.innerText === 'Important') {

        const toDoList = Storage.getToDoList();

        toDoList.updateImportantTasks();
        Storage.saveLocal(toDoList);

        Storage.getToDoList().getProject('Important').getTasks().forEach(task => {
            showHomeTask(task.projectName, task.name, task.description, task.date, task.important, task.completed);
        });
        if (document.getElementById('add-task-container')) {
            removeTaskBtn();
        }

        const nearestDateText = document.getElementById('nearest-date');
        nearestDateText.innerText = `${formatDate(toDoList.getNearestDate('Important'))}`;

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
        const nearestDateText = document.getElementById('nearest-date');
        nearestDateText.innerText = `${toDoList.getNearestDate(`${projectSelectedTitle.innerText}`)}`;
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
    const taskFormContainer = document.querySelector('.new-task-form');
    const inputName = document.getElementById('new-task-name');
    const inputDesc = document.getElementById('new-task-desc');
    const inputDate = document.getElementById('task-date');
    inputName.value = '';
    inputDesc.value = '';
    inputDate.value = '';
    tasksContainer.removeChild(taskFormContainer);
}

function createTask(projectName, taskName, taskDesc, taskDate) {
    Storage.addTask(projectName.innerText, new Task(projectName.innerText, taskName.value, taskDesc.value, adjustTimezone(taskDate.value), false, false)); //sets important and completed to false automatically
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

    let importantImgSelect;
    if (important) {
        importantImgSelect = importantImg;
    } else {
        importantImgSelect = importantOutlineImg;
    }

    let completedImgSelect;
    if (completed) {
        completedImgSelect = completedImg;
    } else {
        completedImgSelect = notCompletedImg;
    }

    taskContainer.classList.add('task');
    taskContainer.innerHTML = `<div class = 'left-task-info'>
                                    <img class = 'completed-button' src = '${completedImgSelect}'>
                                    <div class = 'task-info'>
                                        <h5 class = 'task-name'>${taskName}</h5>
                                        <h6 class = 'task-desc'>${taskDesc}</h6>
                                    </div>
                                </div>
                                <div class = 'right-task-info'>
                                    <h6 class = 'task-date'>${formatDate(taskDate)}</h6>
                                        <img class ='important-img' src='${importantImgSelect}'>
                                        <img class = 'option' src = '${ellipsisImg}'>
                                    <div class = 'task-options-container hidden'>
                                        <p class = 'edit-task'>Edit</p>
                                        <p class = 'delete-task'>Delete</p>
                                    </div>
                                </div >`;


    const importantImgContainer = taskContainer.querySelector('.important-img');

    (important) ? importantImgContainer.classList.add('important') : importantImgContainer.classList.remove('important');
    (completed) ? taskContainer.classList.add('completed') : taskContainer.classList.remove('completed');
    taskShower.appendChild(taskContainer);
}

function showHomeTask(projectName, taskName, taskDesc, taskDate, important, completed) {
    const taskShower = document.getElementById('task-shower');
    const taskContainer = document.createElement('div');

    let importantImgSelect;
    if (important) {
        importantImgSelect = importantImg;
    } else {
        importantImgSelect = importantOutlineImg;
    }

    let completedImgSelect;
    if (completed) {
        completedImgSelect = completedImg;
    } else {
        completedImgSelect = notCompletedImg;
    }

    taskContainer.classList.add('task');
    taskContainer.innerHTML = `<div class = 'left-task-info'>
                                    <img class = 'completed-button' src = '${completedImgSelect}'>
                                    <div class = 'task-info'>
                                        <h5 class = 'p-name'>${projectName}</h5>
                                        <h5 class = 'task-name'>${taskName}</h5>
                                        <h6 class = 'task-desc'>${taskDesc}</h6>
                                    </div>
                                </div>
                                <div class = 'right-task-info'>
                                    <h6 class = 'task-date'>${formatDate(taskDate)}</h6>
                                        <img class ='important-img' src='${importantImgSelect}'>
                                    <div class = 'task-options-container hidden'>
                                        <p class = 'edit-task'>Edit</p>
                                        <p class = 'delete-task'>Delete</p>
                                    </div>
                                </div >`;


    const importantImgContainer = taskContainer.querySelector('.important-img');

    (important) ? importantImgContainer.classList.add('important') : importantImgContainer.classList.remove('important');
    (completed) ? taskContainer.classList.add('completed') : taskContainer.classList.remove('completed');
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
        taskFormContainer.classList.add('new-task-form');
        taskFormContainer.innerHTML = `<div id = 'new-task-form'>
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
                checkNewTaskName(projectTitle);
            }
        })

        addNewTaskBtn.onclick = () => {
            checkNewTaskName(projectTitle);
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
            }
            if (e.target === completedBtn) {
                toogleImportant(projectName, taskName);
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
    editTaskForm.innerHTML = `<div id = 'edit-task-form'>
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
            checkEditTaskName(currentProject, currentTaskName); // aquiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiiii
        }
    })

    editBtn.onclick = () => {
        checkEditTaskName(currentProject, currentTaskName);
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

function checkNewTaskName(projectTitle) {

    //gets all form elements
    const newTaskForm = document.getElementById('new-task-form');
    const taskNameInput = document.getElementById('new-task-name');
    const taskDescInput = document.getElementById('new-task-desc');
    const taskDateInput = document.getElementById('task-date');
    const newTaskBtns = document.querySelector('.new-form-buttons');

    if (taskNameInput.value === '') { //When name is empty
        if (document.getElementById('enter-name-alert')) { //if alert has aleady shown dont show another one
            return
        } else if (document.getElementById('task-exists-alert')) { //if other alert has been shown hide it and show new alert
            const existingProjectAlert = document.getElementById('task-exists-alert');
            newTaskForm.removeChild(existingProjectAlert);

            const emptyNameAlert = document.createElement('p');
            emptyNameAlert.id = 'enter-name-alert';
            emptyNameAlert.innerText = 'Please enter a name';
            taskNameInput.insertAdjacentElement('afterend', emptyNameAlert);
        } else {                                                            //Show alert when name is empty
            const emptyNameAlert = document.createElement('p');
            emptyNameAlert.id = 'enter-name-alert';
            emptyNameAlert.innerText = 'Please enter a name';
            taskNameInput.insertAdjacentElement('afterend', emptyNameAlert);
        }
    } else if (Storage.getToDoList().getProject(projectTitle.innerText).containsTask(taskNameInput.value)) { //when name alredy exists
        if (document.getElementById('task-exists-alert')) {
            return
        } else if (document.getElementById('enter-name-alert')) {
            const emptyNameAlert = document.getElementById('enter-name-alert');
            newTaskForm.removeChild(emptyNameAlert);

            const existingProjectAlert = document.createElement('p');
            existingProjectAlert.id = 'task-exists-alert';
            existingProjectAlert.innerText = 'This project already exists';
            taskNameInput.insertAdjacentElement('afterend', existingProjectAlert);
        } else {
            const existingProjectAlert = document.createElement('p');
            existingProjectAlert.id = 'task-exists-alert';
            existingProjectAlert.innerText = 'This project already exists';
            taskNameInput.insertAdjacentElement('afterend', existingProjectAlert);
        }
    } else if (taskDateInput.value === '' || taskDateInput.value === '1969-12-31') {
        const emptyDateAlert = document.createElement('p');
        emptyDateAlert.id = 'empty-edit-date-alert';
        emptyDateAlert.innerText = 'Please enter a date';
        taskDateInput.insertAdjacentElement('afterend', emptyDateAlert);
    } else {
        
        createTask(projectTitle, taskNameInput, taskDescInput, taskDateInput);
        hideNewTaskForm();
    }
}

function checkEditTaskName(currentProject, currentTask) {

    //gets all form elements
    const newTaskForm = document.getElementById('edit-task-form');
    const newTaskName = document.getElementById('edit-task-name');
    const newTaskDesc = document.getElementById('edit-task-desc');
    const newTaskDate = document.getElementById('edit-task-date');
    const newTaskBtns = document.querySelector('.new-form-buttons');

    if (newTaskName.value === '') { //When name is empty
        if (document.getElementById('enter-name-alert')) { //if alert has aleady shown dont show another one
            return
        } else if (document.getElementById('task-exists-alert')) { //if other alert has been shown hide it and show new alert
            const existingTaskAlert = document.getElementById('task-exists-alert');
            newTaskForm.removeChild(existingTaskAlert);

            const emptyNameAlert = document.createElement('p');
            emptyNameAlert.id = 'enter-name-alert';
            emptyNameAlert.innerText = 'Please enter a name';
            newTaskName.insertAdjacentElement('afterend', emptyNameAlert);
        } else {                                                            //Show alert when name is empty
            const emptyNameAlert = document.createElement('p');
            emptyNameAlert.id = 'enter-name-alert';
            emptyNameAlert.innerText = 'Please enter a name';
            newTaskName.insertAdjacentElement('afterend', emptyNameAlert);
        }
    } else if (Storage.getToDoList().getProject(currentProject.innerText).containsTask(newTaskName.value) && currentTask.innerText !== newTaskName.value) { //when name alredy exists
        if (document.getElementById('task-exists-alert')) {
            return
        } else if (document.getElementById('enter-name-alert')) {
            const emptyNameAlert = document.getElementById('enter-name-alert');
            newTaskForm.removeChild(emptyNameAlert);

            const existingTaskAlert = document.createElement('p');
            existingTaskAlert.id = 'task-exists-alert';
            existingTaskAlert.innerText = 'This project already exists';
            newTaskName.insertAdjacentElement('afterend', existingTaskAlert);
        } else {
            const existingTaskAlert = document.createElement('p');
            existingTaskAlert.id = 'task-exists-alert';
            existingTaskAlert.innerText = 'This project already exists';
            newTaskName.insertAdjacentElement('afterend', existingTaskAlert);
        }
    } else {
        editTask(currentProject, currentTask, newTaskName, newTaskDesc, newTaskDate);
    }
}
