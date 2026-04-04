/**
 * Internal dependencies
 */
import type { NormalizedField } from '../types';
import isValidRequired from './utils/is-valid-required';
import isValidMin from './utils/is-valid-min';
import isValidMax from './utils/is-valid-max';
import isValidElements from './utils/is-valid-elements';
import render from './utils/render-default';
declare function getValueFormatted<Item>({ item, field, }: {
    item: Item;
    field: NormalizedField<Item>;
}): string;
declare function isValidCustom<Item>(item: Item, field: NormalizedField<Item>): import("@wordpress/i18n").TranslatableText<"Value must be a number."> | null;
declare const _default: {
    type: "number";
    render: typeof render;
    Edit: string;
    sort: (a: any, b: any, direction: import("..").SortDirection) => number;
    enableSorting: true;
    enableGlobalSearch: false;
    defaultOperators: ("is" | "isNot" | "lessThan" | "greaterThan" | "lessThanOrEqual" | "greaterThanOrEqual" | "between")[];
    validOperators: ("is" | "isNot" | "isAny" | "isNone" | "isAll" | "isNotAll" | "lessThan" | "greaterThan" | "lessThanOrEqual" | "greaterThanOrEqual" | "between")[];
    format: {
        separatorThousand: string;
        separatorDecimal: string;
        decimals: number;
    };
    getValueFormatted: typeof getValueFormatted;
    validate: {
        required: typeof isValidRequired;
        min: typeof isValidMin;
        max: typeof isValidMax;
        elements: typeof isValidElements;
        custom: typeof isValidCustom;
    };
};
export default _default;
//# sourceMappingURL=number.d.ts.map