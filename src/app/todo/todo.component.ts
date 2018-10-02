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
      <i class="fas fa-plus-square fa-lg"></i>
    </button>
  </form>
  <br>
  <table class="table table-striped">
    <tr>
      <th>No</th>
      <th>Title</th>
      <th>Menu</th>
    </tr>
    <tr *ngFor="let todo of todos">
      <td>{{todo.id}}</td>
      <td class="{{todo.done? 'done': ''}}">{{todo.title}}</td>
      <td>
        <button type="button" (click)="setDone(todo)">
          <i class="fas fa-check-square fa-lg"></i>
        </button>
        <button type="button" (click)="remove(todo.id)">
          <i class="fas fa-minus-square fa-lg"></i>
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

  constructor(private todoHttpService: TodoHttpService) { }

  ngOnInit() {
    this.todoHttpService.get().subscribe(todos => this.todos = todos);
  }

  add(form: NgForm) {
    const todo = Object.assign({ done: false }, form.value);
    todo.title = todo.title.trim();
    this.todoHttpService.add(todo).subscribe(
      id => {
        todo.id = id;
        this.todos.push(todo);
        form.reset();
      }
    );
  }
  
  setDone(todo: Todo) {
    todo.done = !todo.done;
    this.todoHttpService.update(todo);
  }

  remove(id: number) {
    this.todoHttpService.remove(id).subscribe(
      () => {
        const index = this.todos.findIndex(todo => todo.id === id);
        this.todos.splice(index, 1);
      }
    );
  }
}
