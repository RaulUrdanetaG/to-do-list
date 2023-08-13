import ellipsisImg from '../assets/ellipsis-vertical-outline.svg';
import addLogo from '../assets/duplicate-outline.svg';

import Storage from './storage';
import { Project } from './project';
import { loadTasks } from './UI_Tasks';



export function addProjectBtn() {
    const sideBar = document.getElementById('side-bar');

    const addProjectContainer = document.createElement('div');
    addProjectContainer.classList.add('add-project-container');
    addProjectContainer.innerHTML = `<img src = '${addLogo}'><p>Add Project</p>`;
    sideBar.appendChild(addProjectContainer);

    addProjectContainer.onclick = () => { showNewProjectForm() };
}

export function createHomeProjects(title, img) {
    const sideBarContainer = document.getElementById('home-projects-container');

    const homeProjectContainer = document.createElement('div');
    homeProjectContainer.classList.add('home-project');
    homeProjectContainer.innerHTML = `<img src='${img}'>
    <h6 class = 'project-title'>${title}</h6>`;
    sideBarContainer.appendChild(homeProjectContainer);
}

export function loadProjects() {
    clearShownProjects();
    const toDoList = Storage.getToDoList();

    toDoList.getProjects().forEach(project => {
        if (project.name !== 'All Tasks' && project.name !== 'Today' && project.name !== 'Next 7 Days' && project.name !== 'Important') {
            showProject(project.name);
        }
    });

    handleProjectClicks();
}

function createProject() {
    const projectName = document.getElementById('new-project-name');
    Storage.addProject(new Project(projectName.value));
    loadProjects();
}

function removeProject(projectName) {
    Storage.removeProject(projectName.innerText);
    loadProjects();
}

function renameProject(newProjectName) {
    const taskProjectName = document.getElementById('tasks-project-title');
    Storage.renameProject(taskProjectName.innerText, newProjectName.value);

    taskProjectName.innerText = newProjectName.value;

    loadProjects();
    loadTasks();
}

function showProject(projectName) {
    const sideBarContainer = document.getElementById('projects-container');

    const projectContainer = document.createElement('div');
    projectContainer.classList.add('project');
    projectContainer.innerHTML = `<h6 class = 'project-title'>${projectName}</h6>
    <img class = 'option' src = '${ellipsisImg}'>
    <div class = 'options-container hidden'>
    <p class = 'rename-option'>Rename</p>
    <p class = 'delete-option'>Delete</p>
    </div>`;
    sideBarContainer.appendChild(projectContainer);
}

function selectProject(project) {
    project.classList.add('selected');

    const projectTitle = project.querySelector('.project-title');
    const taksProjectTitle = document.getElementById('tasks-project-title');
    taksProjectTitle.innerText = `${projectTitle.innerText}`;
}

function clearShownProjects() {
    const projectsContainer = document.getElementById('projects-container');
    projectsContainer.innerHTML = '';
}

function handleProjectClicks() {
    const projects = document.querySelectorAll('.project');
    const homeProjects = document.querySelectorAll('.home-project');

    document.addEventListener('click', e => {       //Add event listener for whole screen
        let clickOutside = true;

        projects.forEach(project => {
            const projectName = project.querySelector('.project-title');
            const optionsContainer = project.querySelector('.options-container');
            const ellipsis = project.querySelector('.option');
            const renameBtn = project.querySelector('.rename-option');
            const deleteBtn = project.querySelector('.delete-option');

            if (e.target === ellipsis || e.target === optionsContainer) {
                clickOutside = false;
                optionsContainer.classList.remove('hidden');
            } else {
                optionsContainer.classList.add('hidden');
            }

            if (e.target === deleteBtn) {
                const taksProjectTitle = document.getElementById('tasks-project-title');
                taksProjectTitle.innerText = 'All Tasks';
                removeProject(projectName);
                loadTasks();
            }

            if (e.target === renameBtn) {
                hideRenameForms();
                showRenameForm(project);
            }
        });

        if (clickOutside) {
            const allOptionsContainer = document.querySelectorAll('.options-container');

            allOptionsContainer.forEach(optionContainer => {
                optionContainer.classList.add('hidden');
            })
        }
    })

    projects.forEach(project => {

        project.addEventListener('click', () => {
            projects.forEach(otherProject => {
                otherProject.classList.remove('selected');
            })
            homeProjects.forEach(otherHomeProject => {
                otherHomeProject.classList.remove('selected');
            })
            selectProject(project);
            loadTasks();
        })

    })

    homeProjects.forEach(homeProject => {
        homeProject.addEventListener('click', () => {
            projects.forEach(otherProject => {
                otherProject.classList.remove('selected');
            })
            homeProjects.forEach(otherHomeProject => {
                otherHomeProject.classList.remove('selected');
            })
            selectProject(homeProject);
            loadTasks();
        })
    })

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
                checkNewProjectName();
            }
        })

        addProjectButton.onclick = () => {
            checkNewProjectName();
        };

        cancelNewProjectBtn.onclick = () => { hideNewProjectForm() };

    }
}

function hideNewProjectForm() {
    const sideBar = document.getElementById('side-bar');
    const projectFormContainer = document.getElementById('new-project-form');
    const input = document.getElementById('new-project-name');
    input.value = '';

    sideBar.removeChild(projectFormContainer);
}

