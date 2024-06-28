import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { TodoCategoryService } from '../../services/todo-category.service';
import { TodoCategory } from '../../models/todo-category.model';
import { RouterLink } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [NgFor, RouterLink, MatTableModule, MatButtonModule],
  templateUrl: './todo-category.component.html',
  styleUrl: './todo-category.component.scss',
})
export class CategoryComponent {
  displayedColumns: string[] = ['id', 'slug', 'name', 'edit', 'delete'];
  todoCategories: TodoCategory[] = [];

  constructor(private todoCategoryService: TodoCategoryService) {}

  getTodoCategories(): void {
    this.todoCategoryService
      .getAll()
      .subscribe((todoCategories) => (this.todoCategories = todoCategories));
  }

  deleteTodoCategory(id: number): void {
    this.todoCategoryService.delete(id).subscribe({
      error: (e) => console.log(e),
      complete: () => (this.todoCategories = this.todoCategories.filter(todoCategory => todoCategory.id != id))
    });
  }

  ngOnInit(): void {
    this.getTodoCategories();
  }
}
