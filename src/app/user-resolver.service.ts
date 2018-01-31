import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import { Injectable }             from '@angular/core';
import { Observable }             from 'rxjs/Observable';
import { Router, Resolve, RouterStateSnapshot,
  ActivatedRouteSnapshot } from '@angular/router';


@Injectable()
export class UserResolverService implements Resolve<string> {

  user: string;

  constructor(private router: Router) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any>|Promise<any>|any {
    for (let i = 0; i < localStorage.length; i++){
      if (localStorage.key(i).substring(0,17) == 'firebase:authUser') {
        this.user = JSON.parse(localStorage.getItem(localStorage.key(i)));
      }
    }
    return this.user['displayName'];
  }
}