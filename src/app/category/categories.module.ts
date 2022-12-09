import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Routes, RouterModule } from '@angular/router';
import { AdminGuard } from '../authentication/admin-guards';
import { AuthenticationModule } from '../authentication/authentication.module';
import { CreateComponent } from '../create/create.component';
import { CategoriesComponent } from './categories/categories.component';
import { CreateCategoryComponent } from './create-category/create-category.component';
import { MiniCategoryComponent } from './mini-category/mini-category.component';

const routes: Routes = [
  {
    path: 'categories',
    component: CategoriesComponent,
  },
  {
    path: 'create/create-categories',
    component: CreateCategoryComponent,
    canActivate: [AdminGuard],
  },
  { path: 'create', component: CreateComponent },
];

@NgModule({
  declarations: [
    CategoriesComponent,
    MiniCategoryComponent,
    CreateCategoryComponent,
  ],
  imports: [
    FormsModule,
    CommonModule,
    AuthenticationModule,
    RouterModule,
    RouterModule.forChild(routes),
  ],
  exports: [
    CategoriesComponent,
    MiniCategoryComponent,
    CreateCategoryComponent,
  ],
})
export class CategoriesModule {}
