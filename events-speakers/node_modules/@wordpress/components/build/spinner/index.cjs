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

// packages/components/src/spinner/index.tsx
var spinner_exports = {};
__export(spinner_exports, {
  Spinner: () => Spinner,
  UnforwardedSpinner: () => UnforwardedSpinner,
  default: () => spinner_default
});
module.exports = __toCommonJS(spinner_exports);
var import_clsx = __toESM(require("clsx"));
var import_styles = require("./styles.cjs");
var import_element = require("@wordpress/element");
var import_jsx_runtime = require("react/jsx-runtime");
function UnforwardedSpinner({
  className,
  ...props
}, forwardedRef) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_styles.StyledSpinner, {
    className: (0, import_clsx.default)("components-spinner", className),
    viewBox: "0 0 100 100",
    width: "16",
    height: "16",
    xmlns: "http://www.w3.org/2000/svg",
    role: "presentation",
    focusable: "false",
    ...props,
    ref: forwardedRef,
    children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_styles.SpinnerTrack, {
      cx: "50",
      cy: "50",
      r: "50",
      vectorEffect: "non-scaling-stroke"
    }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_styles.SpinnerIndicator, {
      d: "m 50 0 a 50 50 0 0 1 50 50",
      vectorEffect: "non-scaling-stroke"
    })]
  });
}
var Spinner = (0, import_element.forwardRef)(UnforwardedSpinner);
Spinner.displayName = "Spinner";
var spinner_default = Spinner;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Spinner,
  UnforwardedSpinner
});
//# sourceMappingURL=index.cjs.map
