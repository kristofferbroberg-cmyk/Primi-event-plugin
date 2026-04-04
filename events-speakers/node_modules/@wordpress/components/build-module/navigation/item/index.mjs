// packages/components/src/navigation/item/index.tsx
import clsx from "clsx";
import { Icon, chevronLeft, chevronRight } from "@wordpress/icons";
import { isRTL } from "@wordpress/i18n";
import Button from "../../button/index.mjs";
import { useNavigationContext } from "../context.mjs";
import { ItemUI, ItemIconUI } from "../styles/navigation-styles.mjs";
import NavigationItemBaseContent from "./base-content.mjs";
import NavigationItemBase from "./base.mjs";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
var noop = () => {
};
function NavigationItem(props) {
  const {
    badge,
    children,
    className,
    href,
    item,
    navigateToMenu,
    onClick = noop,
    title,
    icon,
    hideIfTargetMenuEmpty,
    isText,
    ...restProps
  } = props;
  const {
    activeItem,
    setActiveMenu,
    navigationTree: {
      isMenuEmpty
    }
  } = useNavigationContext();
  if (hideIfTargetMenuEmpty && navigateToMenu && isMenuEmpty(navigateToMenu)) {
    return null;
  }
  const isActive = item && activeItem === item;
  const classes = clsx(className, {
    "is-active": isActive
  });
  const onItemClick = (event) => {
    if (navigateToMenu) {
      setActiveMenu(navigateToMenu);
    }
    onClick(event);
  };
  const navigationIcon = isRTL() ? chevronLeft : chevronRight;
  const baseProps = children ? props : {
    ...props,
    onClick: void 0
  };
  const itemProps = isText ? restProps : {
    as: Button,
    __next40pxDefaultSize: "as" in restProps ? restProps.as === void 0 : true,
    href,
    onClick: onItemClick,
    "aria-current": isActive ? "page" : void 0,
    ...restProps
  };
  return /* @__PURE__ */ _jsx(NavigationItemBase, {
    ...baseProps,
    className: classes,
    children: children || /* @__PURE__ */ _jsxs(ItemUI, {
      ...itemProps,
      children: [icon && /* @__PURE__ */ _jsx(ItemIconUI, {
        children: /* @__PURE__ */ _jsx(Icon, {
          icon
        })
      }), /* @__PURE__ */ _jsx(NavigationItemBaseContent, {
        title,
        badge
      }), navigateToMenu && /* @__PURE__ */ _jsx(Icon, {
        icon: navigationIcon
      })]
    })
  });
}
var item_default = NavigationItem;
export {
  NavigationItem,
  item_default as default
};
//# sourceMappingURL=index.mjs.map
