"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// packages/components/src/disabled/styles/disabled-styles.tsx
var disabled_styles_exports = {};
__export(disabled_styles_exports, {
  disabledStyles: () => disabledStyles
});
module.exports = __toCommonJS(disabled_styles_exports);
var import_react = require("@emotion/react");
function _EMOTION_STRINGIFIED_CSS_ERROR__() {
  return "You have tried to stringify object returned from `css` function. It isn't supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop).";
}
var disabledStyles = process.env.NODE_ENV === "production" ? {
  name: "u2jump",
  styles: "position:relative;pointer-events:none;&::after{content:'';position:absolute;top:0;right:0;bottom:0;left:0;}*{pointer-events:none;}"
} : {
  name: "iqemdn-disabledStyles",
  styles: "position:relative;pointer-events:none;&::after{content:'';position:absolute;top:0;right:0;bottom:0;left:0;}*{pointer-events:none;};label:disabledStyles;/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImRpc2FibGVkLXN0eWxlcy50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBS2lDIiwiZmlsZSI6ImRpc2FibGVkLXN0eWxlcy50c3giLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEV4dGVybmFsIGRlcGVuZGVuY2llc1xuICovXG5pbXBvcnQgeyBjc3MgfSBmcm9tICdAZW1vdGlvbi9yZWFjdCc7XG5cbmV4cG9ydCBjb25zdCBkaXNhYmxlZFN0eWxlcyA9IGNzc2Bcblx0cG9zaXRpb246IHJlbGF0aXZlO1xuXHRwb2ludGVyLWV2ZW50czogbm9uZTtcblxuXHQmOjphZnRlciB7XG5cdFx0Y29udGVudDogJyc7XG5cdFx0cG9zaXRpb246IGFic29sdXRlO1xuXHRcdHRvcDogMDtcblx0XHRyaWdodDogMDtcblx0XHRib3R0b206IDA7XG5cdFx0bGVmdDogMDtcblx0fVxuXG5cdC8vIEFsc28gbWFrZSBuZXN0ZWQgYmxvY2tzIHVuc2VsZWN0YWJsZS5cblx0KiB7XG5cdFx0cG9pbnRlci1ldmVudHM6IG5vbmU7XG5cdH1cbmA7XG4iXX0= */",
  toString: _EMOTION_STRINGIFIED_CSS_ERROR__
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  disabledStyles
});
//# sourceMappingURL=disabled-styles.cjs.map
