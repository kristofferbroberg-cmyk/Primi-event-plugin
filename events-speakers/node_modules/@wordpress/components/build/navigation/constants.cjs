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

// packages/components/src/navigation/constants.tsx
var constants_exports = {};
__export(constants_exports, {
  ROOT_MENU: () => ROOT_MENU,
  SEARCH_FOCUS_DELAY: () => SEARCH_FOCUS_DELAY
});
module.exports = __toCommonJS(constants_exports);
var ROOT_MENU = "root";
var SEARCH_FOCUS_DELAY = 100;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ROOT_MENU,
  SEARCH_FOCUS_DELAY
});
//# sourceMappingURL=constants.cjs.map
