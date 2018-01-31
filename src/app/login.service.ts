import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { ActivatedRoute } from '@angular/router';

@Injectable()
export class LoginService {

  userObservable$: Observable<any>;

  displayName: string;

  constructor(public afAuth: AngularFireAuth, private db: AngularFirestore) { }

   setLoginServiceDisplayName(displayName){
     this.displayName = displayName;
     this.userObservable$ = this.getUserDocId(displayName);
   }

  loginAnon(displayName) {
    this.afAuth.auth.signInAnonymously().then(loggedInSession => {
    // console.log(loggedInSession);

      this.afAuth.auth.currentUser.updateProfile({
        displayName: displayName,
        photoURL: "" //photoURL required
      }).then( () => {
        // Update successful.
        this.addUserColl(); //Add the user to the DB
        
      }).catch(function(error) {
        // An error happened.
      });
    })
    .catch(err => console.log(err));
  }

  logout() {
    let user =  this.afAuth.auth.currentUser;
    
    if(user.isAnonymous){
        user.delete().then(function() {
          // User deleted. Redirect to login page...
        }).catch(function(error) {
          // An error happened.
        });
    }else{
        //perform logout
        this.afAuth.auth.signOut().then(() => console.log("logged out"))
    }    
    //this.afAuth.auth.signOut().then(() => console.log("logged out"))
  }

  addUserColl(): void{
    this.db.collection("users").add({
      displayName: this.afAuth.auth.currentUser.displayName
    })
    .then((docRef) => {
      console.log("Document written with ID: ", docRef.id);
    })
    .catch(function(error) {
      console.error("Error adding document: ", error);
    });
  }

  getUserDocId(displayName): Observable<any>{

    return this.db.collection('users', ref => ref.where('displayName', '==', displayName))
    .snapshotChanges().map(actions => {
      return actions.map(a => {
        const id = a.payload.doc.id;
        return { id};
      });
    });
  }

  

}
