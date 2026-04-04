// packages/dataviews/src/field-types/number.tsx
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
  separatorThousand: ",",
  separatorDecimal: ".",
  decimals: 2
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
  let formatNumber;
  if (field.type !== "number") {
    formatNumber = format;
  } else {
    formatNumber = field.format;
  }
  const { separatorThousand, separatorDecimal, decimals } = formatNumber;
  const fixedValue = value.toFixed(decimals);
  const [integerPart, decimalPart] = fixedValue.split(".");
  const formattedInteger = separatorThousand ? integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, separatorThousand) : integerPart;
  return decimals === 0 ? formattedInteger : formattedInteger + separatorDecimal + decimalPart;
}
function isEmpty(value) {
  return value === "" || value === void 0 || value === null;
}
function isValidCustom(item, field) {
  const value = field.getValue({ item });
  if (!isEmpty(value) && !Number.isFinite(value)) {
    return __("Value must be a number.");
  }
  return null;
}
var number_default = {
  type: "number",
  render,
  Edit: "number",
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
  number_default as default
};
//# sourceMappingURL=number.mjs.map
