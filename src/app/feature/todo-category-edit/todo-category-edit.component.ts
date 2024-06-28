import { NgFor, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, Router } from '@angular/router';
import { TodoCategoryColor } from '../../models/todo-category-color.model';
import { TodoCategory } from '../../models/todo-category.model';
import { TodoCategoryService } from '../../services/todo-category.service';
import { TodoService } from '../../services/todo.service';

@Component({
  selector: 'app-todo-category-edit',
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
  templateUrl: './todo-category-edit.component.html',
  styleUrl: './todo-category-edit.component.scss',
})
export class TodoCategoryEditComponent {
  todoCategoryForm = this.formBuilder.group({
    name: ['', Validators.required],
    slug: ['', Validators.required],
    color: ['', Validators.required],
  });

  editingTodoCategoryId!: TodoCategory['id'];
  todoCategories: TodoCategory[] = [];

  colors: TodoCategoryColor[] = [];

  constructor(
    private todoService: TodoService,
    private formBuilder: FormBuilder,
    private todoCategoryService: TodoCategoryService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.editingTodoCategoryId = +params['id'];
    });

    this.loadEditingTodoCategory();
    
    this.getColors();
  }

  getColors(): void {
    this.todoCategoryService
      .getColors()
      .subscribe((colors) => (this.colors = colors));
  }

  loadEditingTodoCategory(): void {
    this.todoCategoryService
      .getById(this.editingTodoCategoryId)
      .subscribe((todoCategory) => {
        this.todoCategoryForm.patchValue({
          name: todoCategory.name,
          slug: todoCategory.slug,
          color: todoCategory.color.toString(),
        });
      });
  }

  onSubmit(): void {
    this.todoCategoryService
      .edit(this.editingTodoCategoryId, this.todoCategoryForm)
      .subscribe({
        error: (e) => console.log(e),
        complete: () => this.router.navigate(['/todoCategories']),
      });
  }
}
