import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoCategoryEditComponent } from './todo-category-edit.component';

describe('TodoCategoryEditComponent', () => {
  let component: TodoCategoryEditComponent;
  let fixture: ComponentFixture<TodoCategoryEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TodoCategoryEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodoCategoryEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
