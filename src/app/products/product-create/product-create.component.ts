import { HttpClient } from '@angular/common/http';
import { Component, ElementRef, OnInit } from '@angular/core';
import { NgModel } from '@angular/forms';
import { Router } from '@angular/router';
import { Category } from '../../category/category.model';
import { AuthService } from '../../authentication/auth.service';
import { CategoriesService } from '../../category/categories.service';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.scss'],
  providers: [ProductsService],
})
export class ProductCreateComponent implements OnInit {
  categories: Category[] = [];
  error: string = '';
  model: any = {
    categoryId: '0',
  };
  constructor(
    private productService: ProductsService,
    private http: HttpClient,
    private router: Router,
    private categoryService: CategoriesService
  ) {}

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe((data) => {
      this.categories = data;
    });
  }

  saveProduct() {
    const extensions = ['jpg', 'jpeg', 'webp', 'png'];
    const extension = this.model.imageUrl.split('.').pop();
    if (extensions.indexOf(extension) == -1) {
      this.error = 'Lütfen "jpg, jpeg, png" uzantılı dosyalardan tercih yapın.';
      return;
    }
    const product = {
      name: this.model.name,
      price: this.model.price,
      imageUrl: this.model.imageUrl,
      description: this.model.description,
      isActive: this.model.isActive,
      categoryId: this.model.categoryId,
    };

    this.productService
      .createProduct(product)
      .subscribe((data) => this.router.navigate(['/products']));
  }
}
