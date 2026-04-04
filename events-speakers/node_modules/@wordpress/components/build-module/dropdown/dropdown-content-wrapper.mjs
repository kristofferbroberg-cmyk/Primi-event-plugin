// packages/components/src/dropdown/dropdown-content-wrapper.tsx
import { contextConnect, useContextSystem } from "../context/index.mjs";
import { DropdownContentWrapperDiv } from "./styles.mjs";
import { jsx as _jsx } from "react/jsx-runtime";
function UnconnectedDropdownContentWrapper(props, forwardedRef) {
  const {
    paddingSize = "small",
    ...derivedProps
  } = useContextSystem(props, "DropdownContentWrapper");
  return /* @__PURE__ */ _jsx(DropdownContentWrapperDiv, {
    ...derivedProps,
    paddingSize,
    ref: forwardedRef
  });
}
var DropdownContentWrapper = contextConnect(UnconnectedDropdownContentWrapper, "DropdownContentWrapper");
var dropdown_content_wrapper_default = DropdownContentWrapper;
export {
  DropdownContentWrapper,
  dropdown_content_wrapper_default as default
};
//# sourceMappingURL=dropdown-content-wrapper.mjs.map
