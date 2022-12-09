import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/category/category.model';
import { CategoriesService } from 'src/app/category/categories.service';

@Component({
  selector: 'app-mini-category',
  templateUrl: './mini-category.component.html',
  styleUrls: ['./mini-category.component.scss'],
})
export class MiniCategoryComponent implements OnInit {
  categories: Category[] = [];
  selectedCategory: any;
  constructor(private categoryService: CategoriesService) {}

  ngOnInit(): void {
    this.categoryService.getCategories().subscribe((data) => {
      this.categories = data;
    });
  }
  selectCategory(category: Category) {
    this.selectedCategory = category;
  }
}
