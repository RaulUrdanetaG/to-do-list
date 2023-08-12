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
}