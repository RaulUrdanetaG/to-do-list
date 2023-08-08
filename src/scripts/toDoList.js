import createProject from "./project";

const createToDoList = () => {
    let projects = [];

    const addProject = (newProject) => {
        if (projects.some(project => project.name === newProject.name)) return
        projects.push(newProject);
    }

    const removeProject = (projectName) =>{
        projects = projects.filter(project => project.name !== projectName);
    }

    return {
        projects,
        addProject,
        removeProject
    }
}