import menuOutlineSvg from '../assets/menu-outline.svg';
import createTask from './task';
import { checkThisWeek, checkToday, currentDate, formatDate, adjustTimezone } from './dateManager';
import createProject from './project';

//pruebas de logica, borrar despues
const alo1 = [];
const projects = [];

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
    titleContainer.appendChild(titleLogo);

    const titleText = document.createElement('h3');
    titleText.innerText = 'Tick Task';
    titleContainer.appendChild(titleText);

    const currentDateText = document.createElement('h3');
    currentDateText.innerText = formatDate(currentDate());
    header.appendChild(currentDateText);


    const date = document.createElement('input');
    date.type = 'date';
    date.id = 'date';
    header.appendChild(date);

    const btn = document.createElement('button');
    btn.innerText = 'date';
    header.appendChild(btn);


    //date usage tests
    btn.addEventListener('click', () => {
        const selectedDate = adjustTimezone(date.value);
        alo1.push(createTask('alo', 'sapito', selectedDate, true, false));


        console.log(currentDate());
        console.log(selectedDate);
        console.log(alo1[0].date);
        console.log(alo1);
        console.log(checkToday(alo1[0].date));
        console.log(checkThisWeek(alo1[0].date));
        console.log(formatDate(alo1[0].date));

    });

    const projectName = document.createElement('input');
    projectName.type = 'text';
    header.appendChild(projectName);

    const btn1 = document.createElement('button');
    btn1.innerText = 'project';
    header.appendChild(btn1);

    btn1.addEventListener('click', () => {
        const pName = projectName.value;
        projects.push(createProject(pName));
        console.log(projects);
    });
    const projectNameSearch = document.createElement('input');
    projectNameSearch.type = 'text';
    header.appendChild(projectNameSearch);

    const btn2 = document.createElement('button');
    btn2.innerText = 'add task';
    header.appendChild(btn2);

    btn2.addEventListener('click', () => {
        const searchName = projectNameSearch.value;
        const a = projects.filter(function(project) {
            if(project.name === searchName){
                project.addTask(alo1);
                return true;
            }
        });
        console.log(searchName);
        console.log(a);
        
    });
};


function loadHome() {
    createHeader();
};

export default loadHome;