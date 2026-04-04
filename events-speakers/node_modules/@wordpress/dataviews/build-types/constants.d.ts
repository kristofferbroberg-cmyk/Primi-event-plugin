/**
 * Internal dependencies
 */
import type { DayNumber } from './types';
export declare const OPERATOR_IS_ANY = "isAny";
export declare const OPERATOR_IS_NONE = "isNone";
export declare const OPERATOR_IS_ALL = "isAll";
export declare const OPERATOR_IS_NOT_ALL = "isNotAll";
export declare const OPERATOR_BETWEEN = "between";
export declare const OPERATOR_IN_THE_PAST = "inThePast";
export declare const OPERATOR_OVER = "over";
export declare const OPERATOR_IS = "is";
export declare const OPERATOR_IS_NOT = "isNot";
export declare const OPERATOR_LESS_THAN = "lessThan";
export declare const OPERATOR_GREATER_THAN = "greaterThan";
export declare const OPERATOR_LESS_THAN_OR_EQUAL = "lessThanOrEqual";
export declare const OPERATOR_GREATER_THAN_OR_EQUAL = "greaterThanOrEqual";
export declare const OPERATOR_BEFORE = "before";
export declare const OPERATOR_AFTER = "after";
export declare const OPERATOR_BEFORE_INC = "beforeInc";
export declare const OPERATOR_AFTER_INC = "afterInc";
export declare const OPERATOR_CONTAINS = "contains";
export declare const OPERATOR_NOT_CONTAINS = "notContains";
export declare const OPERATOR_STARTS_WITH = "startsWith";
export declare const OPERATOR_ON = "on";
export declare const OPERATOR_NOT_ON = "notOn";
export declare const SORTING_DIRECTIONS: readonly ["asc", "desc"];
export declare const sortArrows: {
    asc: string;
    desc: string;
};
export declare const sortValues: {
    readonly asc: "ascending";
    readonly desc: "descending";
};
export declare const sortLabels: {
    asc: import("@wordpress/i18n").TranslatableText<"Sort ascending">;
    desc: import("@wordpress/i18n").TranslatableText<"Sort descending">;
};
export declare const sortIcons: {
    asc: import("react").JSX.Element;
    desc: import("react").JSX.Element;
};
export declare const LAYOUT_TABLE = "table";
export declare const LAYOUT_GRID = "grid";
export declare const LAYOUT_LIST = "list";
export declare const LAYOUT_ACTIVITY = "activity";
export declare const LAYOUT_PICKER_GRID = "pickerGrid";
export declare const LAYOUT_PICKER_TABLE = "pickerTable";
export declare const DAYS_OF_WEEK: DayNumber[];
//# sourceMappingURL=constants.d.ts.map