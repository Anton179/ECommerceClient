import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/core/enums/category';
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
  categories:{category: Category, image: string} [] = [];

  constructor(private productService: ProductService, private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.productList     = this.productService.getProducts();
    this.dicountProducts = this.productService.getDiscountProducts();
    this.categories      = this.categoryService.getCategories();
    
    if (this.productList.length > 7)
    {
      this.productList.splice(7, this.productList.length - 7);
    }
    if (this.dicountProducts.length > 8)
    {
      this.dicountProducts.splice(7, this.dicountProducts.length - 7);
    } 
  }

}
