import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { TodoHttpService } from './todo-http.service';
import { Todo } from './todo';

@Component({
  selector: 'app-todo',
  template: `
  <div class="container">
  <h3>To-Do List</h3>
  <form #f="ngForm" (ngSubmit)="add(f)" class="form-inline">
    <label>새 항목: &nbsp;
      <input type="text" name="title" [ngModel]="f.value.title"
             required pattern="\\s*\\S.*" class="form-control">
    </label>
    <button type="submit" [disabled]="f.invalid" class="btn">
      <i class="fas fa-plus fa-lg"></i>
    </button>
  </form>
  <br>
  <table class="table table-striped">
    <tr>
      <th>No</th>
      <th>Title</th>
      <th>Menu</th>
    </tr>
    <tr *ngFor="let todo of todos; index as i">
      <td>{{todo.id}}</td>
      <td [class.done]="todo.done">{{todo.title}}</td>
      <td>
        <button type="button" (click)="setDone(todo)">
          <i class="fas fa-check fa-lg"></i>
        </button>
        <button type="button" (click)="remove(todo.id, i)">
          <i class="fas fa-times fa-lg"></i>
        </button>
      </td>
    </tr>
  </table>
</div>
` ,
  styles: [`
  .done {
    text-decoration: line-through;
  }
` ]
})
export class TodoComponent implements OnInit {
  todos: Todo[];

  constructor(private todoHttpService: TodoHttpService) {}

  ngOnInit() {
    this.todoHttpService.get().subscribe(todos => this.todos = todos);
  }

  add(form: NgForm) {
    const todo = Object.assign({ done: false }, form.value);
    todo.title = todo.title.trim();
    this.todoHttpService.add(todo).subscribe(
      todo => {
        this.todos.push(todo);
        form.reset();
      }
    );
  }

  setDone(todo: Todo) {
    todo.done = !todo.done;
    this.todoHttpService.update(todo).subscribe();
  }

  remove(id: number, i: number) {
    this.todoHttpService.remove(id).subscribe(() => this.todos.splice(i, 1));
  }
}
