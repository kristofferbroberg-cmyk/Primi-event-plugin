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

// packages/icons/src/library/home-button.tsx
var home_button_exports = {};
__export(home_button_exports, {
  default: () => home_button_default
});
module.exports = __toCommonJS(home_button_exports);
var import_primitives = require("@wordpress/primitives");
var import_jsx_runtime = require("react/jsx-runtime");
var home_button_default = /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_primitives.SVG, { xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 24 24", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_primitives.Path, { fillRule: "evenodd", clipRule: "evenodd", d: "M4.25 7A2.75 2.75 0 0 1 7 4.25h10A2.75 2.75 0 0 1 19.75 7v10A2.75 2.75 0 0 1 17 19.75H7A2.75 2.75 0 0 1 4.25 17V7ZM7 5.75c-.69 0-1.25.56-1.25 1.25v10c0 .69.56 1.25 1.25 1.25h10c.69 0 1.25-.56 1.25-1.25V7c0-.69-.56-1.25-1.25-1.25H7Z" }) });
//# sourceMappingURL=home-button.cjs.map
