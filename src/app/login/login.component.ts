import { Component, OnInit } from '@angular/core';
import { AngularFireAuth, AngularFireAuthModule } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { firestore } from 'firebase/app';
import { AngularFirestore } from 'angularfire2/firestore';
import { LoginService } from '../login.service';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  displayName: string;

  constructor(public afAuth: AngularFireAuth, private loginService: LoginService, public route: ActivatedRoute) { }

  ngOnInit() {
    this.afAuth.auth.onAuthStateChanged((user) => {
      if (user) {
        
        // User is signed in.
        this.displayName = user.displayName;
        // ...
      } else {
        // User is signed out.
        // ...
      }
    });
    


    /*this.route.data.subscribe((data) => {
      console.log(data);
      this.displayName = data.displayName;
      this.setLoginServiceDisplayName(data.displayName);
    });*/
  }

  loginAnon(displayName) {
    this.loginService.loginAnon(displayName);
  }

  logout() {
    this.loginService.logout(); 
  }

  setLoginServiceDisplayName(displayName){
    this.loginService.setLoginServiceDisplayName(displayName);
  }

  

}
