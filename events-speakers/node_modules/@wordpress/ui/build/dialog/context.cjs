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

// packages/ui/src/dialog/context.tsx
var context_exports = {};
__export(context_exports, {
  DialogValidationProvider: () => DialogValidationProvider,
  useDialogValidationContext: () => useDialogValidationContext
});
module.exports = __toCommonJS(context_exports);
var import_element = require("@wordpress/element");
var import_jsx_runtime = require("react/jsx-runtime");
var VALIDATION_ENABLED = process.env.NODE_ENV !== "production";
var DialogValidationContext = VALIDATION_ENABLED ? (0, import_element.createContext)(null) : null;
function useDialogValidationContextDev() {
  return (0, import_element.useContext)(DialogValidationContext);
}
function useDialogValidationContextProd() {
  return null;
}
var useDialogValidationContext = VALIDATION_ENABLED ? useDialogValidationContextDev : useDialogValidationContextProd;
function DialogValidationProviderDev({
  children
}) {
  const titleElementRef = (0, import_element.useRef)(null);
  const registerTitle = (0, import_element.useCallback)((element) => {
    titleElementRef.current = element;
  }, []);
  const contextValue = (0, import_element.useMemo)(
    () => ({ registerTitle }),
    [registerTitle]
  );
  (0, import_element.useEffect)(() => {
    const titleElement = titleElementRef.current;
    if (!titleElement) {
      throw new Error(
        "Dialog: Missing <Dialog.Title>. For accessibility, every dialog requires a title. If needed, the title can be visually hidden but must not be omitted."
      );
    }
    const textContent = titleElement.textContent?.trim();
    if (!textContent) {
      throw new Error(
        "Dialog: <Dialog.Title> cannot be empty. Provide meaningful text content for the dialog title."
      );
    }
  }, []);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(DialogValidationContext.Provider, { value: contextValue, children });
}
function DialogValidationProviderProd({
  children
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
}
var DialogValidationProvider = VALIDATION_ENABLED ? DialogValidationProviderDev : DialogValidationProviderProd;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  DialogValidationProvider,
  useDialogValidationContext
});
//# sourceMappingURL=context.cjs.map
