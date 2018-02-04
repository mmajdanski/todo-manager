import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule }   from '@angular/forms';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { RouterModule, Routes } from '@angular/router';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';




import { AppComponent } from './app.component';
import { TodoInputComponent } from './todo-input/todo-input.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { TodoStatusComponent } from './todo-status/todo-status.component';

import {TodoService} from './todo.service';
import { environment } from '../environments/environment';
import { LoginComponent } from './login/login.component';
import { TodoComponent } from './todo/todo.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginService } from './login.service';
import { AngularMaterialModule } from './angular-material/angular-material.module';
import { AuthGuardService } from './auth-guard.service';

const appRoutes: Routes = [
  {
    path: 'todos',
    component: TodoComponent,
    canActivate: [AuthGuardService]
  },
  { path: '',
    component: LoginComponent,
    pathMatch: 'full'
  }
];



@NgModule({
  declarations: [
    AppComponent,
    TodoInputComponent,
    TodoListComponent,
    TodoStatusComponent,
    LoginComponent,
    TodoComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    FormsModule,
    RouterModule.forRoot(
      appRoutes,
     // { enableTracing: true } // <-- debugging purposes only
    )
  ],
  providers: [TodoService, LoginService, AuthGuardService],
  bootstrap: [AppComponent]
})
export class AppModule { }
