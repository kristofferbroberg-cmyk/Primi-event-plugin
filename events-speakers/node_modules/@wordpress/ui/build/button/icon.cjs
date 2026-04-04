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

// packages/ui/src/button/icon.tsx
var icon_exports = {};
__export(icon_exports, {
  ButtonIcon: () => ButtonIcon
});
module.exports = __toCommonJS(icon_exports);
var import_element = require("@wordpress/element");
var import_icon = require("../icon/index.cjs");
var import_jsx_runtime = require("react/jsx-runtime");
var ButtonIcon = (0, import_element.forwardRef)(
  function ButtonIcon2({ icon, ...props }, ref) {
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      import_icon.Icon,
      {
        ref,
        icon,
        viewBox: "4 4 16 16",
        size: 16,
        ...props
      }
    );
  }
);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ButtonIcon
});
//# sourceMappingURL=icon.cjs.map
