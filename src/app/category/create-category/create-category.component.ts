import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from 'src/app/category/category.model';
import { CategoriesService } from 'src/app/category/categories.service';

@Component({
  selector: 'create-category',
  templateUrl: './create-category.component.html',
  styleUrls: ['./create-category.component.scss'],
})
export class CreateCategoryComponent implements OnInit {
  categories: Category[] = [];
  model: any = {};
  constructor(
    private categoryService: CategoriesService,
    private router: Router
  ) {}

  ngOnInit(): void {}
  createCategory(name: any) {
    const category = {
      name: name.value,
    };
    this.categoryService.createCategory(category).subscribe((data) => {
      this.router.navigate(['/products']);
    });
  }
}
