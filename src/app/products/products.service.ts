import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Product } from './product.model';
import { Observable, map, tap, take, exhaustMap } from 'rxjs';
import { AuthService } from '../authentication/auth.service';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private http: HttpClient, private authService: AuthService) {}
  private url = 'https://shopapp-770fb-default-rtdb.firebaseio.com/';

  getProducts(categoryId?: any): Observable<Product[]> {
    return this.http.get<Product[]>(this.url + 'products.json').pipe(
      map((data) => {
        const products: Product[] = [];
        for (const key in data) {
          if (categoryId) {
            if (categoryId == data[key].categoryId)
              products.push({ ...data[key], id: key });
          } else {
            products.push({ ...data[key], id: key });
          }
        }
        return products;
      })
    );
  }
  createProduct(product: Product): Observable<Product> {
    return this.authService.user.pipe(
      take(1),
      tap((user) => console.log(user)),
      exhaustMap((user) => {
        return this.http.post<Product>(
          this.url + 'products.json?auth=' + user?.token,
          product
        );
      })
    );
  }
  getProductById(id: any): Observable<Product> {
    return this.http.get<Product>(this.url + 'products/' + id + '.json');
  }
}
