/**
 * Internal dependencies
 */
import type { Field, FilterByConfig, Operator } from '../../types';
declare function getFilterBy<Item>(field: Field<Item>, defaultOperators: Operator[], validOperators: Operator[]): Required<FilterByConfig> | false;
export default getFilterBy;
//# sourceMappingURL=get-filter-by.d.ts.map