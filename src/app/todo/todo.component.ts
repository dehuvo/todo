import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { TodoHttpService } from './todo-http.service';
import { Todo } from './todo';

@Component({
  selector: 'app-todo',
  template: `
  <div class="container">
  <h3>To-Do List</h3>
  <form #f="ngForm" (ngSubmit)="add(f)">
    <label>새 항목: &nbsp;
      <input type="text" name="title" [ngModel]="f.value.title" required>
    </label>
    <button type="submit" [disabled]="f.invalid">추가</button>
  </form>
  <br>
  <table class="table table-striped">
    <thead>
      <tr>
        <th>No</th>
        <th>Title</th>
        <th>Menu</th>
      </tr>
    </thead>
    <tbody>
      <tr *ngFor="let todo of todos">
        <td>{{todo.id}}</td>
        <td class="{{todo.done? 'done': ''}}">{{todo.title}}</td>
        <td>
          <button type="button" (click)="setDone($event)">완료</button>
          <button type="button" (click)="remove($event)">삭제</button>
        </td>
      </tr>
    </tbody>
  </table>
</div>
`,
  styles: [`
  .done {
    text-decoration: line-through;
  }
`]
})
export class TodoComponent implements OnInit {
  todos: Todo[];
  errorMessage: string;

  constructor(private todoHttpService: TodoHttpService) { }

  ngOnInit() {
    this.get();
  }

  add(form: NgForm) {
    if (form.valid) {
      const todo = Object.assign({ done: false }, form.value);
      this.todoHttpService.add(todo).subscribe(
        id => {
          todo.id = id;
          this.todos.push(todo);
          form.reset();
        },
        error => this.errorMessage = error
      );
    }
  }

  get() {
    this.todoHttpService.get().subscribe(
      todos => this.todos = todos,
      error => this.errorMessage = error
    );
  }

  getId(event: any) {
    return parseInt(event.target.parentNode.parentNode.cells[0].textContent);
  }
  
  setDone(event: any) {
    const id = this.getId(event);
    const todo = this.todos.find(o => o.id === id);
    todo.done = !todo.done;
    this.todoHttpService.update(todo).subscribe(
      () => {
        const classList = event.target.parentNode.parentNode.cells[1].classList;
        if (todo.done) {
          classList.add('done');
        } else {
          classList.remove('done');
        }
      },
      error => this.errorMessage = error
    );
  }

  remove(event: any) {
    const id = this.getId(event);
    this.todoHttpService.remove(id).subscribe(
      () => {
        const index = this.todos.findIndex(data => data.id === id);
        this.todos.splice(index, 1);
      },
      error => this.errorMessage = error
    );
    return false;
  }
}
