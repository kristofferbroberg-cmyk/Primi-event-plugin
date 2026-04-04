"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// packages/dataviews/src/field-types/email.tsx
var email_exports = {};
__export(email_exports, {
  default: () => email_default
});
module.exports = __toCommonJS(email_exports);
var import_i18n = require("@wordpress/i18n");
var import_constants = require("../constants.cjs");
var import_render_default = __toESM(require("./utils/render-default.cjs"));
var import_sort_text = __toESM(require("./utils/sort-text.cjs"));
var import_is_valid_required = __toESM(require("./utils/is-valid-required.cjs"));
var import_is_valid_min_length = __toESM(require("./utils/is-valid-min-length.cjs"));
var import_is_valid_max_length = __toESM(require("./utils/is-valid-max-length.cjs"));
var import_is_valid_pattern = __toESM(require("./utils/is-valid-pattern.cjs"));
var import_is_valid_elements = __toESM(require("./utils/is-valid-elements.cjs"));
var import_get_value_formatted_default = __toESM(require("./utils/get-value-formatted-default.cjs"));
var emailRegex = /^[a-zA-Z0-9.!#$%&'*+\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
function isValidCustom(item, field) {
  const value = field.getValue({ item });
  if (![void 0, "", null].includes(value) && !emailRegex.test(value)) {
    return (0, import_i18n.__)("Value must be a valid email address.");
  }
  return null;
}
var email_default = {
  type: "email",
  render: import_render_default.default,
  Edit: "email",
  sort: import_sort_text.default,
  enableSorting: true,
  enableGlobalSearch: false,
  defaultOperators: [import_constants.OPERATOR_IS_ANY, import_constants.OPERATOR_IS_NONE],
  validOperators: [
    import_constants.OPERATOR_IS,
    import_constants.OPERATOR_IS_NOT,
    import_constants.OPERATOR_CONTAINS,
    import_constants.OPERATOR_NOT_CONTAINS,
    import_constants.OPERATOR_STARTS_WITH,
    // Multiple selection
    import_constants.OPERATOR_IS_ANY,
    import_constants.OPERATOR_IS_NONE,
    import_constants.OPERATOR_IS_ALL,
    import_constants.OPERATOR_IS_NOT_ALL
  ],
  format: {},
  getValueFormatted: import_get_value_formatted_default.default,
  validate: {
    required: import_is_valid_required.default,
    pattern: import_is_valid_pattern.default,
    minLength: import_is_valid_min_length.default,
    maxLength: import_is_valid_max_length.default,
    elements: import_is_valid_elements.default,
    custom: isValidCustom
  }
};
//# sourceMappingURL=email.cjs.map
