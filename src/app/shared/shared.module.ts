import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutDefaultComponent } from './layout/layout-default/layout-default.component';

import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [LayoutDefaultComponent],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatButtonModule,
    MatListModule,
    MatExpansionModule,
    MatSnackBarModule,
    MatCardModule,
    RouterModule
  ],
  exports: [
    LayoutDefaultComponent,
    MatButtonModule,
    MatToolbarModule,
    MatListModule,
    MatExpansionModule,
    MatSnackBarModule,
    MatCardModule
  ]
})
export class SharedModule { }
