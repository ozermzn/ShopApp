import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Category } from '../category.model';
import { CategoriesService } from '../categories.service';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit {
  categories: Category[] = [];
  constructor(
    private categoryService: CategoriesService,
    private router: Router
  ) {}

  ngOnInit(): void {}
  saveCategory(name: any) {
    let category = {
      id: 0,
      name: name.value,
    };
    this.categoryService.createCategory(category).subscribe((data) => {
      this.router.navigate(['/products']);
    });
  }
}
