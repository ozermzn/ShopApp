import { Component, OnInit } from '@angular/core';
import { Product } from '../../products/product.model';
import { ProductsService } from '../../products/products.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  products: Product[] = [];
  loading: boolean = false;

  constructor(private productService: ProductsService) {}

  nextSlide(btn: any): any {
    setInterval(btn.click(), 0.1);
  }
  ngOnInit(): void {
    this.loading = true;
    this.productService.getProducts().subscribe((data) => {
      for (let key in data) {
        this.products = data.slice(0, 3);
        console.log(key);
      }
      this.loading = false;
    });
  }
}
