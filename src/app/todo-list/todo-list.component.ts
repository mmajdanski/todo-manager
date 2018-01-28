import { Component, OnInit } from '@angular/core';
import { TodoService } from "../todo.service";

import { Observable } from 'rxjs/Observable';
import { LoginService } from '../login.service';

export interface Todo { text: string; status: string; editMode: boolean; }
export interface TodoId extends Todo { id: string; }


@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})


export class TodoListComponent implements OnInit {

  todos: Observable<TodoId[]>;
  userDocId: string;

  constructor(private todoService: TodoService, private loginService: LoginService) { }

  ngOnInit() 
  {

    this.loginService.userObservable$.subscribe(values => {
      values.map( userDoc => {
        this.userDocId = userDoc.id
        this.todos = this.todoService.getTodos(this.userDocId);
      })
    });

  }

  deleteTodo(documentid)
  {
    this.todoService.deleteTodo(documentid);
  }

  changeTodoStatus(documentid, currentStatus)
  {
    this.todoService.changeTodoStatus(documentid, currentStatus);
  }

  editTodoText(documentid)
  {
    this.todoService.editTodoText(documentid);
  }

  cancelEditTodoText(documentid)
  {
    this.todoService.cancelEditTodoText(documentid);
  }

  submitEditTodoText(documentid, newtext)
  {
    this.todoService.submitEditTodoText(documentid, newtext);
  }

  

}
