// packages/components/src/z-stack/component.tsx
import { isValidElement } from "@wordpress/element";
import { getValidChildren } from "../utils/get-valid-children.mjs";
import { contextConnect, useContextSystem } from "../context/index.mjs";
import { ZStackView, ZStackChildView } from "./styles.mjs";
import { jsx as _jsx } from "react/jsx-runtime";
function UnconnectedZStack(props, forwardedRef) {
  const {
    children,
    className,
    isLayered = true,
    isReversed = false,
    offset = 0,
    ...otherProps
  } = useContextSystem(props, "ZStack");
  const validChildren = getValidChildren(children);
  const childrenLastIndex = validChildren.length - 1;
  const clonedChildren = validChildren.map((child, index) => {
    const zIndex = isReversed ? childrenLastIndex - index : index;
    const offsetAmount = isLayered ? offset * index : offset;
    const key = isValidElement(child) ? child.key : index;
    return /* @__PURE__ */ _jsx(ZStackChildView, {
      offsetAmount,
      zIndex,
      children: child
    }, key);
  });
  return /* @__PURE__ */ _jsx(ZStackView, {
    ...otherProps,
    className,
    isLayered,
    ref: forwardedRef,
    children: clonedChildren
  });
}
var ZStack = contextConnect(UnconnectedZStack, "ZStack");
var component_default = ZStack;
export {
  ZStack,
  component_default as default
};
//# sourceMappingURL=component.mjs.map
