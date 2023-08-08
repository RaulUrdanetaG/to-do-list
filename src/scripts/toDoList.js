
export class ToDoList {
    constructor() {
        this.projects = [];
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