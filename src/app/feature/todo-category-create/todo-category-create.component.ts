import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Router } from '@angular/router';
import { TodoCategoryColor } from '../../models/todo-category-color.model';
import { TodoCategoryService } from '../../services/todo-category.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-category-create',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    NgFor,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
  ],
  templateUrl: './todo-category-create.component.html',
  styleUrl: './todo-category-create.component.scss',
})
export class CategoryCreateComponent {
  todoCategoryForm = this.formBuilder.group({
    name: ['', Validators.required],
    slug: ['', Validators.required],
    color: ['', Validators.required],
  });

  colors: TodoCategoryColor[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private todoCategoryService: TodoCategoryService,
    private router: Router
  ) {}

  getColors(): void {
    this.todoCategoryService
      .getColors()
      .subscribe((colors) => (this.colors = colors));
  }

  ngOnInit(): void {
    this.getColors();
  }

  onSubmit(): void {
    this.todoCategoryService.create(this.todoCategoryForm).subscribe({
      error: (e: HttpErrorResponse) => alert(e.error),
      complete: () => this.router.navigate(['/todoCategories']),
    });
  }
}
