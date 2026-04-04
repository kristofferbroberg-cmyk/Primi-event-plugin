// packages/dataviews/src/constants.ts
import { __ } from "@wordpress/i18n";
import { arrowDown, arrowUp } from "@wordpress/icons";
var OPERATOR_IS_ANY = "isAny";
var OPERATOR_IS_NONE = "isNone";
var OPERATOR_IS_ALL = "isAll";
var OPERATOR_IS_NOT_ALL = "isNotAll";
var OPERATOR_BETWEEN = "between";
var OPERATOR_IN_THE_PAST = "inThePast";
var OPERATOR_OVER = "over";
var OPERATOR_IS = "is";
var OPERATOR_IS_NOT = "isNot";
var OPERATOR_LESS_THAN = "lessThan";
var OPERATOR_GREATER_THAN = "greaterThan";
var OPERATOR_LESS_THAN_OR_EQUAL = "lessThanOrEqual";
var OPERATOR_GREATER_THAN_OR_EQUAL = "greaterThanOrEqual";
var OPERATOR_BEFORE = "before";
var OPERATOR_AFTER = "after";
var OPERATOR_BEFORE_INC = "beforeInc";
var OPERATOR_AFTER_INC = "afterInc";
var OPERATOR_CONTAINS = "contains";
var OPERATOR_NOT_CONTAINS = "notContains";
var OPERATOR_STARTS_WITH = "startsWith";
var OPERATOR_ON = "on";
var OPERATOR_NOT_ON = "notOn";
var SORTING_DIRECTIONS = ["asc", "desc"];
var sortArrows = { asc: "\u2191", desc: "\u2193" };
var sortValues = { asc: "ascending", desc: "descending" };
var sortLabels = {
  asc: __("Sort ascending"),
  desc: __("Sort descending")
};
var sortIcons = {
  asc: arrowUp,
  desc: arrowDown
};
var LAYOUT_TABLE = "table";
var LAYOUT_GRID = "grid";
var LAYOUT_LIST = "list";
var LAYOUT_ACTIVITY = "activity";
var LAYOUT_PICKER_GRID = "pickerGrid";
var LAYOUT_PICKER_TABLE = "pickerTable";
var DAYS_OF_WEEK = [0, 1, 2, 3, 4, 5, 6];
export {
  DAYS_OF_WEEK,
  LAYOUT_ACTIVITY,
  LAYOUT_GRID,
  LAYOUT_LIST,
  LAYOUT_PICKER_GRID,
  LAYOUT_PICKER_TABLE,
  LAYOUT_TABLE,
  OPERATOR_AFTER,
  OPERATOR_AFTER_INC,
  OPERATOR_BEFORE,
  OPERATOR_BEFORE_INC,
  OPERATOR_BETWEEN,
  OPERATOR_CONTAINS,
  OPERATOR_GREATER_THAN,
  OPERATOR_GREATER_THAN_OR_EQUAL,
  OPERATOR_IN_THE_PAST,
  OPERATOR_IS,
  OPERATOR_IS_ALL,
  OPERATOR_IS_ANY,
  OPERATOR_IS_NONE,
  OPERATOR_IS_NOT,
  OPERATOR_IS_NOT_ALL,
  OPERATOR_LESS_THAN,
  OPERATOR_LESS_THAN_OR_EQUAL,
  OPERATOR_NOT_CONTAINS,
  OPERATOR_NOT_ON,
  OPERATOR_ON,
  OPERATOR_OVER,
  OPERATOR_STARTS_WITH,
  SORTING_DIRECTIONS,
  sortArrows,
  sortIcons,
  sortLabels,
  sortValues
};
//# sourceMappingURL=constants.mjs.map
