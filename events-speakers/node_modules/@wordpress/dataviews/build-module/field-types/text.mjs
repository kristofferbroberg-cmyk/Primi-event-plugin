// packages/dataviews/src/field-types/text.tsx
import {
  OPERATOR_CONTAINS,
  OPERATOR_IS,
  OPERATOR_IS_ALL,
  OPERATOR_IS_ANY,
  OPERATOR_IS_NONE,
  OPERATOR_IS_NOT,
  OPERATOR_IS_NOT_ALL,
  OPERATOR_NOT_CONTAINS,
  OPERATOR_STARTS_WITH
} from "../constants.mjs";
import render from "./utils/render-default.mjs";
import sort from "./utils/sort-text.mjs";
import isValidRequired from "./utils/is-valid-required.mjs";
import isValidMinLength from "./utils/is-valid-min-length.mjs";
import isValidMaxLength from "./utils/is-valid-max-length.mjs";
import isValidPattern from "./utils/is-valid-pattern.mjs";
import isValidElements from "./utils/is-valid-elements.mjs";
import getValueFormatted from "./utils/get-value-formatted-default.mjs";
var text_default = {
  type: "text",
  render,
  Edit: "text",
  sort,
  enableSorting: true,
  enableGlobalSearch: false,
  defaultOperators: [OPERATOR_IS_ANY, OPERATOR_IS_NONE],
  validOperators: [
    // Single selection
    OPERATOR_IS,
    OPERATOR_IS_NOT,
    OPERATOR_CONTAINS,
    OPERATOR_NOT_CONTAINS,
    OPERATOR_STARTS_WITH,
    // Multiple selection
    OPERATOR_IS_ANY,
    OPERATOR_IS_NONE,
    OPERATOR_IS_ALL,
    OPERATOR_IS_NOT_ALL
  ],
  format: {},
  getValueFormatted,
  validate: {
    required: isValidRequired,
    pattern: isValidPattern,
    minLength: isValidMinLength,
    maxLength: isValidMaxLength,
    elements: isValidElements
  }
};
export {
  text_default as default
};
//# sourceMappingURL=text.mjs.map
