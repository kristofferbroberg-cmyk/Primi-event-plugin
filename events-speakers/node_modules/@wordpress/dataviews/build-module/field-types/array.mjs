// packages/dataviews/src/field-types/array.tsx
import { __ } from "@wordpress/i18n";
import {
  OPERATOR_IS_ALL,
  OPERATOR_IS_ANY,
  OPERATOR_IS_NONE,
  OPERATOR_IS_NOT_ALL
} from "../constants.mjs";
import isValidRequiredForArray from "./utils/is-valid-required-for-array.mjs";
import isValidElements from "./utils/is-valid-elements.mjs";
function getValueFormatted({
  item,
  field
}) {
  const value = field.getValue({ item });
  const arr = Array.isArray(value) ? value : [];
  return arr.join(", ");
}
function render({ item, field }) {
  return getValueFormatted({ item, field });
}
function isValidCustom(item, field) {
  const value = field.getValue({ item });
  if (![void 0, "", null].includes(value) && !Array.isArray(value)) {
    return __("Value must be an array.");
  }
  if (!value.every((v) => typeof v === "string")) {
    return __("Every value must be a string.");
  }
  return null;
}
var sort = (a, b, direction) => {
  const arrA = Array.isArray(a) ? a : [];
  const arrB = Array.isArray(b) ? b : [];
  if (arrA.length !== arrB.length) {
    return direction === "asc" ? arrA.length - arrB.length : arrB.length - arrA.length;
  }
  const joinedA = arrA.join(",");
  const joinedB = arrB.join(",");
  return direction === "asc" ? joinedA.localeCompare(joinedB) : joinedB.localeCompare(joinedA);
};
var array_default = {
  type: "array",
  render,
  Edit: "array",
  sort,
  enableSorting: true,
  enableGlobalSearch: false,
  defaultOperators: [OPERATOR_IS_ANY, OPERATOR_IS_NONE],
  validOperators: [
    OPERATOR_IS_ANY,
    OPERATOR_IS_NONE,
    OPERATOR_IS_ALL,
    OPERATOR_IS_NOT_ALL
  ],
  format: {},
  getValueFormatted,
  validate: {
    required: isValidRequiredForArray,
    elements: isValidElements,
    custom: isValidCustom
  }
};
export {
  array_default as default
};
//# sourceMappingURL=array.mjs.map
