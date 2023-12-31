import menuOutlineSvg from '../assets/menu-outline.svg';
import logoImg from '../assets/tick-logo.png';
import titleLogo from '../assets/tick-logo.ico';
import gitHubLogo from '../assets/logo-github.svg';
import allTaskImg from '../assets/folder-open-outline.svg';
import todayImg from '../assets/today.svg';
import n7dImg from '../assets/this_week.svg';
import importantImg from '../assets/star-outline.svg';

import { currentDate, formatDate } from './dateManager';
import { loadProjects, createHomeProjects, addProjectBtn } from './UI_Projects';

function createHeader() {
  const content = document.getElementById('content');

  const header = document.createElement('header');
  content.appendChild(header);

  const menuButton = document.createElement('div');
  menuButton.classList.add('hide-menu');
  header.appendChild(menuButton);

  const menuBtnImg = document.createElement('img');
  menuBtnImg.id = 'open-menu-button';
  menuBtnImg.src = menuOutlineSvg;
  menuButton.appendChild(menuBtnImg);

  // eslint-disable-next-line no-use-before-define
  window.addEventListener('resize', hideSideBar);

  const titleContainer = document.createElement('div');
  titleContainer.classList.add('title-container');
  header.appendChild(titleContainer);

  // eslint-disable-next-line no-shadow
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
}

function sideBar() {
  const content = document.getElementById('content');

  const sideBarContainer = document.createElement('section');
  sideBarContainer.id = 'side-bar';
  content.appendChild(sideBarContainer);

  const homeTitle = document.createElement('h5');
  homeTitle.innerText = 'Home';
  homeTitle.classList.add('home-title');
  sideBarContainer.appendChild(homeTitle);

  const homeProjectsContainer = document.createElement('div');
  homeProjectsContainer.id = 'home-projects-container';
  sideBarContainer.appendChild(homeProjectsContainer);

  createHomeProjects('All Tasks', allTaskImg);
  createHomeProjects('Today', todayImg);
  createHomeProjects('Next 7 Days', n7dImg);
  createHomeProjects('Important', importantImg);

  const projectsTitle = document.createElement('h5');
  projectsTitle.innerText = 'Projects';
  projectsTitle.classList.add('projects-title');
  sideBarContainer.appendChild(projectsTitle);

  const projectsContainer = document.createElement('div');
  projectsContainer.id = 'projects-container';
  sideBarContainer.appendChild(projectsContainer);

  loadProjects();
  addProjectBtn();
}

function hideSideBar() {
  // eslint-disable-next-line no-shadow
  const sideBar = document.getElementById('side-bar');
  const menuBtnImg = document.getElementById('open-menu-button');

  if (window.innerWidth > 845) {
    sideBar.classList.remove('hidden');
  } else {
    menuBtnImg.onclick = () => { sideBar.classList.toggle('hidden'); };
  }
}

function taskBar() {
  const content = document.getElementById('content');

  const taskViewer = document.createElement('section');
  taskViewer.id = 'task-view-container';
  content.appendChild(taskViewer);

  const taskViewerTitle = document.createElement('div');
  taskViewerTitle.classList.add('task-view-title');
  taskViewerTitle.innerHTML = `<h4 id = 'tasks-project-title'>Welcome!</h4>
                                <div id = 'neares-due-date-container'>
                                    <p>Nearest due date:</p>
                                    <p id='nearest-date'>-</p>
                                </div>`;
  taskViewer.appendChild(taskViewerTitle);

  const tasks = document.createElement('div');
  tasks.id = 'task-shower';
  taskViewer.appendChild(tasks);
}

function createFooter() {
  const content = document.getElementById('content');

  const footer = document.createElement('footer');
  content.appendChild(footer);

  const websiteInfo = document.createElement('div');
  websiteInfo.classList.add('creator-info');
  websiteInfo.innerHTML = `<h6><strong>Made by </strong></h6>
                            <a href="https://github.com/RaulUrdanetaG" target="_blank"><img src="${gitHubLogo}" alt="Github logo"></a>
                            <h6><a href="https://github.com/RaulUrdanetaG" target="_blank"><strong>Raul Urdaneta</strong></a></h6>`;
  footer.appendChild(websiteInfo);
}

function loadHome() {
  const titleImg = document.querySelector('link[rel="icon"]');
  titleImg.href = titleLogo;

  createHeader();
  sideBar();
  taskBar();
  createFooter();
}

export default loadHome;
