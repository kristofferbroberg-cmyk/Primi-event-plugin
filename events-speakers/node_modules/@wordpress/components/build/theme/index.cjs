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

// packages/components/src/theme/index.tsx
var theme_exports = {};
__export(theme_exports, {
  default: () => theme_default
});
module.exports = __toCommonJS(theme_exports);
var import_element = require("@wordpress/element");
var import_styles = require("./styles.cjs");
var import_color_algorithms = require("./color-algorithms.cjs");
var import_utils = require("../utils/index.cjs");
var import_jsx_runtime = require("react/jsx-runtime");
function Theme({
  accent,
  background,
  className,
  ...props
}) {
  const cx = (0, import_utils.useCx)();
  const classes = (0, import_element.useMemo)(() => cx(...(0, import_styles.colorVariables)((0, import_color_algorithms.generateThemeVariables)({
    accent,
    background
  })), className), [accent, background, className, cx]);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_styles.Wrapper, {
    className: classes,
    ...props
  });
}
var theme_default = Theme;
//# sourceMappingURL=index.cjs.map
