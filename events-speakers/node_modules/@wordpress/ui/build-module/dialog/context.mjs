// packages/ui/src/dialog/context.tsx
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef
} from "@wordpress/element";
import { Fragment, jsx } from "react/jsx-runtime";
var VALIDATION_ENABLED = process.env.NODE_ENV !== "production";
var DialogValidationContext = VALIDATION_ENABLED ? createContext(null) : null;
function useDialogValidationContextDev() {
  return useContext(DialogValidationContext);
}
function useDialogValidationContextProd() {
  return null;
}
var useDialogValidationContext = VALIDATION_ENABLED ? useDialogValidationContextDev : useDialogValidationContextProd;
function DialogValidationProviderDev({
  children
}) {
  const titleElementRef = useRef(null);
  const registerTitle = useCallback((element) => {
    titleElementRef.current = element;
  }, []);
  const contextValue = useMemo(
    () => ({ registerTitle }),
    [registerTitle]
  );
  useEffect(() => {
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
  return /* @__PURE__ */ jsx(DialogValidationContext.Provider, { value: contextValue, children });
}
function DialogValidationProviderProd({
  children
}) {
  return /* @__PURE__ */ jsx(Fragment, { children });
}
var DialogValidationProvider = VALIDATION_ENABLED ? DialogValidationProviderDev : DialogValidationProviderProd;
export {
  DialogValidationProvider,
  useDialogValidationContext
};
//# sourceMappingURL=context.mjs.map
