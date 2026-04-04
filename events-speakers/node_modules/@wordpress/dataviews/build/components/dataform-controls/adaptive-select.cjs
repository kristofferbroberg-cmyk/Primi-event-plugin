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

// packages/dataviews/src/components/dataform-controls/adaptive-select.tsx
var adaptive_select_exports = {};
__export(adaptive_select_exports, {
  default: () => AdaptiveSelect
});
module.exports = __toCommonJS(adaptive_select_exports);
var import_use_elements = __toESM(require("../../hooks/use-elements.cjs"));
var import_combobox = __toESM(require("./combobox.cjs"));
var import_select = __toESM(require("./select.cjs"));
var import_jsx_runtime = require("react/jsx-runtime");
var ELEMENTS_THRESHOLD = 10;
function AdaptiveSelect(props) {
  const { field } = props;
  const { elements } = (0, import_use_elements.default)({
    elements: field.elements,
    getElements: field.getElements
  });
  if (elements.length >= ELEMENTS_THRESHOLD) {
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_combobox.default, { ...props });
  }
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_select.default, { ...props });
}
//# sourceMappingURL=adaptive-select.cjs.map
