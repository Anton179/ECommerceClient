import {Component} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {PagedRequest} from "../../../core/models/pageRequest/pagedRequest.model";
import {FilterLogicalOperators} from "../../../core/models/pageRequest/enums/FilterLogicalOperators";
import {FilterOperators} from "../../../core/models/pageRequest/enums/FilterOperators";
import {ProductService} from "../../../core/services/product.service";
import {Product} from "../../../core/models/product.model";
import {PaginatedResult} from "../../../core/models/pageRequest/paginatedResult.model";
import {Roles} from "../../../constants/roles";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {

  category?: string;
  vendor?: string;
  products: Product[] = [];
  length: number = 0;
  pagedRequest?: PagedRequest;

  constructor(private _route: ActivatedRoute, private _productService: ProductService) {
    _route.queryParams.subscribe((queryParam: any) => {
      const categoryName: string | undefined = queryParam['category'];
      const productName: string | undefined = queryParam['product'];
      const vendorName: string | undefined = queryParam[Roles.vendor];

      this.pagedRequest = {
        pageIndex: 1, pageSize: 21,
        sortDirection: 'Ascending', columnNameForSorting: 'Name',
        requestFilters: {logicalOperator: FilterLogicalOperators.And, filters: []}
      };

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

      this.vendor = undefined;
      if (vendorName) {
        this.pagedRequest.requestFilters?.filters.push({
          path: 'User.UserName',
          value: vendorName,
          operator: FilterOperators.Equals
        })

        this.vendor = vendorName;
      }

      this.category = categoryName;
      this.getProducts(0)
    })
  }

  getProducts(pageIndex: number) {
    if (this.pagedRequest) {
      this.pagedRequest.pageIndex = pageIndex + 1;

      this._productService.getProducts(this.pagedRequest).subscribe((paginatedResult: PaginatedResult<Product>) => {
        this.products = paginatedResult.items;
        this.length = paginatedResult.total;
      })
    }
  }
}
