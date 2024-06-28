import { Routes } from '@angular/router';
import { TodoComponent } from './feature/todo/todo.component';
import { TodoCreateComponent } from './feature/todo-create/todo-create.component';
import { CategoryComponent } from './feature/todo-category/todo-category.component';
import { CategoryCreateComponent } from './feature/todo-category-create/todo-category-create.component';
import { TodoEditComponent } from './feature/todo-edit/todo-edit.component';
import { TodoCategoryEditComponent } from './feature/todo-category-edit/todo-category-edit.component';

export const routes: Routes = [
    { path: 'todos', component: TodoComponent },
    { path: 'todos/create', component: TodoCreateComponent },
    { path: 'todoCategories', component: CategoryComponent },
    { path: 'todoCategories/create', component: CategoryCreateComponent },
    { path: 'todos/edit/:id', component: TodoEditComponent },
    { path: 'todoCategories/edit/:id', component: TodoCategoryEditComponent },

];
