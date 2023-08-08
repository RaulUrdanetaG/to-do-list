const createTask = (name, description, date, important, completed) => {
    return {
        name,
        description,
        date,
        important: important,
        completed: completed,
    }
};

export default createTask;