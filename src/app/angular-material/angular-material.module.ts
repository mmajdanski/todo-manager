import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//Example
import {MatButtonModule, MatCheckboxModule} from '@angular/material';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatListModule} from '@angular/material/list';
import {MatCardModule} from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';



@NgModule({
  imports: [MatButtonModule, MatCheckboxModule, MatToolbarModule, MatIconModule, 
    MatListModule, MatCardModule, MatDividerModule, MatDialogModule, MatFormFieldModule, MatInputModule],
  exports: [MatButtonModule, MatCheckboxModule, MatToolbarModule, MatIconModule,
     MatListModule, MatCardModule, MatDividerModule, MatDialogModule, MatFormFieldModule, MatInputModule],
})
export class AngularMaterialModule { }
