import { Injectable } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

export interface Todo { text: string; status: string; editMode: boolean; }
export interface TodoId extends Todo { id: string; }

@Injectable()
export class TodoService {

  constructor(private db: AngularFirestore) { }

  private todoCollection: AngularFirestoreCollection<Todo>;
  todos: Observable<TodoId[]>;

  getTodos(){
    this.todoCollection = this.db.collection<Todo>('todos');
    // .snapshotChanges() returns a DocumentChangeAction[], which contains
    // a lot of information about "what happened" with each change. If you want to
    // get the data and the id use the map operator.
    return this.todoCollection.snapshotChanges().map(actions => {
      return actions.map(a => {
        const data = a.payload.doc.data() as Todo;
        const id = a.payload.doc.id;
        return { id, ...data };
      });
    });
    
  }

  submitTodo(text): void{

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

  deleteTodo(documentid)
  {
    this.db.collection('todos').doc(documentid).delete();
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