function showRenameForm(project) {
    const currentProjectName = project.querySelector('.project-title');
    const projectEllipsis = project.querySelector('.option');

    currentProjectName.classList.add('hidden');
    projectEllipsis.classList.add('hidden');

    const renameProjectForm = document.createElement('div');
    renameProjectForm.classList.add('rename-project-form'); //creates whole form
    renameProjectForm.innerHTML = `<div class = 'new-form'>
                                        <input type = 'text' id = 'rename-project-text' placeholder = 'Enter your project name' autocomplete = 'off'>
                                    </div>
                                    <div class = 'rename-form-buttons'>
                                        <button class = 'add-button' id = 'rename-project'>Rename</button>
                                        <button class = 'cancel-button' id = 'cancel-rename-project'>Cancel</button>
                                    </div>`;
    project.appendChild(renameProjectForm);

    const newNameProject = project.querySelector('#rename-project-text');
    const renameBtn = project.querySelector('#rename-project');
    const cancelRename = project.querySelector('#cancel-rename-project');

    newNameProject.focus();
    newNameProject.value = currentProjectName.innerText; //Sets the cursor to the end of the word

    newNameProject.addEventListener('keydown', e => { //Create project whe enter is pressed down
        if (e.key === 'Enter') {
            checkRenameProject(newNameProject);
        }
    })

    renameBtn.onclick = () => { checkRenameProject(newNameProject) };
    cancelRename.onclick = () => {
        hideRenameForms();
    };
}

function hideRenameForms() {
    const projects = document.querySelectorAll('.project');

    projects.forEach(project => {
        const renameProjectForm = project.querySelector('.rename-project-form');

        if (renameProjectForm !== null) {
            project.removeChild(renameProjectForm);

            project.querySelector('.project-title').classList.remove('hidden');
            project.querySelector('.option').classList.remove('hidden');
        }
    })
}


function checkNewProjectName() {

    //gets all form elements
    const newProjectForm = document.getElementById('new-project-form');
    const newProjectFormBtns = document.querySelector('.new-form-buttons');
    const projectNameInput = document.getElementById('new-project-name');

    if (projectNameInput.value === '') { //When name is empty
        if (document.getElementById('enter-name-alert')) { //if alert has aleady shown dont show another one
            return
        } else if (document.getElementById('project-exists-alert')) { //if other alert has been shown hide it and show new alert
            const existingProjectAlert = document.getElementById('project-exists-alert');
            newProjectForm.removeChild(existingProjectAlert);

            const emptyNameAlert = document.createElement('p');
            emptyNameAlert.id = 'enter-name-alert';
            emptyNameAlert.innerText = 'Please enter a name';
            newProjectForm.insertBefore(emptyNameAlert, newProjectFormBtns);
        } else {                                                            //Show alert when name is empty
            const emptyNameAlert = document.createElement('p');
            emptyNameAlert.id = 'enter-name-alert';
            emptyNameAlert.innerText = 'Please enter a name';
            newProjectForm.insertBefore(emptyNameAlert, newProjectFormBtns);
        }
    } else if (Storage.getToDoList().contains(projectNameInput.value)) { //when name alredy exists
        if (document.getElementById('project-exists-alert')) {
            return
        } else if (document.getElementById('enter-name-alert')) {
            const emptyNameAlert = document.getElementById('enter-name-alert');
            newProjectForm.removeChild(emptyNameAlert);

            const existingProjectAlert = document.createElement('p');
            existingProjectAlert.id = 'project-exists-alert';
            existingProjectAlert.innerText = 'This project already exists';
            newProjectForm.insertBefore(existingProjectAlert, newProjectFormBtns);
        } else {
            const existingProjectAlert = document.createElement('p');
            existingProjectAlert.id = 'project-exists-alert';
            existingProjectAlert.innerText = 'This project already exists';
            newProjectForm.insertBefore(existingProjectAlert, newProjectFormBtns);
        }
    } else {
        createProject();
        hideNewProjectForm();
    }
}

function checkRenameProject(newProjectName){
    //gets all form elements
    const renameProjectForm = document.querySelector('.rename-project-form');
    const renameProjectFormBtns = document.querySelector('.rename-form-buttons');
    const projectNameInput = document.getElementById('rename-project-text');

    if (projectNameInput.value === '') { //When name is empty
        if (document.getElementById('enter-name-alert')) { //if alert has aleady shown dont show another one
            return
        } else if (document.getElementById('project-exists-alert')) { //if other alert has been shown hide it and show new alert
            const existingProjectAlert = document.getElementById('project-exists-alert');
            renameProjectForm.removeChild(existingProjectAlert);

            const emptyNameAlert = document.createElement('p');
            emptyNameAlert.id = 'enter-name-alert';
            emptyNameAlert.innerText = 'Please enter a name';
            renameProjectForm.insertBefore(emptyNameAlert, renameProjectFormBtns);
        } else {                                                            //Show alert when name is empty
            const emptyNameAlert = document.createElement('p');
            emptyNameAlert.id = 'enter-name-alert';
            emptyNameAlert.innerText = 'Please enter a name';
            renameProjectForm.insertBefore(emptyNameAlert, renameProjectFormBtns);
        }
    } else if (Storage.getToDoList().contains(projectNameInput.value)) { //when name alredy exists
        if (document.getElementById('project-exists-alert')) {
            return
        } else if (document.getElementById('enter-name-alert')) {
            const emptyNameAlert = document.getElementById('enter-name-alert');
            renameProjectForm.removeChild(emptyNameAlert);

            const existingProjectAlert = document.createElement('p');
            existingProjectAlert.id = 'project-exists-alert';
            existingProjectAlert.innerText = 'This project already exists';
            renameProjectForm.insertBefore(existingProjectAlert, renameProjectFormBtns);
        } else {
            const existingProjectAlert = document.createElement('p');
            existingProjectAlert.id = 'project-exists-alert';
            existingProjectAlert.innerText = 'This project already exists';
            renameProjectForm.insertBefore(existingProjectAlert, renameProjectFormBtns);
        }
    } else {
        renameProject(newProjectName);
        hideRenameForms();
    }
}