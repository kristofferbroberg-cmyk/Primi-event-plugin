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

// packages/components/src/progress-bar/index.tsx
var progress_bar_exports = {};
__export(progress_bar_exports, {
  ProgressBar: () => ProgressBar,
  default: () => progress_bar_default
});
module.exports = __toCommonJS(progress_bar_exports);
var import_i18n = require("@wordpress/i18n");
var import_element = require("@wordpress/element");
var ProgressBarStyled = __toESM(require("./styles.cjs"));
var import_jsx_runtime = require("react/jsx-runtime");
function UnforwardedProgressBar(props, ref) {
  const {
    className,
    value,
    ...progressProps
  } = props;
  const isIndeterminate = !Number.isFinite(value);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(ProgressBarStyled.Track, {
    className,
    children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProgressBarStyled.Indicator, {
      style: {
        "--indicator-width": !isIndeterminate ? `${value}%` : void 0
      },
      isIndeterminate
    }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ProgressBarStyled.ProgressElement, {
      max: 100,
      value,
      "aria-label": (0, import_i18n.__)("Loading \u2026"),
      ref,
      ...progressProps
    })]
  });
}
var ProgressBar = (0, import_element.forwardRef)(UnforwardedProgressBar);
ProgressBar.displayName = "ProgressBar";
var progress_bar_default = ProgressBar;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ProgressBar
});
//# sourceMappingURL=index.cjs.map
