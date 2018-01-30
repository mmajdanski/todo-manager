import { Injectable } from '@angular/core';
import { CanActivate }    from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { LoginService } from './login.service';

@Injectable()
export class AuthGuardService implements CanActivate {

  constructor(private loginService: LoginService ) { }

  canActivate(): Observable<boolean>|Promise<boolean>|boolean {
    //This is where we need authentication to happen
   return this.loginService.isLoggedIn();
  }

}
