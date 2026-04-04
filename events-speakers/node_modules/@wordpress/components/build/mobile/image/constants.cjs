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

// packages/components/src/mobile/image/constants.js
var constants_exports = {};
__export(constants_exports, {
  IMAGE_DEFAULT_FOCAL_POINT: () => IMAGE_DEFAULT_FOCAL_POINT
});
module.exports = __toCommonJS(constants_exports);
var IMAGE_DEFAULT_FOCAL_POINT = {
  x: 0.5,
  y: 0.5
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  IMAGE_DEFAULT_FOCAL_POINT
});
//# sourceMappingURL=constants.cjs.map
