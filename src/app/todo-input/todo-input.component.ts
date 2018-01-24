import { Component, OnInit } from '@angular/core';

import { TodoService } from "../todo.service";
import { AngularFireAuth } from 'angularfire2/auth';


@Component({
  selector: 'app-todo-input',
  templateUrl: './todo-input.component.html',
  styleUrls: ['./todo-input.component.css']
})
export class TodoInputComponent implements OnInit {

  constructor(private todoService: TodoService, public afAuth: AngularFireAuth) { 

  }

  ngOnInit() {
  }

  submitTodo(text)
  {
    let username = this.afAuth.auth.currentUser.displayName;

    this.todoService.submitTodo(text, username);
  }
}
