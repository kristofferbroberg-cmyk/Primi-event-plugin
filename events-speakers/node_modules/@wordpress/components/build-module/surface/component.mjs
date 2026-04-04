// packages/components/src/surface/component.tsx
import { contextConnect } from "../context/index.mjs";
import { View } from "../view/index.mjs";
import { useSurface } from "./hook.mjs";
import { jsx as _jsx } from "react/jsx-runtime";
function UnconnectedSurface(props, forwardedRef) {
  const surfaceProps = useSurface(props);
  return /* @__PURE__ */ _jsx(View, {
    ...surfaceProps,
    ref: forwardedRef
  });
}
var Surface = contextConnect(UnconnectedSurface, "Surface");
var component_default = Surface;
export {
  Surface,
  component_default as default
};
//# sourceMappingURL=component.mjs.map
