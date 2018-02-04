import 'rxjs/add/operator/do';
import 'rxjs/add/operator/take';

import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { LoginService } from './login.service';
import { AngularFireAuth } from 'angularfire2/auth';

@Injectable()
export class AuthGuardService implements CanActivate {

  isLoggedIn: boolean;
  User: Object;
  auth$: Observable<any>;

  constructor(public afAuth: AngularFireAuth, private loginService: LoginService, private router: Router ) { }

  canActivate(): Observable<boolean>|Promise<boolean>|boolean {

      this.auth$ = this.afAuth.authState.map(user =>  !!user);


      return this.auth$
      .take(1)
      .do(authenticated => {
        if (!authenticated) {
          this.router.navigate(['/']);
        }
      });



    }

    
  

}
