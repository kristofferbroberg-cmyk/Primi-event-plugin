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

// packages/dataviews/src/field-types/integer.tsx
var integer_exports = {};
__export(integer_exports, {
  default: () => integer_default
});
module.exports = __toCommonJS(integer_exports);
var import_i18n = require("@wordpress/i18n");
var import_constants = require("../constants.cjs");
var import_sort_number = __toESM(require("./utils/sort-number.cjs"));
var import_is_valid_required = __toESM(require("./utils/is-valid-required.cjs"));
var import_is_valid_min = __toESM(require("./utils/is-valid-min.cjs"));
var import_is_valid_max = __toESM(require("./utils/is-valid-max.cjs"));
var import_is_valid_elements = __toESM(require("./utils/is-valid-elements.cjs"));
var import_render_default = __toESM(require("./utils/render-default.cjs"));
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
    return (0, import_i18n.__)("Value must be an integer.");
  }
  return null;
}
var integer_default = {
  type: "integer",
  render: import_render_default.default,
  Edit: "integer",
  sort: import_sort_number.default,
  enableSorting: true,
  enableGlobalSearch: false,
  defaultOperators: [
    import_constants.OPERATOR_IS,
    import_constants.OPERATOR_IS_NOT,
    import_constants.OPERATOR_LESS_THAN,
    import_constants.OPERATOR_GREATER_THAN,
    import_constants.OPERATOR_LESS_THAN_OR_EQUAL,
    import_constants.OPERATOR_GREATER_THAN_OR_EQUAL,
    import_constants.OPERATOR_BETWEEN
  ],
  validOperators: [
    // Single-selection
    import_constants.OPERATOR_IS,
    import_constants.OPERATOR_IS_NOT,
    import_constants.OPERATOR_LESS_THAN,
    import_constants.OPERATOR_GREATER_THAN,
    import_constants.OPERATOR_LESS_THAN_OR_EQUAL,
    import_constants.OPERATOR_GREATER_THAN_OR_EQUAL,
    import_constants.OPERATOR_BETWEEN,
    // Multiple-selection
    import_constants.OPERATOR_IS_ANY,
    import_constants.OPERATOR_IS_NONE,
    import_constants.OPERATOR_IS_ALL,
    import_constants.OPERATOR_IS_NOT_ALL
  ],
  format,
  getValueFormatted,
  validate: {
    required: import_is_valid_required.default,
    min: import_is_valid_min.default,
    max: import_is_valid_max.default,
    elements: import_is_valid_elements.default,
    custom: isValidCustom
  }
};
//# sourceMappingURL=integer.cjs.map
