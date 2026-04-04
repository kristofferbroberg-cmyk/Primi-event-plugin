// packages/dataviews/src/field-types/password.tsx
import isValidRequired from "./utils/is-valid-required.mjs";
import isValidMinLength from "./utils/is-valid-min-length.mjs";
import isValidMaxLength from "./utils/is-valid-max-length.mjs";
import isValidPattern from "./utils/is-valid-pattern.mjs";
import isValidElements from "./utils/is-valid-elements.mjs";
import render from "./utils/render-default.mjs";
function getValueFormatted({
  item,
  field
}) {
  return field.getValue({ item }) ? "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022" : "";
}
var password_default = {
  type: "password",
  render,
  Edit: "password",
  sort: () => 0,
  // Passwords should not be sortable for security reasons
  enableSorting: false,
  enableGlobalSearch: false,
  defaultOperators: [],
  validOperators: [],
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
  password_default as default
};
//# sourceMappingURL=password.mjs.map
