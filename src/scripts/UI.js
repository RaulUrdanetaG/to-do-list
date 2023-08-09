import menuOutlineSvg from '../assets/menu-outline.svg';
import logoImg from '../assets/tick-logo.png';
import gitHubLogo from '../assets/logo-github.svg';
import addLogo from '../assets/duplicate-outline.svg'

import { currentDate, formatDate } from './dateManager';
import Storage from './storage';

function createHeader() {
    const content = document.getElementById('content');

    const header = document.createElement('header');
    content.appendChild(header);

    const menuButton = document.createElement('div');
    menuButton.classList.add('hide-menu');
    header.appendChild(menuButton);

    const menuBtnImg = document.createElement('img');
    menuBtnImg.src = menuOutlineSvg;
    menuButton.appendChild(menuBtnImg);

    const titleContainer = document.createElement('div');
    titleContainer.classList.add('title-container');
    header.appendChild(titleContainer);

    const titleLogo = document.createElement('img');
    titleLogo.classList.add('title-img');
    titleLogo.src = logoImg;
    titleContainer.appendChild(titleLogo);

    const titleText = document.createElement('h3');
    titleText.innerText = 'Tick Task';
    titleContainer.appendChild(titleText);

    const currentDateContainer = document.createElement('div');
    currentDateContainer.classList.add('current-date-container');
    header.appendChild(currentDateContainer);

    const todayIsText = document.createElement('h6');
    todayIsText.innerText = 'Today is: ';
    currentDateContainer.appendChild(todayIsText);

    const currentDateText = document.createElement('h5');
    currentDateText.innerText = formatDate(currentDate());
    currentDateContainer.appendChild(currentDateText);
};

function createFooter() {
    const content = document.getElementById('content');

    const footer = document.createElement('footer');
    content.appendChild(footer);


    const websiteInfo = document.createElement('div');
    websiteInfo.classList.add('creator-info');
    websiteInfo.innerHTML = `<h6>Made by </h6>
                            <a href="https://github.com/RaulUrdanetaG" target="_blank"><img src="${gitHubLogo}" alt="Github logo"></a>
                            <h6><a href="https://github.com/RaulUrdanetaG" target="_blank">Raul Urdaneta</a></h6>`;
    footer.appendChild(websiteInfo);
}

function sideBar(){
    const content = document.getElementById('content');

    const sideBarContainer = document.createElement('section');
    sideBarContainer.id = 'side-bar';
    content.appendChild(sideBarContainer);
    
    const projectFormContainer = document.createElement('div');
    projectFormContainer.id ='new-project-form';
    projectFormContainer.classList.add('hidden');
    projectFormContainer.innerHTML = `<div class = 'new-form'><img src ='${menuOutlineSvg}'>
                                     <input type = 'text' id = 'new-project-name' placeholder = 'Enter your project name' autocomplete = 'off'></input></div>
                                     <div class = 'new-form-buttons'><button class = 'add-button' id = 'add-new-project'>Add</button>
                                     <button class = 'cancel-button' id = 'cancel-new-project'>Cancel</button></div>`;
    sideBarContainer.appendChild(projectFormContainer);

    const addProjectContainer = document.createElement('div');
    addProjectContainer.classList.add('add-project-container');
    addProjectContainer.innerHTML = `<img src = '${addLogo}'><p>Add Project</p>`;
    sideBarContainer.appendChild(addProjectContainer);

    const cancelNewProjectBtn = document.getElementById('cancel-new-project');

    addProjectContainer.onclick = () =>{showNewProjectForm()};
    cancelNewProjectBtn.onclick = () =>{hideNewProjectForm()};
}

function showNewProjectForm(){
    const formContainer = document.getElementById('new-project-form');
    formContainer.classList.remove('hidden');
}

function hideNewProjectForm(){
    const formContainer = document.getElementById('new-project-form');
    const input = document.getElementById('new-project-name');
    input.value = '';
    formContainer.classList.add('hidden');
}

function loadHome() {
    createHeader();
    sideBar();
    createFooter();
};

export default loadHome;