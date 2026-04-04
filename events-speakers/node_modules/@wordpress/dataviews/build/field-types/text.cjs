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

// packages/dataviews/src/field-types/text.tsx
var text_exports = {};
__export(text_exports, {
  default: () => text_default
});
module.exports = __toCommonJS(text_exports);
var import_constants = require("../constants.cjs");
var import_render_default = __toESM(require("./utils/render-default.cjs"));
var import_sort_text = __toESM(require("./utils/sort-text.cjs"));
var import_is_valid_required = __toESM(require("./utils/is-valid-required.cjs"));
var import_is_valid_min_length = __toESM(require("./utils/is-valid-min-length.cjs"));
var import_is_valid_max_length = __toESM(require("./utils/is-valid-max-length.cjs"));
var import_is_valid_pattern = __toESM(require("./utils/is-valid-pattern.cjs"));
var import_is_valid_elements = __toESM(require("./utils/is-valid-elements.cjs"));
var import_get_value_formatted_default = __toESM(require("./utils/get-value-formatted-default.cjs"));
var text_default = {
  type: "text",
  render: import_render_default.default,
  Edit: "text",
  sort: import_sort_text.default,
  enableSorting: true,
  enableGlobalSearch: false,
  defaultOperators: [import_constants.OPERATOR_IS_ANY, import_constants.OPERATOR_IS_NONE],
  validOperators: [
    // Single selection
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
    elements: import_is_valid_elements.default
  }
};
//# sourceMappingURL=text.cjs.map
