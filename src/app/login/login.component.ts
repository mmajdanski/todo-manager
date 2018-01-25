import { Component, OnInit } from '@angular/core';
import { AngularFireAuth, AngularFireAuthModule } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { firestore } from 'firebase/app';
import { AngularFirestore } from 'angularfire2/firestore';
import { LoginService } from '../login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public afAuth: AngularFireAuth, private db: AngularFirestore, private loginService: LoginService) { }

  ngOnInit() {
    
  }

  //TODO:
  //Migrate all of this Service code to login.service.ts
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
  //TODO:
  //This function will utilize AngularFirestore and AngularFireAuth
  //Function should probably exist in Todo.Service => Then do a call to Login.Service to get the currentUser.displayName
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
