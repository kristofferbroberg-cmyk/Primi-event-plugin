// packages/ui/src/tooltip/provider.tsx
import { Tooltip } from "@base-ui/react/tooltip";
import { jsx } from "react/jsx-runtime";
function Provider({ children, ...props }) {
  return /* @__PURE__ */ jsx(Tooltip.Provider, { ...props, children });
}
export {
  Provider
};
//# sourceMappingURL=provider.mjs.map
