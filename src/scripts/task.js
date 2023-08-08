export class Task {
    constructor(name, description, date, important, completed) {
        this.name = name;
        this.description = description;
        this.date = date;
        this.important = important;
        this.completed = completed;
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