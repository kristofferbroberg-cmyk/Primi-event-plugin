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

// packages/components/src/navigation/group/context.tsx
var context_exports = {};
__export(context_exports, {
  NavigationGroupContext: () => NavigationGroupContext,
  useNavigationGroupContext: () => useNavigationGroupContext
});
module.exports = __toCommonJS(context_exports);
var import_element = require("@wordpress/element");
var NavigationGroupContext = (0, import_element.createContext)({
  group: void 0
});
NavigationGroupContext.displayName = "NavigationGroupContext";
var useNavigationGroupContext = () => (0, import_element.useContext)(NavigationGroupContext);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  NavigationGroupContext,
  useNavigationGroupContext
});
//# sourceMappingURL=context.cjs.map
