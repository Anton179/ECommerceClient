import {Component, OnInit} from '@angular/core';
import {Category} from 'src/app/core/models/category.model';
import {Product} from 'src/app/core/models/product.model';
import {CategoryService} from 'src/app/core/services/category.service';
import {ProductService} from 'src/app/core/services/product.service';
import {PaginatedResult} from "../../../core/models/pageRequest/paginatedResult.model";
import {FilterLogicalOperators} from "../../../core/models/pageRequest/FilterLogicalOperators";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  productList: Product[] = [];
  dicountProducts: Product[] = [];
  categories: Category[] = [];

  slidesNumber = [
    0,6,12
  ];


  constructor(private productService: ProductService, private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.productService.getProducts({pageIndex:0, pageSize:18,
      sortDirection: 'Descending', columnNameForSorting: 'CreatedDate'})
      .subscribe((paginatedResult: PaginatedResult<Product>) => {
      this.productList = paginatedResult.items;
    });

    this.productService.getDiscountProducts({pageIndex:0, pageSize:18,
      sortDirection: 'Ascending', columnNameForSorting: 'Name'})
      .subscribe((paginatedResult: PaginatedResult<Product>) => {
        this.dicountProducts = paginatedResult.items;
    });

    this.categoryService.getMainCategories().subscribe((categories: Category[]) => {
      this.categories = categories;
    });
  }

}
