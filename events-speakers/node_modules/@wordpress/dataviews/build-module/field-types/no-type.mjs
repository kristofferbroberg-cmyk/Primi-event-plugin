// packages/dataviews/src/field-types/no-type.tsx
import { OPERATOR_IS, OPERATOR_IS_NOT } from "../constants.mjs";
import { getAllOperatorNames } from "../utils/operators.mjs";
import render from "./utils/render-default.mjs";
import sortText from "./utils/sort-text.mjs";
import sortNumber from "./utils/sort-number.mjs";
import isValidRequired from "./utils/is-valid-required.mjs";
import isValidElements from "./utils/is-valid-elements.mjs";
import getValueFormatted from "./utils/get-value-formatted-default.mjs";
var sort = (a, b, direction) => {
  if (typeof a === "number" && typeof b === "number") {
    return sortNumber(a, b, direction);
  }
  return sortText(a, b, direction);
};
var no_type_default = {
  // type: no type for this one
  render,
  Edit: null,
  sort,
  enableSorting: true,
  enableGlobalSearch: false,
  defaultOperators: [OPERATOR_IS, OPERATOR_IS_NOT],
  validOperators: getAllOperatorNames(),
  format: {},
  getValueFormatted,
  validate: {
    required: isValidRequired,
    elements: isValidElements
  }
};
export {
  no_type_default as default
};
//# sourceMappingURL=no-type.mjs.map
