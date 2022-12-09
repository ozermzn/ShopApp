import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, map, take, exhaustMap, tap } from 'rxjs';
import { Category } from './category.model';
import { Product } from '../products/product.model';
import { User } from '../authentication/user';
import { AuthService } from '../authentication/auth.service';
import { ProductsService } from '../products/products.service';

@Injectable({
  providedIn: 'root',
})
export class CategoriesService {
  products: Product[] = [];
  private url = 'https://shopapp-770fb-default-rtdb.firebaseio.com/';

  constructor(private http: HttpClient, private authService: AuthService) {}
  getCategories(): Observable<Category[]> {
    return this.http.get<Category[]>(this.url + 'categories.json').pipe(
      map((data) => {
        const categories: Category[] = [];

        for (const key in data) {
          categories.push({ ...data[key], id: key });
        }
        return categories;
      })
    );
  }

  createCategory(category: Category): Observable<Category> {
    return this.authService.user.pipe(
      take(1),
      tap((user) => console.log(user)),
      exhaustMap((user) => {
        return this.http.post<Category>(
          this.url + 'categories.json?auth=' + user?.token,
          category
        );
      })
    );
  }
}
