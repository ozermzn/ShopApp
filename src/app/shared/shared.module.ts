import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthenticationModule } from '../authentication/authentication.module';
import { CategoriesModule } from '../category/categories.module';

import { HomeComponent } from './home/home.component';
import { NavbarComponent } from './navbar/navbar.component';

@NgModule({
  declarations: [NavbarComponent, HomeComponent],
  imports: [
    CommonModule,
    AuthenticationModule,
    FormsModule,
    CategoriesModule,
    RouterModule,
  ],
  exports: [NavbarComponent, HomeComponent],
})
export class SharedModule {}
