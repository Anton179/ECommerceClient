import {Filter} from "./filter.model";
import {FilterLogicalOperators} from "./FilterLogicalOperators";

export interface RequestFilters {
  logicalOperator: FilterLogicalOperators;
  filters: Filter[];
}
