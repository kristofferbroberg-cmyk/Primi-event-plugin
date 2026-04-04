// packages/components/src/divider/component.tsx
import * as Ariakit from "@ariakit/react";
import { contextConnect, useContextSystem } from "../context/index.mjs";
import { DividerView } from "./styles.mjs";
import { jsx as _jsx } from "react/jsx-runtime";
function UnconnectedDivider(props, forwardedRef) {
  const contextProps = useContextSystem(props, "Divider");
  return /* @__PURE__ */ _jsx(Ariakit.Separator, {
    render: /* @__PURE__ */ _jsx(DividerView, {}),
    ...contextProps,
    ref: forwardedRef
  });
}
var Divider = contextConnect(UnconnectedDivider, "Divider");
var component_default = Divider;
export {
  Divider,
  component_default as default
};
//# sourceMappingURL=component.mjs.map
