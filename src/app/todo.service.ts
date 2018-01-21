import { Injectable } from '@angular/core';

import {Todo} from './todo'

@Injectable()
export class TodoService {

  todos: Todo[] = [];
  todoid: number = 0;

  constructor() { }

  getTodos(): Todo[]{
    return this.todos;
    
  }

  newTodo(text): void{
    this.todos.push(new Todo(this.todoid, text));
    this.todoid += 1;
  }

  printTodos(): void{
    console.log(this.todos)
  }

  findTodoIndex(id : number) : number{
    return this.todos.findIndex( (todo) => todo.id == id);
  }

  deleteTodo(id : number){
    this.todos.splice(this.findTodoIndex(id), 1);
  }

  changeTodoStatus(id : number){

    if (this.todos[this.findTodoIndex(id)].status == 'incomplete'){
      this.todos[this.findTodoIndex(id)].status = 'complete';
    }else{
      this.todos[this.findTodoIndex(id)].status = 'incomplete';
    }

  }

  editTodoText(id){
    //TODO: Make a func that allows for editing
    
    this.todos[this.findTodoIndex(id)].editMode = !this.todos[this.findTodoIndex(id)].editMode;


    console.log("Make the TODO Editable")
  }




}
