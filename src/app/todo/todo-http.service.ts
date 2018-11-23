import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Todo } from './todo';

const URL = 'http://localhost:3000/data/';

const HTTP_OPTIONS = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({ providedIn: 'root' })
export class TodoHttpService {

  constructor(private http: HttpClient) {}

  get(): Observable<Todo[]> {
    return this.http.get<Todo[]>(URL);
  }

  add(todo: Todo): Observable<Todo> {
    return this.http.post<Todo>(URL, todo, HTTP_OPTIONS).pipe(
      catchError(this.handleError<any>('add'))
    );
  }

  update(todo: Todo): Observable<any> {
    return this.http.patch<Todo>(URL + todo.id, todo, HTTP_OPTIONS).pipe(
      catchError(this.handleError<any>('update'))
    );
  }

  remove(id: number): Observable<any> {
    return this.http.delete(URL + id).pipe(
      catchError(this.handleError<any>('delete'))
    );
  }

  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}