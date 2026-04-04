/**
 * Internal dependencies
 */
import type { NormalizedField, SortDirection } from '../types';
import isValidElements from './utils/is-valid-elements';
import isValidRequired from './utils/is-valid-required';
import render from './utils/render-default';
declare function getValueFormatted<Item>({ item, field, }: {
    item: Item;
    field: NormalizedField<Item>;
}): string;
declare const _default: {
    type: "datetime";
    render: typeof render;
    Edit: string;
    sort: (a: any, b: any, direction: SortDirection) => number;
    enableSorting: true;
    enableGlobalSearch: false;
    defaultOperators: ("before" | "after" | "beforeInc" | "afterInc" | "on" | "notOn" | "inThePast" | "over")[];
    validOperators: ("before" | "after" | "beforeInc" | "afterInc" | "on" | "notOn" | "inThePast" | "over")[];
    format: {
        datetime: string;
        weekStartsOn: 0 | 1 | 2 | 3 | 4 | 5 | 6;
    };
    getValueFormatted: typeof getValueFormatted;
    validate: {
        required: typeof isValidRequired;
        elements: typeof isValidElements;
    };
};
export default _default;
//# sourceMappingURL=datetime.d.ts.map