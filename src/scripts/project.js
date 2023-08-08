const createProject = (name) => {
    let tasks = [];

    const addTask = (newTask) => {
        if (tasks.some(task => task.name === newTask.name)) return
        tasks.push(newTask);
    }

    const deleteTask = (taskName) => {
        tasks = tasks.filter(task => task.name !== taskName);
    }

    return {
        name,
        tasks,
        addTask,
        deleteTask
    }
}

export default createProject;