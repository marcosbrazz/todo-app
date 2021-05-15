import { Component, OnInit } from '@angular/core';
import { TodoService } from '../todo.service';
import { Todo } from './todo';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})
export class TodoListComponent implements OnInit {

  todoList: Array<Todo> = [];
  doneList: Array<Todo> = [];
  itemToAdd: string = '';

  constructor(private todoService: TodoService) { }

  ngOnInit() {
    this.todoService.list().subscribe(resultList => {
      this.todoList = resultList.list.filter(todo => !todo.done);
      this.doneList = resultList.list.filter(todo => todo.done);
    });
  }

  addToList() {
    let todo = new Todo({description: this.itemToAdd, done: false});
    this.todoService.save(todo).subscribe(
      (res: any) => {
        console.log('NOVO TODO: ' + JSON.stringify(res));
        todo = new Todo(res);
        this.todoList.push(todo);
      },
      (err) => console.error('ERRO: ' + JSON.stringify(err))
    );
  }

  doItem(index: number) {
    let todo = this.todoList[index];
    todo.done = true;
    this.todoService.save(todo).subscribe(
      (res: any) => {
        console.log('DONE: ' + JSON.stringify(res));
        todo = new Todo(res);
        this.todoList.splice(index, 1);
        this.doneList.push(todo);
      },
      (err) => console.error('ERRO: ' + JSON.stringify(err))
    );
  }

  undoItem(index: number) {
    let todo = this.doneList[index];
    todo.done = false;
    this.todoService.save(todo).subscribe(
      (res: any) => {
        console.log('UNDONE: ' + JSON.stringify(res));
        todo = new Todo(res);
        this.doneList.splice(index, 1);
        this.todoList.push(todo);
      },
      (err) => console.error('ERRO: ' + JSON.stringify(err))
    );
  }

}