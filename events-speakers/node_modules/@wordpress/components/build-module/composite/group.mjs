// packages/components/src/composite/group.tsx
import * as Ariakit from "@ariakit/react";
import { forwardRef } from "@wordpress/element";
import { useCompositeContext } from "./context.mjs";
import { jsx as _jsx } from "react/jsx-runtime";
var CompositeGroup2 = forwardRef(function CompositeGroup3(props, ref) {
  const context = useCompositeContext();
  const store = props.store ?? context.store;
  return /* @__PURE__ */ _jsx(Ariakit.CompositeGroup, {
    store,
    ...props,
    ref
  });
});
export {
  CompositeGroup2 as CompositeGroup
};
//# sourceMappingURL=group.mjs.map
