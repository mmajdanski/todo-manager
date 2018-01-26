import { Injectable } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFirestore } from 'angularfire2/firestore';

@Injectable()
export class LoginService {

  constructor(public afAuth: AngularFireAuth, private db: AngularFirestore) { }

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
          console.log(this.showLogin)
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
    .then(function(docRef) {
      console.log("Document written with ID: ", docRef.id);
    })
    .catch(function(error) {
      console.error("Error adding document: ", error);
    });
  }
  

}
