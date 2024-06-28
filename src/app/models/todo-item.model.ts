import { TodoCategory } from "./todo-category.model"
import { Todo } from "./todo.model"

export interface TodoItem {
    todo: Todo,
    todoCategory: TodoCategory
}