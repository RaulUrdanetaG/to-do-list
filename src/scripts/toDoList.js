import { isToday, isThisWeek } from 'date-fns';
import { sortAscDates, formatDate } from './dateManager';
import Project from './project';

export default class ToDoList {
  constructor() {
    this.projects = [];
    this.projects.push(new Project('All Tasks'));
    this.projects.push(new Project('Today'));
    this.projects.push(new Project('Next 7 Days'));
    this.projects.push(new Project('Important'));
  }

  setProjects = (storageProjects) => {
    this.projects = storageProjects;
  };

  getProject = (projectName) => this.projects.find((project) => project.name === projectName);

  getProjects = () => this.projects;

  addProject = (newProject) => {
    if (this.projects.some((project) => project.name === newProject.name)) return;
    this.projects.push(newProject);
  };

  removeProject = (projectName) => {
    this.projects = this.projects.filter((project) => project.name !== projectName);
  };

  contains(projectName) {
    return this.projects.some((project) => project.getName() === projectName);
  }

  updateAllTasksProject() {
    this.getProject('All Tasks').tasks = [];

    this.projects.forEach((project) => {
      if (project.getName() !== 'All Tasks' && project.getName() !== 'Today' && project.getName() !== 'Next 7 Days' && project.getName() !== 'Important') {
        project.getTasks().forEach((task) => this.getProject('All Tasks').tasks.push(task));
      }
    });
  }

  updateTodayTasks() {
    this.getProject('Today').tasks = [];

    this.projects.forEach((project) => {
      if (project.getName() !== 'All Tasks' && project.getName() !== 'Today' && project.getName() !== 'Next 7 Days' && project.getName() !== 'Important') {
        project.getTasks().forEach((task) => {
          if (isToday(new Date(task.date))) {
            this.getProject('Today').tasks.push(task);
          }
        });
      }
    });
  }

  updateNextWeekTasks() {
    this.getProject('Next 7 Days').tasks = [];

    this.projects.forEach((project) => {
      if (project.getName() !== 'All Tasks' && project.getName() !== 'Today' && project.getName() !== 'Next 7 Days' && project.getName() !== 'Important') {
        project.getTasks().forEach((task) => {
          if (isThisWeek(new Date(task.date))) {
            this.getProject('Next 7 Days').tasks.push(task);
          }
        });
      }
    });
  }

  updateImportantTasks() {
    this.getProject('Important').tasks = [];

    this.projects.forEach((project) => {
      if (project.getName() !== 'All Tasks' && project.getName() !== 'Today' && project.getName() !== 'Next 7 Days' && project.getName() !== 'Important') {
        project.getTasks().forEach((task) => {
          if (task.important) {
            this.getProject('Important').tasks.push(task);
          }
        });
      }
    });
  }

  getNearestDate(projectName) {
    const dates = [];
    this.getProject(projectName).getTasks().forEach((task) => {
      if (!task.completed) {
        dates.push(new Date(task.date));
      }
    });
    // eslint-disable-next-line max-len
    if (this.getProject(projectName).getTasks().length === 0 || dates.length === 0) { // check if it has no tasks
      return ['-'];
    }
    return formatDate(sortAscDates(dates)[0]);
  }
}
