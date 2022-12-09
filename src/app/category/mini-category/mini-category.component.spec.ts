import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiniCategoryComponent } from './mini-category.component';

describe('MiniCategoryComponent', () => {
  let component: MiniCategoryComponent;
  let fixture: ComponentFixture<MiniCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MiniCategoryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MiniCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
