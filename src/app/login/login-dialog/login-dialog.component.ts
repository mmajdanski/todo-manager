import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../login.service';
import { MatDialog, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-login-dialog',
  templateUrl: './login-dialog.component.html',
  styleUrls: ['./login-dialog.component.css']
})
export class LoginDialogComponent implements OnInit {

  constructor(public loginService: LoginService, public dialogRef: MatDialogRef<LoginDialogComponent>) { }

  ngOnInit() {
  }

  loginAnon(displayName) {
    this.loginService.loginAnon(displayName);
  }

  closeDialog(){
    this.dialogRef.close();
  }

}
