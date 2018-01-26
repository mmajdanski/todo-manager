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

  constructor(public afAuth: AngularFireAuth, private loginService: LoginService) { }

  ngOnInit() {
    
  }

  loginAnon(displayName) {
    this.loginService.loginAnon(displayName);
  }

  logout() {
    this.loginService.logout(); 
  }

  

}
