import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { ResultList } from './todo-list/ResultList';
import { Todo } from './todo-list/todo';


@Injectable({
  providedIn: 'root'
})
export class TodoService {

  constructor(private http: HttpClient) { }

  list() {
    return this.http.get('./api/items')
    .pipe(map(response => {
      return new ResultList(response);
    }));
  }

  get(id: string) {
    return this.http.get<Todo>('./api/items/' + id)
      .pipe(map(response => new Todo(response)));
  }

  save(todo: Todo) {
    return this.http.post('./api/items', todo);
  }

  delete() {

  }
}
