import { CommonModule, NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, Router } from '@angular/router';
import { TodoCategory } from '../../models/todo-category.model';
import { TodoState } from '../../models/todo-state.model';
import { TodoCategoryService } from '../../services/todo-category.service';
import { TodoService } from '../../services/todo.service';
import { Todo } from '../../models/todo.model';

@Component({
  selector: 'app-todo-edit',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgFor,
    NgIf,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    CommonModule,
  ],
  templateUrl: './todo-edit.component.html',
  styleUrl: './todo-edit.component.scss',
})
export class TodoEditComponent {
  todoForm = this.formBuilder.group({
    title: ['', Validators.required],
    body: ['', Validators.required],
    categoryId: ['', Validators.required],
    state: ['', Validators.required],
  });

  editingTodoId!: Todo['id'];

  todoCategories: TodoCategory[] = [];
  states: TodoState[] = [];

  constructor(
    private todoService: TodoService,
    private formBuilder: FormBuilder,
    private todoCategoryService: TodoCategoryService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.editingTodoId = +params['id'];
    });

    this.getTodoCategories();
    this.getStates();

    setTimeout(() => {
      this.loadEditingTodo();
    });
  }

  compareFn(c1: string, c2: string) {
    return c1 == c2
  }

  loadEditingTodo(): void {
    this.todoService.getById(this.editingTodoId).subscribe((todo) => {
      this.todoForm.patchValue({
        title: todo.title,
        body: todo.body,
        categoryId: '1',
        state: '1',
      });
    });
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
    this.todoService.edit(this.editingTodoId, this.todoForm).subscribe({
      error: (e) => alert(e),
      complete: () => this.router.navigate(['/todos']),
    });
  }
}
