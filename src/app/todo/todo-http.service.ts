import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Todo } from './todo';

const URL = 'http://localhost:3000/data';

const HTTP_OPTIONS = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({ providedIn: 'root' })
export class TodoHttpService {
  constructor(private http: HttpClient) {}

  get(): Observable<Todo[]> {
    return this.http.get<Todo[]>(URL);
  }

  add(todo: Todo): Observable<number> {
    return this.http.post<Todo>(URL, todo, HTTP_OPTIONS).pipe(
      map(todo => todo.id)
    );
  }

  update(todo: Todo): Observable<any> {
    return this.http.put<Todo>(URL + '/' + todo.id, todo, HTTP_OPTIONS);
  }

  remove(id: number): Observable<any> {
    return this.http.delete(URL + '/' + id);
  }
}
