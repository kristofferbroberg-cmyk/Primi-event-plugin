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

// packages/components/src/dropdown/dropdown-content-wrapper.tsx
var dropdown_content_wrapper_exports = {};
__export(dropdown_content_wrapper_exports, {
  DropdownContentWrapper: () => DropdownContentWrapper,
  default: () => dropdown_content_wrapper_default
});
module.exports = __toCommonJS(dropdown_content_wrapper_exports);
var import_context = require("../context/index.cjs");
var import_styles = require("./styles.cjs");
var import_jsx_runtime = require("react/jsx-runtime");
function UnconnectedDropdownContentWrapper(props, forwardedRef) {
  const {
    paddingSize = "small",
    ...derivedProps
  } = (0, import_context.useContextSystem)(props, "DropdownContentWrapper");
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_styles.DropdownContentWrapperDiv, {
    ...derivedProps,
    paddingSize,
    ref: forwardedRef
  });
}
var DropdownContentWrapper = (0, import_context.contextConnect)(UnconnectedDropdownContentWrapper, "DropdownContentWrapper");
var dropdown_content_wrapper_default = DropdownContentWrapper;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  DropdownContentWrapper
});
//# sourceMappingURL=dropdown-content-wrapper.cjs.map
