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

// packages/components/src/utils/base-label.ts
var base_label_exports = {};
__export(base_label_exports, {
  baseLabelTypography: () => baseLabelTypography
});
module.exports = __toCommonJS(base_label_exports);
var import_react = require("@emotion/react");
var import_config_values = __toESM(require("./config-values.cjs"));
var baseLabelTypography = /* @__PURE__ */ (0, import_react.css)("font-size:11px;font-weight:", import_config_values.default.fontWeightMedium, ";line-height:1.4;text-transform:uppercase;" + (process.env.NODE_ENV === "production" ? "" : ";label:baseLabelTypography;"), process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImJhc2UtbGFiZWwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBWXNDIiwiZmlsZSI6ImJhc2UtbGFiZWwudHMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEV4dGVybmFsIGRlcGVuZGVuY2llc1xuICovXG5pbXBvcnQgeyBjc3MgfSBmcm9tICdAZW1vdGlvbi9yZWFjdCc7XG5cbi8qKlxuICogSW50ZXJuYWwgZGVwZW5kZW5jaWVzXG4gKi9cbmltcG9ydCBDT05GSUcgZnJvbSAnLi9jb25maWctdmFsdWVzLmpzJztcblxuLy8gVGhpcyBpcyBhIHZlcnkgbG93LWxldmVsIG1peGluIHdoaWNoIHlvdSBzaG91bGRuJ3QgaGF2ZSB0byB1c2UgZGlyZWN0bHkuXG4vLyBUcnkgdG8gdXNlIEJhc2VDb250cm9sJ3MgU3R5bGVkTGFiZWwgb3IgQmFzZUNvbnRyb2wuVmlzdWFsTGFiZWwgaWYgeW91IGNhbi5cbmV4cG9ydCBjb25zdCBiYXNlTGFiZWxUeXBvZ3JhcGh5ID0gY3NzYFxuXHRmb250LXNpemU6IDExcHg7XG5cdGZvbnQtd2VpZ2h0OiAkeyBDT05GSUcuZm9udFdlaWdodE1lZGl1bSB9O1xuXHRsaW5lLWhlaWdodDogMS40O1xuXHR0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xuYDtcbiJdfQ== */");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  baseLabelTypography
});
//# sourceMappingURL=base-label.cjs.map
