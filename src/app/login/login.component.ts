import { Component, OnInit } from '@angular/core';
import { AngularFireAuth, AngularFireAuthModule } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { firestore } from 'firebase/app';
import { AngularFirestore } from 'angularfire2/firestore';
import { LoginService } from '../login.service';
import { ActivatedRoute } from '@angular/router';
import { LoginDialogComponent } from './login-dialog/login-dialog.component';
import { MatDialog } from '@angular/material';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {


  user: Object;

  constructor(public afAuth: AngularFireAuth, private loginService: LoginService, public route: ActivatedRoute, public dialog: MatDialog) {
    
   }

  ngOnInit() {
    this.user = this.loginService.user;

  }


  logout() {
    this.loginService.logout(); 
  }  

  openDialog(): void {
    let dialogRef = this.dialog.open(LoginDialogComponent, {
      width: '300px',
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });

  }

}
