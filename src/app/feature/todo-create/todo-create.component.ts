import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  NgModel,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { TodoCategory } from '../../models/todo-category.model';
import { TodoState } from '../../models/todo-state.model';
import { TodoCategoryService } from '../../services/todo-category.service';
import { TodoService } from '../../services/todo.service';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-todo-create',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgFor,
    NgIf,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
  ],
  templateUrl: './todo-create.component.html',
  styleUrl: './todo-create.component.scss',
})
export class TodoCreateComponent {
  todoForm = this.formBuilder.group({
    title: ['', Validators.required],
    body: ['', Validators.required],
    categoryId: ['', Validators.required],
    // 初期stateは固定
    state: [{ value: '0', disabled: true }, Validators.required],
  });

  todoCategories: TodoCategory[] = [];
  states: TodoState[] = [];

  constructor(
    private todoService: TodoService,
    private formBuilder: FormBuilder,
    private todoCategoryService: TodoCategoryService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getTodoCategories();
    this.getStates();
  }

  getTodoCategories(): void {
    this.todoCategoryService
      .getAll()
      .subscribe((todoCategories) => (this.todoCategories = todoCategories));
  }

  getStates(): void {
    this.todoService.getStates().subscribe((states) => (this.states = states));
  }

  onSubmit(): void {
    this.todoService.create(this.todoForm).subscribe({
      error: (e: HttpErrorResponse) => {
        console.log(e.error);
        alert(e.error);
      },
      complete: () => this.router.navigate(['/todos']),
    });
  }
}
