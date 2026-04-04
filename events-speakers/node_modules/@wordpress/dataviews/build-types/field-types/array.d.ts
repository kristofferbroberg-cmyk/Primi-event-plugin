/**
 * Internal dependencies
 */
import type { DataViewRenderFieldProps, NormalizedField, SortDirection } from '../types';
import isValidRequiredForArray from './utils/is-valid-required-for-array';
import isValidElements from './utils/is-valid-elements';
declare function getValueFormatted<Item>({ item, field, }: {
    item: Item;
    field: NormalizedField<Item>;
}): string;
declare function render({ item, field }: DataViewRenderFieldProps<any>): string;
declare function isValidCustom<Item>(item: Item, field: NormalizedField<Item>): import("@wordpress/i18n").TranslatableText<"Value must be an array."> | import("@wordpress/i18n").TranslatableText<"Every value must be a string."> | null;
declare const _default: {
    type: "array";
    render: typeof render;
    Edit: string;
    sort: (a: any, b: any, direction: SortDirection) => number;
    enableSorting: true;
    enableGlobalSearch: false;
    defaultOperators: ("isAny" | "isNone")[];
    validOperators: ("isAny" | "isNone" | "isAll" | "isNotAll")[];
    format: {};
    getValueFormatted: typeof getValueFormatted;
    validate: {
        required: typeof isValidRequiredForArray;
        elements: typeof isValidElements;
        custom: typeof isValidCustom;
    };
};
export default _default;
//# sourceMappingURL=array.d.ts.map