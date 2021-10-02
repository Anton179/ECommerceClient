import {RequestFilters} from './requestFilters.model';

export interface PagedRequest {
  pageIndex: number;
  pageSize: number;
  columnNameForSorting: string;
  sortDirection: string;
  requestFilters?: RequestFilters;

  // constructor(paginator: MatPaginator, sort: MatSort, filters: RequestFilters) {
  //   this.pageIndex = paginator.pageIndex;
  //   this.pageSize = paginator.pageSize;
  //   this.columnNameForSorting = sort.active;
  //   this.sortDirection = sort.direction;
  //   this.requestFilters = filters;
  // }
}
