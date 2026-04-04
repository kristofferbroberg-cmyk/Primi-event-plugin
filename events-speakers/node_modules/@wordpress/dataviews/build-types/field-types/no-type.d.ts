/**
 * Internal dependencies
 */
import type { SortDirection } from '../types';
import render from './utils/render-default';
import isValidRequired from './utils/is-valid-required';
import isValidElements from './utils/is-valid-elements';
import getValueFormatted from './utils/get-value-formatted-default';
declare const _default: {
    render: typeof render;
    Edit: null;
    sort: (a: any, b: any, direction: SortDirection) => any;
    enableSorting: true;
    enableGlobalSearch: false;
    defaultOperators: ("is" | "isNot")[];
    validOperators: import("..").Operator[];
    format: {};
    getValueFormatted: typeof getValueFormatted;
    validate: {
        required: typeof isValidRequired;
        elements: typeof isValidElements;
    };
};
export default _default;
//# sourceMappingURL=no-type.d.ts.map