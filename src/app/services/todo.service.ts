import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TodoState } from '../models/todo-state.model';
import { TodoItem } from '../models/todo-item.model';
import { environment } from '../env/env';
import { FormGroup } from '@angular/forms';
import { Todo } from '../models/todo.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TodoService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getAll(): Observable<TodoItem[]> {
    return this.http.get<TodoItem[]>(`${this.apiUrl}/api/todos`);
  }

  getById(id: Todo['id']): Observable<Todo> {
    return this.http.get<Todo>(`${this.apiUrl}/api/todo/${id}`);
  }

  getStates(): Observable<TodoState[]> {
    return this.http.get<TodoState[]>(`${this.apiUrl}/api/todo/states`);
  }

  create(todoForm: FormGroup): Observable<Todo['id']> {
    return this.http.post<Todo['id']>(
      `${this.apiUrl}/api/todos`,
      todoForm.getRawValue()
    );
  }

  edit(id: Todo['id'], todoForm: FormGroup) {
    return this.http.put<Todo['id']>(
      `${this.apiUrl}/api/todos/${id}`,
      todoForm.value
    );
  }

  delete(id: Todo['id']) {
    return this.http.delete<Todo['id']>(`${this.apiUrl}/api/todos/${id}`);
  }
}
