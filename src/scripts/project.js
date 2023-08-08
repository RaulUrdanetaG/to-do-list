
export class Project {
    constructor(name) {
        this.name = name;
        this.tasks = [];
    }

    setName(newName) {
        this.name = newName;
    }

    getName() {
        return this.name;
    }

    getTask(taskName) {
        return this.tasks.find(task => task.name === taskName);
    }

    setTasks(storageTasks) {
        this.tasks = storageTasks;
    }

    getTasks() {
        return this.tasks;
    }

    addTask(newTask) {
        if (this.tasks.some(task => task.name === newTask.name)) return
        this.tasks.push(newTask);
    };

    removeTask(taskName) {
        this.tasks = this.tasks.filter(task => task.name !== taskName);
    }

    toogleCompleteTask(taskName) {
        this.tasks.find(task => task.name === taskName).completed = !this.tasks.find(task => task.name === taskName).completed;
    }

    toogleImportantTask(taskName) {
        this.tasks.find(task => task.name === taskName).important = !this.tasks.find(task => task.name === taskName).important;
    }
}