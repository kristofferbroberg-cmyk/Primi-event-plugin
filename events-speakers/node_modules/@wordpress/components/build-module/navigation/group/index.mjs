// packages/components/src/navigation/group/index.tsx
import clsx from "clsx";
import { useState } from "@wordpress/element";
import { NavigationGroupContext } from "./context.mjs";
import { GroupTitleUI } from "../styles/navigation-styles.mjs";
import { useNavigationContext } from "../context.mjs";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
var uniqueId = 0;
function NavigationGroup({
  children,
  className,
  title
}) {
  const [groupId] = useState(`group-${++uniqueId}`);
  const {
    navigationTree: {
      items
    }
  } = useNavigationContext();
  const context = {
    group: groupId
  };
  if (!Object.values(items).some((item) => item.group === groupId && item._isVisible)) {
    return /* @__PURE__ */ _jsx(NavigationGroupContext.Provider, {
      value: context,
      children
    });
  }
  const groupTitleId = `components-navigation__group-title-${groupId}`;
  const classes = clsx("components-navigation__group", className);
  return /* @__PURE__ */ _jsx(NavigationGroupContext.Provider, {
    value: context,
    children: /* @__PURE__ */ _jsxs("li", {
      className: classes,
      children: [title && /* @__PURE__ */ _jsx(GroupTitleUI, {
        className: "components-navigation__group-title",
        id: groupTitleId,
        level: 3,
        children: title
      }), /* @__PURE__ */ _jsx("ul", {
        "aria-labelledby": groupTitleId,
        role: "group",
        children
      })]
    })
  });
}
var group_default = NavigationGroup;
export {
  NavigationGroup,
  group_default as default
};
//# sourceMappingURL=index.mjs.map
