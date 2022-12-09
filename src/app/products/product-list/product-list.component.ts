import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../product.model';
import { ProductsService } from '../products.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
  providers: [ProductsService],
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  loading: boolean = false;
  constructor(
    private productService: ProductsService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.loading = true;
      this.productService
        .getProducts(params['categoryId'])
        .subscribe((data) => {
          this.products = data;
          this.loading = false;
        });
    });
  }
}
