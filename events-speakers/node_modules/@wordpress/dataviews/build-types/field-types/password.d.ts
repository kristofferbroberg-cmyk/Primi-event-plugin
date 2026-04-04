/**
 * Internal dependencies
 */
import type { NormalizedField } from '../types';
import isValidRequired from './utils/is-valid-required';
import isValidMinLength from './utils/is-valid-min-length';
import isValidMaxLength from './utils/is-valid-max-length';
import isValidPattern from './utils/is-valid-pattern';
import isValidElements from './utils/is-valid-elements';
import render from './utils/render-default';
declare function getValueFormatted<Item>({ item, field, }: {
    item: Item;
    field: NormalizedField<Item>;
}): string;
declare const _default: {
    type: "password";
    render: typeof render;
    Edit: string;
    sort: () => number;
    enableSorting: false;
    enableGlobalSearch: false;
    defaultOperators: never[];
    validOperators: never[];
    format: {};
    getValueFormatted: typeof getValueFormatted;
    validate: {
        required: typeof isValidRequired;
        pattern: typeof isValidPattern;
        minLength: typeof isValidMinLength;
        maxLength: typeof isValidMaxLength;
        elements: typeof isValidElements;
    };
};
export default _default;
//# sourceMappingURL=password.d.ts.map