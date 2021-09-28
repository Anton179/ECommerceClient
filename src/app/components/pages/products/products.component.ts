import {Component} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Subscription} from "rxjs";
import {PagedRequest} from "../../../core/models/pageRequest/pagedRequest.model";
import {FilterLogicalOperators} from "../../../core/models/pageRequest/enums/FilterLogicalOperators";
import {FilterOperators} from "../../../core/models/pageRequest/enums/FilterOperators";
import {ProductService} from "../../../core/services/product.service";
import {Product} from "../../../core/models/product.model";
import {PaginatedResult} from "../../../core/models/pageRequest/paginatedResult.model";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {

  products: Product[] = []
  str = '';
  length: number = 0;
  pagedRequest: PagedRequest = {
    pageIndex: 1, pageSize: 21,
    sortDirection: 'Ascending', columnNameForSorting: 'Name',
    requestFilters: {logicalOperator: FilterLogicalOperators.And, filters: []}
  };
  private _querySubscription: Subscription;

  constructor(private _route: ActivatedRoute, private _prooductService: ProductService) {
    this._querySubscription = _route.queryParams.subscribe((queryParam: any) => {
      const categoryName: string | undefined = queryParam['category'];
      const productName: string | undefined = queryParam['product'];

      if (productName) {
        this.pagedRequest.requestFilters?.filters.push({
          path: 'Name',
          value: productName,
          operator: FilterOperators.Contains
        })
      }

      if (categoryName) {
        this.pagedRequest.requestFilters?.filters.push({
          path: 'Category.Name',
          value: categoryName,
          operator: FilterOperators.Equals
        })
      }

      this.getProducts(0)
    })
  }

  getProducts(pageIndex: number) {
    this.pagedRequest.pageIndex = pageIndex + 1;

    this._prooductService.getProducts(this.pagedRequest).subscribe((paginatedResult: PaginatedResult<Product>) => {
      this.products = paginatedResult.items;
      this.length = paginatedResult.total;
    })
  }
}
