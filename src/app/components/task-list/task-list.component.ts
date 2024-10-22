import { Component } from '@angular/core';
import { Task } from '../../models/task.model';
import { TaskService } from '../../services/task.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatCardModule,
    MatCheckboxModule],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})

export class TaskListComponent {
  tasks: Task[] = [];
  filter: 'all' | 'completed' | 'incomplete' = 'all';
  editingTaskId: number | null = null;

  constructor(private taskService: TaskService) { }

  ngOnInit() {
    this.loadTasks();
  };

  loadTasks() {
    this.tasks = this.taskService.getTasks();
  };

  addTask(task: Task) {
    this.taskService.addTask(task);
    this.loadTasks();
  };

  toggleComplete(task: Task) {

    task.completed = !task.completed;
    console.log(task.completed = !task.completed);
    this.taskService.updateTask(task);
    this.loadTasks();
  };

  filterTasks(filterType: 'all' | 'completed' | 'incomplete'): void {
    this.filter = filterType;
  };

  get filteredTasks(): Task[] {
    if (this.filter === 'completed') {
      return this.tasks.filter(task => task.completed);
    } else if (this.filter === 'incomplete') {
      return this.tasks.filter(task => !task.completed);
    }
    return this.tasks;
  };

  clearCompleted(): void {
    this.tasks = this.tasks.filter(task => !task.completed);
    this.taskService.saveTasks(this.tasks);
    this.loadTasks();
  };

  startEditTask(task: Task): void {
    this.editingTaskId = task.id;
  };

  cancelEdit(): void {
    this.editingTaskId = null;
  };

  editTask(task: Task): void {
    this.taskService.updateTask(task);
    this.loadTasks();
    this.editingTaskId = null;
  };

  deleteTask(id: number): void {
    this.taskService.deleteTask(id);
    this.loadTasks();
  };

};
