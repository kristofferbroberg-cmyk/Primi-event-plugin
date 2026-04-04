import render from './utils/render-default';
import isValidRequired from './utils/is-valid-required';
import isValidMinLength from './utils/is-valid-min-length';
import isValidMaxLength from './utils/is-valid-max-length';
import isValidPattern from './utils/is-valid-pattern';
import isValidElements from './utils/is-valid-elements';
import getValueFormatted from './utils/get-value-formatted-default';
declare const _default: {
    type: "url";
    render: typeof render;
    Edit: string;
    sort: (a: any, b: any, direction: import("..").SortDirection) => any;
    enableSorting: true;
    enableGlobalSearch: false;
    defaultOperators: ("isAny" | "isNone")[];
    validOperators: ("is" | "isNot" | "isAny" | "isNone" | "isAll" | "isNotAll" | "contains" | "notContains" | "startsWith")[];
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
//# sourceMappingURL=url.d.ts.map