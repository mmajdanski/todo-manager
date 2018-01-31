import { Injectable } from '@angular/core';
import { CanActivate }    from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { LoginService } from './login.service';
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable()
export class AuthGuardService implements CanActivate {

  isLoggedIn: boolean;

  constructor(public afAuth: AngularFireAuth ) { }

  canActivate(): Observable<boolean>|Promise<boolean>|boolean {
    //This is where we need authentication to happen

    this.afAuth.authState.subscribe(v => {
      if(v){
        this.isLoggedIn = true;
      }else{
        this.isLoggedIn = false;
      }
    });

    return this.isLoggedIn;
  }


  

}
