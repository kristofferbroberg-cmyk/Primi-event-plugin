// packages/dataviews/src/components/dataform-context/index.tsx
import { createContext } from "@wordpress/element";
import { jsx } from "react/jsx-runtime";
var DataFormContext = createContext({
  fields: []
});
DataFormContext.displayName = "DataFormContext";
function DataFormProvider({
  fields,
  children
}) {
  return /* @__PURE__ */ jsx(DataFormContext.Provider, { value: { fields }, children });
}
var dataform_context_default = DataFormContext;
export {
  DataFormProvider,
  dataform_context_default as default
};
//# sourceMappingURL=index.mjs.map
