// packages/dataviews/src/field-types/boolean.tsx
import { __ } from "@wordpress/i18n";
import { OPERATOR_IS, OPERATOR_IS_NOT } from "../constants.mjs";
import isValidElements from "./utils/is-valid-elements.mjs";
import isValidRequiredForBool from "./utils/is-valid-required-for-bool.mjs";
import render from "./utils/render-default.mjs";
function getValueFormatted({
  item,
  field
}) {
  const value = field.getValue({ item });
  if (value === true) {
    return __("True");
  }
  if (value === false) {
    return __("False");
  }
  return "";
}
function isValidCustom(item, field) {
  const value = field.getValue({ item });
  if (![void 0, "", null].includes(value) && ![true, false].includes(value)) {
    return __("Value must be true, false, or undefined");
  }
  return null;
}
var sort = (a, b, direction) => {
  const boolA = Boolean(a);
  const boolB = Boolean(b);
  if (boolA === boolB) {
    return 0;
  }
  if (direction === "asc") {
    return boolA ? 1 : -1;
  }
  return boolA ? -1 : 1;
};
var boolean_default = {
  type: "boolean",
  render,
  Edit: "checkbox",
  sort,
  validate: {
    required: isValidRequiredForBool,
    elements: isValidElements,
    custom: isValidCustom
  },
  enableSorting: true,
  enableGlobalSearch: false,
  defaultOperators: [OPERATOR_IS, OPERATOR_IS_NOT],
  validOperators: [OPERATOR_IS, OPERATOR_IS_NOT],
  format: {},
  getValueFormatted
};
export {
  boolean_default as default
};
//# sourceMappingURL=boolean.mjs.map
