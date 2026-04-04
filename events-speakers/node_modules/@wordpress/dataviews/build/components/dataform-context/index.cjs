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

// packages/dataviews/src/components/dataform-context/index.tsx
var dataform_context_exports = {};
__export(dataform_context_exports, {
  DataFormProvider: () => DataFormProvider,
  default: () => dataform_context_default
});
module.exports = __toCommonJS(dataform_context_exports);
var import_element = require("@wordpress/element");
var import_jsx_runtime = require("react/jsx-runtime");
var DataFormContext = (0, import_element.createContext)({
  fields: []
});
DataFormContext.displayName = "DataFormContext";
function DataFormProvider({
  fields,
  children
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DataFormContext.Provider, { value: { fields }, children });
}
var dataform_context_default = DataFormContext;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  DataFormProvider
});
//# sourceMappingURL=index.cjs.map
