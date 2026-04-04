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

// packages/components/src/disabled/index.tsx
var disabled_exports = {};
__export(disabled_exports, {
  default: () => disabled_default
});
module.exports = __toCommonJS(disabled_exports);
var import_disabled_styles = require("./styles/disabled-styles.cjs");
var import_utils = require("../utils/index.cjs");
var import_context = __toESM(require("./context.cjs"));
var import_jsx_runtime = require("react/jsx-runtime");
var {
  Consumer,
  Provider
} = import_context.default;
function Disabled({
  className,
  children,
  isDisabled = true,
  ...props
}) {
  const cx = (0, import_utils.useCx)();
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Provider, {
    value: isDisabled,
    children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
      // @ts-ignore Reason: inert is a recent HTML attribute
      inert: isDisabled ? "true" : void 0,
      className: isDisabled ? cx(import_disabled_styles.disabledStyles, className, "components-disabled") : void 0,
      ...props,
      children
    })
  });
}
Disabled.Context = import_context.default;
Disabled.Consumer = Consumer;
var disabled_default = Disabled;
//# sourceMappingURL=index.cjs.map
