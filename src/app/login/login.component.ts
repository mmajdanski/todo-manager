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


  user: Object;

  constructor(public afAuth: AngularFireAuth, private loginService: LoginService, public route: ActivatedRoute) {
    
   }

  ngOnInit() {
    this.loginService.getUserState().subscribe((user) => {
      this.user = user;
    });

  }

  loginAnon(displayName) {
    this.loginService.loginAnon(displayName);
  }

  logout() {
    this.loginService.logout(); 
  }  

}
