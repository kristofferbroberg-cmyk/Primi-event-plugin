/**
 * Internal dependencies
 */
import type { NormalizedField, SortDirection } from '../types';
import isValidElements from './utils/is-valid-elements';
import isValidRequiredForBool from './utils/is-valid-required-for-bool';
import render from './utils/render-default';
declare function getValueFormatted<Item>({ item, field, }: {
    item: Item;
    field: NormalizedField<Item>;
}): string;
declare function isValidCustom<Item>(item: Item, field: NormalizedField<Item>): import("@wordpress/i18n").TranslatableText<"Value must be true, false, or undefined"> | null;
declare const _default: {
    type: "boolean";
    render: typeof render;
    Edit: string;
    sort: (a: any, b: any, direction: SortDirection) => 0 | 1 | -1;
    validate: {
        required: typeof isValidRequiredForBool;
        elements: typeof isValidElements;
        custom: typeof isValidCustom;
    };
    enableSorting: true;
    enableGlobalSearch: false;
    defaultOperators: ("is" | "isNot")[];
    validOperators: ("is" | "isNot")[];
    format: {};
    getValueFormatted: typeof getValueFormatted;
};
export default _default;
//# sourceMappingURL=boolean.d.ts.map