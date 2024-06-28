import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { environment } from '../env/env';
import { TodoCategory } from '../models/todo-category.model';
import { TodoCategoryColor } from '../models/todo-category-color.model';

@Injectable({
  providedIn: 'root',
})
export class TodoCategoryService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getAll(): Observable<TodoCategory[]> {
    return this.http.get<TodoCategory[]>(`${this.apiUrl}/api/todoCategories`);
  }

  getById(id: number): Observable<TodoCategory> {
    return this.http.get<TodoCategory>(`${this.apiUrl}/api/todoCategory/${id}`);
  }

  getColors(): Observable<TodoCategoryColor[]> {
    return this.http.get<TodoCategoryColor[]>(
      `${this.apiUrl}/api/todoCategory/colors`
    );
  }

  create(todoCategoryForm: FormGroup): Observable<TodoCategory['id']> {
    return this.http.post<TodoCategory['id']>(
      `${this.apiUrl}/api/todoCategories`,
      todoCategoryForm.value
    );
  }

  edit(
    id: number,
    todoCategoryForm: FormGroup
  ): Observable<TodoCategory['id']> {
    return this.http.put<TodoCategory['id']>(
      `${this.apiUrl}/api/todoCategories/${id}`,
      todoCategoryForm.value
    );
  }

  delete(id: number): Observable<TodoCategory['id']> {
    return this.http.delete<TodoCategory['id']>(
      `${this.apiUrl}/api/todoCategories/${id}`
    );
  }
}
