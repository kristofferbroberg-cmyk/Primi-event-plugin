// packages/components/src/item-group/item/component.tsx
import { useItem } from "./hook.mjs";
import { contextConnect } from "../../context/index.mjs";
import { View } from "../../view/index.mjs";
import { jsx as _jsx } from "react/jsx-runtime";
function UnconnectedItem(props, forwardedRef) {
  const {
    role,
    wrapperClassName,
    ...otherProps
  } = useItem(props);
  return /* @__PURE__ */ _jsx("div", {
    role,
    className: wrapperClassName,
    children: /* @__PURE__ */ _jsx(View, {
      ...otherProps,
      ref: forwardedRef
    })
  });
}
var Item = contextConnect(UnconnectedItem, "Item");
var component_default = Item;
export {
  Item,
  component_default as default
};
//# sourceMappingURL=component.mjs.map
