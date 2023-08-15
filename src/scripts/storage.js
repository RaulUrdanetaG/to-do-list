/* eslint-disable max-len */
import Task from './task';
import Project from './project';
import ToDoList from './toDoList';

export default class Storage {
  static saveLocal(toDoList) {
    localStorage.setItem('to-do-list', JSON.stringify(toDoList));
  }

  static getToDoList() {
    const toDoList = Object.assign(new ToDoList(), JSON.parse(localStorage.getItem('to-do-list')));

    toDoList.setProjects(toDoList.getProjects().map((project) => Object.assign(new Project(), project)));
    toDoList.getProjects().forEach((project) => project.setTasks(project.getTasks().map((task) => Object.assign(new Task(), task))));

    return toDoList;
  }

  static addProject(newProject) {
    const toDoList = Storage.getToDoList();
    toDoList.addProject(newProject);
    Storage.saveLocal(toDoList);
  }

  static removeProject(projectName) {
    const toDoList = Storage.getToDoList();
    toDoList.removeProject(projectName);
    Storage.saveLocal(toDoList);
  }

  static renameProject(projectName, newName) {
    const toDoList = Storage.getToDoList();
    toDoList.getProject(projectName).getTasks().forEach((task) => task.setProject(newName)); // sets new project name to every task.
    toDoList.getProject(projectName).setName(newName);
    Storage.saveLocal(toDoList);
  }

  static addTask(projectName, newTask) {
    const toDoList = Storage.getToDoList();
    toDoList.getProject(projectName).addTask(newTask);
    Storage.saveLocal(toDoList);
  }

  static removeTask(projectName, taskName) {
    const toDoList = Storage.getToDoList();
    toDoList.getProject(projectName).removeTask(taskName);
    Storage.saveLocal(toDoList);
  }

  static renameTask(projectName, taskName, newName) {
    const toDoList = Storage.getToDoList();
    toDoList.getProject(projectName).getTask(taskName).setName(newName);
    Storage.saveLocal(toDoList);
  }

  static changeDescription(projectName, taskName, newDescription) {
    const toDoList = Storage.getToDoList();
    toDoList.getProject(projectName).getTask(taskName).setDescription(newDescription);
    Storage.saveLocal(toDoList);
  }

  static changeDate(projectName, taskName, newDate) {
    const toDoList = Storage.getToDoList();
    toDoList.getProject(projectName).getTask(taskName).setDate(newDate);
    Storage.saveLocal(toDoList);
  }

  static toogleCompleteTask(projectName, taskName) {
    const toDoList = Storage.getToDoList();
    toDoList.getProject(projectName).toogleCompleteTask(taskName);
    Storage.saveLocal(toDoList);
  }

  static toogleImportantTask(projectName, taskName) {
    const toDoList = Storage.getToDoList();
    toDoList.getProject(projectName).toogleImportantTask(taskName);
    Storage.saveLocal(toDoList);
  }
}
