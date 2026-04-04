// packages/dataviews/src/field-types/integer.tsx
import { __ } from "@wordpress/i18n";
import {
  OPERATOR_IS,
  OPERATOR_IS_NOT,
  OPERATOR_LESS_THAN,
  OPERATOR_GREATER_THAN,
  OPERATOR_LESS_THAN_OR_EQUAL,
  OPERATOR_GREATER_THAN_OR_EQUAL,
  OPERATOR_IS_ANY,
  OPERATOR_IS_NONE,
  OPERATOR_IS_ALL,
  OPERATOR_IS_NOT_ALL,
  OPERATOR_BETWEEN
} from "../constants.mjs";
import sort from "./utils/sort-number.mjs";
import isValidRequired from "./utils/is-valid-required.mjs";
import isValidMin from "./utils/is-valid-min.mjs";
import isValidMax from "./utils/is-valid-max.mjs";
import isValidElements from "./utils/is-valid-elements.mjs";
import render from "./utils/render-default.mjs";
var format = {
  separatorThousand: ","
};
function getValueFormatted({
  item,
  field
}) {
  let value = field.getValue({ item });
  if (value === null || value === void 0) {
    return "";
  }
  value = Number(value);
  if (!Number.isFinite(value)) {
    return String(value);
  }
  let formatInteger;
  if (field.type !== "integer") {
    formatInteger = format;
  } else {
    formatInteger = field.format;
  }
  const { separatorThousand } = formatInteger;
  const integerValue = Math.trunc(value);
  if (!separatorThousand) {
    return String(integerValue);
  }
  return String(integerValue).replace(
    /\B(?=(\d{3})+(?!\d))/g,
    separatorThousand
  );
}
function isValidCustom(item, field) {
  const value = field.getValue({ item });
  if (![void 0, "", null].includes(value) && !Number.isInteger(value)) {
    return __("Value must be an integer.");
  }
  return null;
}
var integer_default = {
  type: "integer",
  render,
  Edit: "integer",
  sort,
  enableSorting: true,
  enableGlobalSearch: false,
  defaultOperators: [
    OPERATOR_IS,
    OPERATOR_IS_NOT,
    OPERATOR_LESS_THAN,
    OPERATOR_GREATER_THAN,
    OPERATOR_LESS_THAN_OR_EQUAL,
    OPERATOR_GREATER_THAN_OR_EQUAL,
    OPERATOR_BETWEEN
  ],
  validOperators: [
    // Single-selection
    OPERATOR_IS,
    OPERATOR_IS_NOT,
    OPERATOR_LESS_THAN,
    OPERATOR_GREATER_THAN,
    OPERATOR_LESS_THAN_OR_EQUAL,
    OPERATOR_GREATER_THAN_OR_EQUAL,
    OPERATOR_BETWEEN,
    // Multiple-selection
    OPERATOR_IS_ANY,
    OPERATOR_IS_NONE,
    OPERATOR_IS_ALL,
    OPERATOR_IS_NOT_ALL
  ],
  format,
  getValueFormatted,
  validate: {
    required: isValidRequired,
    min: isValidMin,
    max: isValidMax,
    elements: isValidElements,
    custom: isValidCustom
  }
};
export {
  integer_default as default
};
//# sourceMappingURL=integer.mjs.map
