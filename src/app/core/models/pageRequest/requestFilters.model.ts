import {Filter} from "./filter.model";
import {FilterLogicalOperators} from "./enums/FilterLogicalOperators";

export interface RequestFilters {
  logicalOperator: FilterLogicalOperators;
  filters: Filter[];
}
