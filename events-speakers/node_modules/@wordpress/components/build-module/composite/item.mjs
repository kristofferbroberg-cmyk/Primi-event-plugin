// packages/components/src/composite/item.tsx
import * as Ariakit from "@ariakit/react";
import { forwardRef } from "@wordpress/element";
import { useCompositeContext } from "./context.mjs";
import { jsx as _jsx } from "react/jsx-runtime";
var CompositeItem2 = forwardRef(function CompositeItem3(props, ref) {
  const context = useCompositeContext();
  const store = props.store ?? context.store;
  return /* @__PURE__ */ _jsx(Ariakit.CompositeItem, {
    store,
    ...props,
    ref
  });
});
export {
  CompositeItem2 as CompositeItem
};
//# sourceMappingURL=item.mjs.map
