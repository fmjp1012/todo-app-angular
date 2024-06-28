import { TodoState } from "./todo-state.model";

export interface Todo {
    id?: number;
    title: string;
    body: string;
    categoryId: number;
    state: TodoState['code'];
}