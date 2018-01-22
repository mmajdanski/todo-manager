import { Component, OnInit } from '@angular/core';
import { TodoService } from "../todo.service";


//import { Todo } from "../todo";

import { AngularFirestore, AngularFirestoreCollection} from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

export interface Todo { text: string; status: string; editMode: boolean; }
export interface TodoId extends Todo { id: string; }


@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css']
})



export class TodoListComponent implements OnInit {

  private todoCollection: AngularFirestoreCollection<Todo>;
  todos: Observable<TodoId[]>;

  constructor(private todoService: TodoService, private db: AngularFirestore) 
  { 
    this.todoCollection = db.collection<Todo>('todos');
    // .snapshotChanges() returns a DocumentChangeAction[], which contains
    // a lot of information about "what happened" with each change. If you want to
    // get the data and the id use the map operator.
    this.todos = this.todoCollection.snapshotChanges().map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as Todo;
        const id = a.payload.doc.id;
        return { id, ...data };
      });
    });
  }

  ngOnInit() {

  }

  deleteTodo(documentid)
  {
    this.db.collection('todos').doc(documentid).delete();
  }

  changeTodoStatus(documentid, currentStatus){
    let newStatus: string;
    
    if(currentStatus == 'incomplete'){
      newStatus = 'complete'
    }else{
      newStatus = 'incomplete'
    }

    this.db.collection('todos').doc(documentid).update({
      status: newStatus
    })
  }

  editTodoText(documentid){
    this.db.collection('todos').doc(documentid).update({
      editMode: true
    })
  }

  cancelEditTodoText(documentid){
    this.db.collection('todos').doc(documentid).update({
      editMode: false
    })
  }

  submitEditTodoText(documentid, newtext){
    this.db.collection('todos').doc(documentid).update({
      editMode: false,
      text: newtext
    })
  }

  

}
