import { Component, OnInit } from '@angular/core';



import {Todo} from '../todo'
import { TodoService } from "../todo.service";


@Component({
  selector: 'app-todo-input',
  templateUrl: './todo-input.component.html',
  styleUrls: ['./todo-input.component.css']
})
export class TodoInputComponent implements OnInit {

  todo: Todo;


  constructor(private todoService: TodoService) { 

  }

  ngOnInit() {
  }

  submitTodo(text)
  {
    this.todoService.submitTodo(text);
  }
}
