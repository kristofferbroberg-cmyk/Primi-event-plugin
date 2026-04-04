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

// packages/components/src/utils/use-deprecated-props.ts
var use_deprecated_props_exports = {};
__export(use_deprecated_props_exports, {
  useDeprecated36pxDefaultSizeProp: () => useDeprecated36pxDefaultSizeProp
});
module.exports = __toCommonJS(use_deprecated_props_exports);
function useDeprecated36pxDefaultSizeProp(props) {
  const {
    __next36pxDefaultSize,
    __next40pxDefaultSize,
    ...otherProps
  } = props;
  return {
    ...otherProps,
    __next40pxDefaultSize: __next40pxDefaultSize ?? __next36pxDefaultSize
  };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  useDeprecated36pxDefaultSizeProp
});
//# sourceMappingURL=use-deprecated-props.cjs.map
