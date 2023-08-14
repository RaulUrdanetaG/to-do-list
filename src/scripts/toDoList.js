import { isToday, isThisWeek } from "date-fns";
import { sortAscDates, formatDate } from "./dateManager";
import { Project } from "./project";

export class ToDoList {
    constructor() {
        this.projects = [];
        this.projects.push(new Project('All Tasks'));
        this.projects.push(new Project('Today'));
        this.projects.push(new Project('Next 7 Days'));
        this.projects.push(new Project('Important'));
    }

    setProjects = (storageProjects) => {
        this.projects = storageProjects;
    }

    getProject = (projectName) => {
        return this.projects.find(project => project.name === projectName);
    }

    getProjects = () => {
        return this.projects;
    }

    addProject = (newProject) => {
        if (this.projects.some(project => project.name === newProject.name)) return
        this.projects.push(newProject);
    }

    removeProject = (projectName) => {
        this.projects = this.projects.filter(project => project.name !== projectName);
    }

    contains(projectName) {
        return this.projects.some((project) => project.getName() === projectName)
    }

    updateAllTasksProject() {
        this.getProject('All Tasks').tasks = [];

        this.projects.forEach(project => {
            if (project.getName() !== 'All Tasks' && project.getName() !== 'Today' && project.getName() !== 'Next 7 Days' && project.getName() !== 'Important') {
                project.getTasks().forEach(task => this.getProject('All Tasks').tasks.push(task));
            }
        })
    }

    updateTodayTasks() {
        this.getProject('Today').tasks = [];

        this.projects.forEach(project => {
            if (project.getName() !== 'All Tasks' && project.getName() !== 'Today' && project.getName() !== 'Next 7 Days' && project.getName() !== 'Important') {
                project.getTasks().forEach(task => {
                    if (isToday(new Date(task.date))) {
                        this.getProject('Today').tasks.push(task);
                    }
                });
            }
        })
    }

    updateNextWeekTasks() {
        this.getProject('Next 7 Days').tasks = [];

        this.projects.forEach(project => {
            if (project.getName() !== 'All Tasks' && project.getName() !== 'Today' && project.getName() !== 'Next 7 Days' && project.getName() !== 'Important') {
                project.getTasks().forEach(task => {
                    if (isThisWeek(new Date(task.date))) {
                        this.getProject('Next 7 Days').tasks.push(task);
                    }
                });
            }
        })
    }

    updateImportantTasks() {
        this.getProject('Important').tasks = [];

        this.projects.forEach(project => {
            if (project.getName() !== 'All Tasks' && project.getName() !== 'Today' && project.getName() !== 'Next 7 Days' && project.getName() !== 'Important') {
                project.getTasks().forEach(task => {
                    if (task.important) {
                        this.getProject('Important').tasks.push(task);
                    }
                });
            }
        })
    }

    getNearestDate(projectName) {
        let dates = [];
        if (this.getProject(projectName).getTasks().length == 0) { //check if it has no tasks
            return ['-']
        } else {
            this.getProject(projectName).getTasks().forEach(task => {
                if (task.completed) { } else {                       //if task is completed dont count it
                    dates.push(new Date(task.date));
                }
            })
            if (dates.length == 0) {
                return ['-']
            } else {
                return formatDate(sortAscDates(dates)[0]);
            }
        }
    }
}