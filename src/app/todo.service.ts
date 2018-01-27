import { Injectable } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { LoginService } from './login.service';

export interface Todo { text: string; username: string; status: string; editMode: boolean; }
export interface TodoId extends Todo { id: string; }

@Injectable()
export class TodoService {

  constructor(private db: AngularFirestore, private loginService: LoginService) { }

  private todoCollection: AngularFirestoreCollection<Todo>;
  todos: Observable<TodoId[]>;

  getTodos(){
    let userDocId = this.loginService.getUserDocId();

    this.todoCollection = this.db.collection<Todo>(`users/${userDocId}/todos`);
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

  submitTodo(text, username): void{

    let userDocId = this.loginService.getUserDocId();

    this.db.collection(`users/${userDocId}/todos`).add({
      text: text,
      username: username,
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
    let userDocId: string = this.loginService.getUserDocId();

    let newStatus: string;
    
    if(currentStatus == 'incomplete'){
      newStatus = 'complete'
    }else{
      newStatus = 'incomplete'
    }

    this.db.collection(`users/${userDocId}/todos`).doc(documentid).update({
      status: newStatus
    })
  }

  deleteTodo(documentid)
  {
    let userDocId: string = this.loginService.getUserDocId();

    this.db.collection(`users/${userDocId}/todos`).doc(documentid).delete();
  }

  editTodoText(documentid){
    let userDocId: string = this.loginService.getUserDocId();

    this.db.collection(`users/${userDocId}/todos`).doc(documentid).update({
      editMode: true
    })
  }

  cancelEditTodoText(documentid){
    let userDocId: string = this.loginService.getUserDocId();

    this.db.collection(`users/${userDocId}/todos`).doc(documentid).update({
      editMode: false
    })
  }

  submitEditTodoText(documentid, newtext){
    let userDocId: string = this.loginService.getUserDocId();

    this.db.collection(`users/${userDocId}/todos`).doc(documentid).update({
      editMode: false,
      text: newtext
    })
  }

}
