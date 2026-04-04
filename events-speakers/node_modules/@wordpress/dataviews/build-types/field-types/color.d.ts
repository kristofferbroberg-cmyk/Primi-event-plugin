/**
 * Internal dependencies
 */
import type { DataViewRenderFieldProps, NormalizedField, SortDirection } from '../types';
import isValidElements from './utils/is-valid-elements';
import isValidRequired from './utils/is-valid-required';
import getValueFormatted from './utils/get-value-formatted-default';
declare function render({ item, field }: DataViewRenderFieldProps<any>): string | import("react").JSX.Element;
declare function isValidCustom<Item>(item: Item, field: NormalizedField<Item>): import("@wordpress/i18n").TranslatableText<"Value must be a valid color."> | null;
declare const _default: {
    type: "color";
    render: typeof render;
    Edit: string;
    sort: (a: any, b: any, direction: SortDirection) => number;
    enableSorting: true;
    enableGlobalSearch: false;
    defaultOperators: ("isAny" | "isNone")[];
    validOperators: ("is" | "isNot" | "isAny" | "isNone")[];
    format: {};
    getValueFormatted: typeof getValueFormatted;
    validate: {
        required: typeof isValidRequired;
        elements: typeof isValidElements;
        custom: typeof isValidCustom;
    };
};
export default _default;
//# sourceMappingURL=color.d.ts.map