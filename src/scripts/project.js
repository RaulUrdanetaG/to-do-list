const createProject = (name) =>{
    let tasks = [];

    const addTask = (task) =>{
        tasks.push(task);
    }

    return{
        name,
        tasks,
        addTask
    }
}

export default createProject;