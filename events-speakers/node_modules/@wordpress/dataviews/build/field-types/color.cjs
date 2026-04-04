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

// packages/dataviews/src/field-types/color.tsx
var color_exports = {};
__export(color_exports, {
  default: () => color_default
});
module.exports = __toCommonJS(color_exports);
var import_colord = require("colord");
var import_i18n = require("@wordpress/i18n");
var import_render_from_elements = __toESM(require("./utils/render-from-elements.cjs"));
var import_constants = require("../constants.cjs");
var import_is_valid_elements = __toESM(require("./utils/is-valid-elements.cjs"));
var import_is_valid_required = __toESM(require("./utils/is-valid-required.cjs"));
var import_get_value_formatted_default = __toESM(require("./utils/get-value-formatted-default.cjs"));
var import_jsx_runtime = require("react/jsx-runtime");
function render({ item, field }) {
  if (field.hasElements) {
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_render_from_elements.default, { item, field });
  }
  const value = (0, import_get_value_formatted_default.default)({ item, field });
  if (!value || !(0, import_colord.colord)(value).isValid()) {
    return value;
  }
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { style: { display: "flex", alignItems: "center", gap: "8px" }, children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      "div",
      {
        style: {
          width: "16px",
          height: "16px",
          borderRadius: "50%",
          backgroundColor: value,
          border: "1px solid #ddd",
          flexShrink: 0
        }
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: value })
  ] });
}
function isValidCustom(item, field) {
  const value = field.getValue({ item });
  if (![void 0, "", null].includes(value) && !(0, import_colord.colord)(value).isValid()) {
    return (0, import_i18n.__)("Value must be a valid color.");
  }
  return null;
}
var sort = (a, b, direction) => {
  const colorA = (0, import_colord.colord)(a);
  const colorB = (0, import_colord.colord)(b);
  if (!colorA.isValid() && !colorB.isValid()) {
    return 0;
  }
  if (!colorA.isValid()) {
    return direction === "asc" ? 1 : -1;
  }
  if (!colorB.isValid()) {
    return direction === "asc" ? -1 : 1;
  }
  const hslA = colorA.toHsl();
  const hslB = colorB.toHsl();
  if (hslA.h !== hslB.h) {
    return direction === "asc" ? hslA.h - hslB.h : hslB.h - hslA.h;
  }
  if (hslA.s !== hslB.s) {
    return direction === "asc" ? hslA.s - hslB.s : hslB.s - hslA.s;
  }
  return direction === "asc" ? hslA.l - hslB.l : hslB.l - hslA.l;
};
var color_default = {
  type: "color",
  render,
  Edit: "color",
  sort,
  enableSorting: true,
  enableGlobalSearch: false,
  defaultOperators: [import_constants.OPERATOR_IS_ANY, import_constants.OPERATOR_IS_NONE],
  validOperators: [
    import_constants.OPERATOR_IS,
    import_constants.OPERATOR_IS_NOT,
    import_constants.OPERATOR_IS_ANY,
    import_constants.OPERATOR_IS_NONE
  ],
  format: {},
  getValueFormatted: import_get_value_formatted_default.default,
  validate: {
    required: import_is_valid_required.default,
    elements: import_is_valid_elements.default,
    custom: isValidCustom
  }
};
//# sourceMappingURL=color.cjs.map
