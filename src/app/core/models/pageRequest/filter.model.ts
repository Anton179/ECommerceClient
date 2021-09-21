import {FilterOperators} from "./enums/FilterOperators";

export interface Filter {
  path: string;
  value?: string;
  operator?: FilterOperators;
}
