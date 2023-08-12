import ellipsisImg from '../assets/ellipsis-vertical-outline.svg';
import addLogo from '../assets/duplicate-outline.svg';

import Storage from './storage';
import { Project } from './project';

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
    <h6>${title}</h6>`;
    sideBarContainer.appendChild(homeProjectContainer);
}

export function loadProjects() {
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
    clearShownProjects();
    loadProjects();
}

function removeProject(projectName) {
    Storage.removeProject(projectName.innerText);
    clearShownProjects();
    loadProjects();
}

function renameProject(projectName, newProjectName) {
    Storage.renameProject(projectName.innerText, newProjectName.value);
    clearShownProjects()
    loadProjects();
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

function clearShownProjects() {
    const projectsContainer = document.getElementById('projects-container');
    projectsContainer.innerHTML = '';
}

function handleProjectClicks() {
    const projects = document.querySelectorAll('.project');

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
                deleteBtn.addEventListener('click', removeProject(projectName));
            }

            if (e.target === renameBtn) {
                deleteBtn.addEventListener('click', showRenameForm(project));
            }


        });

        if (clickOutside) {
            const allOptionsContainer = document.querySelectorAll('.options-container');

            allOptionsContainer.forEach(optionContainer => {
                optionContainer.classList.add('hidden');
            })
        }
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
    renameProjectForm.classList.add('rename-project-form');
    renameProjectForm.innerHTML = `<div class = 'new-form'>
                                        <input type = 'text' id = 'rename-project-text' placeholder = 'Enter your project name' autocomplete = 'off'>
                                    </div>
                                    <div class = 'new-form-buttons'>
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
            renameProject(currentProjectName, newNameProject)
        }
    })

    renameBtn.onclick = () => { renameProject(currentProjectName, newNameProject) };
    cancelRename.onclick = () => {
        project.removeChild(renameProjectForm);
        currentProjectName.classList.remove('hidden');
        projectEllipsis.classList.remove('hidden');
    };
}
