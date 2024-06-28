import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { TodoItem } from '../../models/todo-item.model';
import { TodoState } from '../../models/todo-state.model';
import { TodoService } from '../../services/todo.service';
import { RouterLink } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [CommonModule, RouterLink, NgFor, MatTableModule, MatButtonModule],
  templateUrl: './todo.component.html',
  styleUrl: './todo.component.scss',
})
export class TodoComponent {
  displayedColumns: string[] = [
    'title',
    'body',
    'state',
    'category',
    'edit',
    'delete',
  ];
  todos: TodoItem[] = [];
  states: TodoState[] = [];

  constructor(private todoService: TodoService) {}

  ngOnInit(): void {
    this.getTodos();
    this.getStates();
  }

  getTodos(): void {
    this.todoService.getAll().subscribe((todos) => (this.todos = todos));
  }

  getStates(): void {
    this.todoService.getStates().subscribe((states) => (this.states = states));
  }

  deleteTodo(id: number): void {
    this.todoService.delete(id).subscribe({
      error: (e) => alert(e),
      complete: () =>
        (this.todos = this.todos.filter((todoItem) => todoItem.todo.id != id)),
    });
  }

  getColorClass(color: number): string {
    return `category-color-${color}`
  }

  getStateName(stateCode: number): string {
    return this.states.find(state => state.code == stateCode)!.name
  }
}
