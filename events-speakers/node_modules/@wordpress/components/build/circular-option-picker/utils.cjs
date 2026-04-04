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

// packages/components/src/circular-option-picker/utils.tsx
var utils_exports = {};
__export(utils_exports, {
  getComputeCircularOptionPickerCommonProps: () => getComputeCircularOptionPickerCommonProps
});
module.exports = __toCommonJS(utils_exports);
var import_i18n = require("@wordpress/i18n");
function getComputeCircularOptionPickerCommonProps(asButtons, loop, ariaLabel, ariaLabelledby) {
  const metaProps = asButtons ? {
    asButtons: true
  } : {
    asButtons: false,
    loop
  };
  const labelProps = {
    "aria-labelledby": ariaLabelledby,
    "aria-label": ariaLabelledby ? void 0 : ariaLabel || (0, import_i18n.__)("Custom color picker")
  };
  return {
    metaProps,
    labelProps
  };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getComputeCircularOptionPickerCommonProps
});
//# sourceMappingURL=utils.cjs.map
