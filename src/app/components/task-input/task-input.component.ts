import { Component, EventEmitter, Output } from '@angular/core';
import { Task } from '../../models/task.model';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-task-input',
  standalone: true,
  imports: [
    FormsModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatCardModule,
    MatCheckboxModule],
  templateUrl: './task-input.component.html',
  styleUrl: './task-input.component.css'
})
export class TaskInputComponent {
  title = '';
  description = '';
  dueDate: string = '';

  @Output() taskAdded = new EventEmitter<Task>();

  addTask() {
    if (!this.title || !this.dueDate) {
      return;
    }
    const newTask: Task = {
      id: Date.now(),
      title: this.title,
      description: this.description,
      dueDate: new Date(this.dueDate),
      completed: false
    };
    this.taskAdded.emit(newTask);
    this.clearForm();
  }

  clearForm() {
    this.title = '';
    this.description = '';
    this.dueDate = '';
  }
}
