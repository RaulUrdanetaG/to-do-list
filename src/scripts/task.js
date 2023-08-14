export class Task {
    constructor(projectName, name, description, date, important, completed) {
        this.projectName = projectName;
        this.name = name;
        this.description = description;
        this.date = date;
        this.important = important;
        this.completed = completed;
    }

    setProject(newProject){
        this.projectName = newProject;
    }

    setName(newName) {
        this.name = newName;
    }

    setDate(newDate) {
        this.date = newDate;
    }

    setDescription(newDescription) {
        this.description = newDescription;
    }
}