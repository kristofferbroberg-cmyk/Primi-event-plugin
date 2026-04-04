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

// packages/components/src/color-palette/styles.ts
var styles_exports = {};
__export(styles_exports, {
  ColorHeading: () => ColorHeading
});
module.exports = __toCommonJS(styles_exports);
var import_base = __toESM(require("@emotion/styled/base"));
var import_heading = require("../heading/index.cjs");
var import_utils = require("../utils/index.cjs");
var ColorHeading = /* @__PURE__ */ (0, import_base.default)(import_heading.Heading, process.env.NODE_ENV === "production" ? {
  target: "ev9wop70"
} : {
  target: "ev9wop70",
  label: "ColorHeading"
})("text-transform:uppercase;line-height:24px;font-weight:", import_utils.CONFIG.fontWeightMedium, ";&&&{font-size:11px;margin-bottom:0;}" + (process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN0eWxlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFXNkMiLCJmaWxlIjoic3R5bGVzLnRzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBFeHRlcm5hbCBkZXBlbmRlbmNpZXNcbiAqL1xuaW1wb3J0IHN0eWxlZCBmcm9tICdAZW1vdGlvbi9zdHlsZWQnO1xuXG4vKipcbiAqIEludGVybmFsIGRlcGVuZGVuY2llc1xuICovXG5pbXBvcnQgeyBIZWFkaW5nIH0gZnJvbSAnLi4vaGVhZGluZyc7XG5pbXBvcnQgeyBDT05GSUcgfSBmcm9tICcuLi91dGlscyc7XG5cbmV4cG9ydCBjb25zdCBDb2xvckhlYWRpbmcgPSBzdHlsZWQoIEhlYWRpbmcgKWBcblx0dGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcblx0bGluZS1oZWlnaHQ6IDI0cHg7XG5cdGZvbnQtd2VpZ2h0OiAkeyBDT05GSUcuZm9udFdlaWdodE1lZGl1bSB9O1xuXHQmJiYge1xuXHRcdGZvbnQtc2l6ZTogMTFweDtcblx0XHRtYXJnaW4tYm90dG9tOiAwO1xuXHR9XG5gO1xuIl19 */"));
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ColorHeading
});
//# sourceMappingURL=styles.cjs.map
