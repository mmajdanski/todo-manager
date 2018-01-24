import { Component, OnInit } from '@angular/core';

import {TodoInputComponent} from '../todo-input/todo-input.component';
import {TodoListComponent} from '../todo-list/todo-list.component';
import {TodoStatusComponent} from '../todo-status/todo-status.component';
import { AngularFireAuth } from 'angularfire2/auth';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.css']
})
export class TodoComponent implements OnInit {

  constructor(public afAuth: AngularFireAuth) { }

  ngOnInit() {
  }

}
