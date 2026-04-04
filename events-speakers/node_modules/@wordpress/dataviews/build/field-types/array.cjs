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

// packages/dataviews/src/field-types/array.tsx
var array_exports = {};
__export(array_exports, {
  default: () => array_default
});
module.exports = __toCommonJS(array_exports);
var import_i18n = require("@wordpress/i18n");
var import_constants = require("../constants.cjs");
var import_is_valid_required_for_array = __toESM(require("./utils/is-valid-required-for-array.cjs"));
var import_is_valid_elements = __toESM(require("./utils/is-valid-elements.cjs"));
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
    return (0, import_i18n.__)("Value must be an array.");
  }
  if (!value.every((v) => typeof v === "string")) {
    return (0, import_i18n.__)("Every value must be a string.");
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
  defaultOperators: [import_constants.OPERATOR_IS_ANY, import_constants.OPERATOR_IS_NONE],
  validOperators: [
    import_constants.OPERATOR_IS_ANY,
    import_constants.OPERATOR_IS_NONE,
    import_constants.OPERATOR_IS_ALL,
    import_constants.OPERATOR_IS_NOT_ALL
  ],
  format: {},
  getValueFormatted,
  validate: {
    required: import_is_valid_required_for_array.default,
    elements: import_is_valid_elements.default,
    custom: isValidCustom
  }
};
//# sourceMappingURL=array.cjs.map
