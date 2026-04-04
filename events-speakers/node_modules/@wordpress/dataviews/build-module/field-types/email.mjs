// packages/dataviews/src/field-types/email.tsx
import { __ } from "@wordpress/i18n";
import {
  OPERATOR_IS,
  OPERATOR_IS_ALL,
  OPERATOR_IS_NOT_ALL,
  OPERATOR_IS_ANY,
  OPERATOR_IS_NONE,
  OPERATOR_IS_NOT,
  OPERATOR_CONTAINS,
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
var emailRegex = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
function isValidCustom(item, field) {
  const value = field.getValue({ item });
  if (![void 0, "", null].includes(value) && !emailRegex.test(value)) {
    return __("Value must be a valid email address.");
  }
  return null;
}
var email_default = {
  type: "email",
  render,
  Edit: "email",
  sort,
  enableSorting: true,
  enableGlobalSearch: false,
  defaultOperators: [OPERATOR_IS_ANY, OPERATOR_IS_NONE],
  validOperators: [
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
    elements: isValidElements,
    custom: isValidCustom
  }
};
export {
  email_default as default
};
//# sourceMappingURL=email.mjs.map
