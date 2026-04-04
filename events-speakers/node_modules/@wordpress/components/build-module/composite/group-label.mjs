// packages/components/src/composite/group-label.tsx
import * as Ariakit from "@ariakit/react";
import { forwardRef } from "@wordpress/element";
import { useCompositeContext } from "./context.mjs";
import { jsx as _jsx } from "react/jsx-runtime";
var CompositeGroupLabel2 = forwardRef(function CompositeGroupLabel3(props, ref) {
  const context = useCompositeContext();
  const store = props.store ?? context.store;
  return /* @__PURE__ */ _jsx(Ariakit.CompositeGroupLabel, {
    store,
    ...props,
    ref
  });
});
export {
  CompositeGroupLabel2 as CompositeGroupLabel
};
//# sourceMappingURL=group-label.mjs.map
