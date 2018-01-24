import { Component, OnInit } from '@angular/core';
import { AngularFireAuth, AngularFireAuthModule } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { firestore } from 'firebase/app';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(public afAuth: AngularFireAuth) { }

  ngOnInit() {
    
  }

  loginAnon(displayName) {
    this.afAuth.auth.signInAnonymously().then(loggedInSession => {
    // console.log(loggedInSession);
    
    

      this.afAuth.auth.currentUser.updateProfile({
        displayName: displayName,
        photoURL: "" //photoURL required
      }).then(function() {
        // Update successful.
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

}
