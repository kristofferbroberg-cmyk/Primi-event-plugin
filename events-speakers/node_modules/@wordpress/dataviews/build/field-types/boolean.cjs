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

// packages/dataviews/src/field-types/boolean.tsx
var boolean_exports = {};
__export(boolean_exports, {
  default: () => boolean_default
});
module.exports = __toCommonJS(boolean_exports);
var import_i18n = require("@wordpress/i18n");
var import_constants = require("../constants.cjs");
var import_is_valid_elements = __toESM(require("./utils/is-valid-elements.cjs"));
var import_is_valid_required_for_bool = __toESM(require("./utils/is-valid-required-for-bool.cjs"));
var import_render_default = __toESM(require("./utils/render-default.cjs"));
function getValueFormatted({
  item,
  field
}) {
  const value = field.getValue({ item });
  if (value === true) {
    return (0, import_i18n.__)("True");
  }
  if (value === false) {
    return (0, import_i18n.__)("False");
  }
  return "";
}
function isValidCustom(item, field) {
  const value = field.getValue({ item });
  if (![void 0, "", null].includes(value) && ![true, false].includes(value)) {
    return (0, import_i18n.__)("Value must be true, false, or undefined");
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
  render: import_render_default.default,
  Edit: "checkbox",
  sort,
  validate: {
    required: import_is_valid_required_for_bool.default,
    elements: import_is_valid_elements.default,
    custom: isValidCustom
  },
  enableSorting: true,
  enableGlobalSearch: false,
  defaultOperators: [import_constants.OPERATOR_IS, import_constants.OPERATOR_IS_NOT],
  validOperators: [import_constants.OPERATOR_IS, import_constants.OPERATOR_IS_NOT],
  format: {},
  getValueFormatted
};
//# sourceMappingURL=boolean.cjs.map
