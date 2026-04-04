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

// packages/dataviews/src/components/dataviews-filters/filters-toggled.tsx
var filters_toggled_exports = {};
__export(filters_toggled_exports, {
  default: () => filters_toggled_default
});
module.exports = __toCommonJS(filters_toggled_exports);
var import_element = require("@wordpress/element");
var import_dataviews_context = __toESM(require("../dataviews-context/index.cjs"));
var import_filters = __toESM(require("./filters.cjs"));
var import_jsx_runtime = require("react/jsx-runtime");
function FiltersToggled(props) {
  const { isShowingFilter } = (0, import_element.useContext)(import_dataviews_context.default);
  if (!isShowingFilter) {
    return null;
  }
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_filters.default, { ...props });
}
var filters_toggled_default = FiltersToggled;
//# sourceMappingURL=filters-toggled.cjs.map
