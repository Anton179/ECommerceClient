import {Component, OnInit} from '@angular/core';
import {Category} from 'src/app/core/models/category.model';
import {Product} from 'src/app/core/models/product.model';
import {CategoryService} from 'src/app/core/services/category.service';
import {ProductService} from 'src/app/core/services/product.service';
import {PaginatedResult} from "../../../core/models/pageRequest/paginatedResult.model";
import {FilterOperators} from "../../../core/models/pageRequest/enums/FilterOperators";
import {FilterLogicalOperators} from "../../../core/models/pageRequest/enums/FilterLogicalOperators";
import {Router} from "@angular/router";
import {HttpParams} from "@angular/common/http";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  productList: Product[] = [];
  superDealsProducts: Product[] = [];
  categories: Category[] = [];
  slidesNumber = [
    0, 6, 12
  ];

  constructor(private productService: ProductService, private categoryService: CategoryService,
              private _router: Router) {
  }

  goToCategory(categoryName: string) {
    const params = new HttpParams().set('category', categoryName);

    this._router.navigateByUrl(`/products?${params.toString()}`);
  }

  ngOnInit(): void {
    this.productService.getProducts({
      pageIndex: 1, pageSize: 18,
      sortDirection: 'Descending', columnNameForSorting: 'CreatedDate'
    })
      .subscribe((paginatedResult: PaginatedResult<Product>) => {
        this.productList = paginatedResult.items;
      });

    this.productService.getProducts({
      pageIndex: 1, pageSize: 18,
      sortDirection: 'Descending', columnNameForSorting: 'Price'
    })
      .subscribe((paginatedResult: PaginatedResult<Product>) => {
        this.superDealsProducts = paginatedResult.items;
      });

    this.categoryService.getCategories({
      pageIndex: 1, pageSize: 7,
      sortDirection: "Ascending", columnNameForSorting: "Name",
      requestFilters: {
        logicalOperator: FilterLogicalOperators.And,
        filters: [{path: "ParentId", operator: FilterOperators.EqualsNumber}]
      }
    })
      .subscribe((pagedResult: PaginatedResult<Category>) => {
        this.categories = pagedResult.items;
      })
  }
}
