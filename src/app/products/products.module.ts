import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from '../authentication/admin-guards';
import { AuthenticationModule } from '../authentication/authentication.module';
import { CategoriesModule } from '../category/categories.module';
import { CategoriesService } from '../category/categories.service';
import { CategoriesComponent } from '../category/categories/categories.component';
import { CreateComponent } from '../create/create.component';
import { ProductCreateComponent } from './product-create/product-create.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { ProductListComponent } from './product-list/product-list.component';

const routes: Routes = [
  {
    path: 'create/product-create',
    component: ProductCreateComponent,
    canActivate: [AdminGuard],
  },
  { path: 'products', component: ProductListComponent },
  {
    path: 'products/categories/:categoryId',
    component: ProductListComponent,
  },
  {
    path: 'products/:productId',
    component: ProductDetailsComponent,
  },
  { path: 'create', component: CreateComponent },
];

@NgModule({
  declarations: [
    ProductCreateComponent,
    ProductDetailsComponent,
    ProductListComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    AuthenticationModule,
    RouterModule.forChild(routes),
  ],
  exports: [
    ProductCreateComponent,
    ProductDetailsComponent,
    ProductListComponent,
  ],
})
export class ProductsModule {}
