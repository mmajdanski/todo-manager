import { Component, OnInit } from '@angular/core';



import {Todo} from '../todo'
import { TodoService } from "../todo.service";
import { AngularFirestore } from 'angularfire2/firestore';

@Component({
  selector: 'app-todo-input',
  templateUrl: './todo-input.component.html',
  styleUrls: ['./todo-input.component.css']
})
export class TodoInputComponent implements OnInit {

  todo: Todo;


  constructor(private todoService: TodoService, private db: AngularFirestore) { 

  }

  ngOnInit() {
  }

  submitTodo(text){
    
    this.db.collection("todos").add({
      text: text,
      status: "incomplete",
      editMode: false
    })
    .then(function(docRef) {
      console.log("Document written with ID: ", docRef.id);
  })
    .catch(function(error) {
      console.error("Error adding document: ", error);
  });
  }


}
