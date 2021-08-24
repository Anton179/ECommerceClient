import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/core/models/category.model';
import { Product } from 'src/app/core/models/product.model';
import { CategoryService } from 'src/app/core/services/category.service';
import { ProductService } from 'src/app/core/services/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  productList: Product[] = [];
  dicountProducts: Product[] = [];
  categories: Category[] = [];

// --------
  starCount: number = 5;
  starColor: string = "primary";
  rating: number = 5;

//---------

  constructor(private productService: ProductService, private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.productService.getProducts().subscribe((products: Product[]) => {
      this.productList = products;
      if (this.productList.length > 7)
      {
        this.productList.splice(7, this.productList.length - 7);
      }
    });

    this.productService.getDiscountProducts().subscribe((products: Product[]) => {
      this.dicountProducts = products;
      if (this.dicountProducts.length > 7)
      {
        this.dicountProducts.splice(7, this.dicountProducts.length - 7);
      }
    });

    this.categoryService.getMainCategories().subscribe((categories: Category[]) => {
      this.categories = categories;
    });
  }

}
