import { Injectable } from '@angular/core';
import { Task } from '../models/task.model';
@Injectable({
  providedIn: 'root'
})

export class TaskService {
  private readonly storageKey = 'tasks';
  constructor() { }

  getTasks(): Task[] {

    const tasks = localStorage.getItem(this.storageKey);
    console.log(tasks);
    return tasks ? JSON.parse(tasks) : [];
  };

  saveTasks(tasks: Task[]): void {
    localStorage.setItem(this.storageKey, JSON.stringify(tasks));
  };

  addTask(task: Task): void {
    const tasks = this.getTasks();
    tasks.push(task);
    this.saveTasks(tasks);
  };

  updateTask(updatedTask: Task): void {
    const tasks = this.getTasks();
    const index = tasks.findIndex(task => task.id === updatedTask.id);
    if (index !== -1) {
      tasks[index] = updatedTask;
      this.saveTasks(tasks);
    }
  };

  deleteTask(id: number): void {
    const tasks = this.getTasks().filter(task => task.id !== id);
    this.saveTasks(tasks);
  };

  clearCompletedTasks(): void {
    const tasks = this.getTasks().filter(task => !task.completed);
    this.saveTasks(tasks);
  ;}
};
