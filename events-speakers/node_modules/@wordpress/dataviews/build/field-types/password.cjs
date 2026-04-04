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

// packages/dataviews/src/field-types/password.tsx
var password_exports = {};
__export(password_exports, {
  default: () => password_default
});
module.exports = __toCommonJS(password_exports);
var import_is_valid_required = __toESM(require("./utils/is-valid-required.cjs"));
var import_is_valid_min_length = __toESM(require("./utils/is-valid-min-length.cjs"));
var import_is_valid_max_length = __toESM(require("./utils/is-valid-max-length.cjs"));
var import_is_valid_pattern = __toESM(require("./utils/is-valid-pattern.cjs"));
var import_is_valid_elements = __toESM(require("./utils/is-valid-elements.cjs"));
var import_render_default = __toESM(require("./utils/render-default.cjs"));
function getValueFormatted({
  item,
  field
}) {
  return field.getValue({ item }) ? "\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022" : "";
}
var password_default = {
  type: "password",
  render: import_render_default.default,
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
    required: import_is_valid_required.default,
    pattern: import_is_valid_pattern.default,
    minLength: import_is_valid_min_length.default,
    maxLength: import_is_valid_max_length.default,
    elements: import_is_valid_elements.default
  }
};
//# sourceMappingURL=password.cjs.map
