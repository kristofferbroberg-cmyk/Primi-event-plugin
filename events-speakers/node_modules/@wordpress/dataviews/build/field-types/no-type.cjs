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

// packages/dataviews/src/field-types/no-type.tsx
var no_type_exports = {};
__export(no_type_exports, {
  default: () => no_type_default
});
module.exports = __toCommonJS(no_type_exports);
var import_constants = require("../constants.cjs");
var import_operators = require("../utils/operators.cjs");
var import_render_default = __toESM(require("./utils/render-default.cjs"));
var import_sort_text = __toESM(require("./utils/sort-text.cjs"));
var import_sort_number = __toESM(require("./utils/sort-number.cjs"));
var import_is_valid_required = __toESM(require("./utils/is-valid-required.cjs"));
var import_is_valid_elements = __toESM(require("./utils/is-valid-elements.cjs"));
var import_get_value_formatted_default = __toESM(require("./utils/get-value-formatted-default.cjs"));
var sort = (a, b, direction) => {
  if (typeof a === "number" && typeof b === "number") {
    return (0, import_sort_number.default)(a, b, direction);
  }
  return (0, import_sort_text.default)(a, b, direction);
};
var no_type_default = {
  // type: no type for this one
  render: import_render_default.default,
  Edit: null,
  sort,
  enableSorting: true,
  enableGlobalSearch: false,
  defaultOperators: [import_constants.OPERATOR_IS, import_constants.OPERATOR_IS_NOT],
  validOperators: (0, import_operators.getAllOperatorNames)(),
  format: {},
  getValueFormatted: import_get_value_formatted_default.default,
  validate: {
    required: import_is_valid_required.default,
    elements: import_is_valid_elements.default
  }
};
//# sourceMappingURL=no-type.cjs.map
