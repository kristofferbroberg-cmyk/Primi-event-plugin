// packages/components/src/navigation/item/base.tsx
import clsx from "clsx";
import { useState } from "@wordpress/element";
import { useNavigationContext } from "../context.mjs";
import { useNavigationTreeItem } from "./use-navigation-tree-item.mjs";
import { ItemBaseUI } from "../styles/navigation-styles.mjs";
import { jsx as _jsx } from "react/jsx-runtime";
var uniqueId = 0;
function NavigationItemBase(props) {
  const {
    children,
    className,
    title,
    href,
    ...restProps
  } = props;
  const [itemId] = useState(`item-${++uniqueId}`);
  useNavigationTreeItem(itemId, props);
  const {
    navigationTree
  } = useNavigationContext();
  if (!navigationTree.getItem(itemId)?._isVisible) {
    return null;
  }
  const classes = clsx("components-navigation__item", className);
  return /* @__PURE__ */ _jsx(ItemBaseUI, {
    className: classes,
    ...restProps,
    children
  });
}
export {
  NavigationItemBase as default
};
//# sourceMappingURL=base.mjs.map
