// packages/components/src/navigation/back-button/index.tsx
import clsx from "clsx";
import { forwardRef } from "@wordpress/element";
import { __, isRTL } from "@wordpress/i18n";
import { Icon, chevronLeft, chevronRight } from "@wordpress/icons";
import { useNavigationContext } from "../context.mjs";
import { MenuBackButtonUI } from "../styles/navigation-styles.mjs";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
function UnforwardedNavigationBackButton({
  backButtonLabel,
  className,
  href,
  onClick,
  parentMenu
}, ref) {
  const {
    setActiveMenu,
    navigationTree
  } = useNavigationContext();
  const classes = clsx("components-navigation__back-button", className);
  const parentMenuTitle = parentMenu !== void 0 ? navigationTree.getMenu(parentMenu)?.title : void 0;
  const handleOnClick = (event) => {
    if (typeof onClick === "function") {
      onClick(event);
    }
    const animationDirection = isRTL() ? "left" : "right";
    if (parentMenu && !event.defaultPrevented) {
      setActiveMenu(parentMenu, animationDirection);
    }
  };
  const icon = isRTL() ? chevronRight : chevronLeft;
  return /* @__PURE__ */ _jsxs(MenuBackButtonUI, {
    __next40pxDefaultSize: true,
    className: classes,
    href,
    variant: "tertiary",
    ref,
    onClick: handleOnClick,
    children: [/* @__PURE__ */ _jsx(Icon, {
      icon
    }), backButtonLabel || parentMenuTitle || __("Back")]
  });
}
var NavigationBackButton = forwardRef(UnforwardedNavigationBackButton);
NavigationBackButton.displayName = "NavigationBackButton";
var back_button_default = NavigationBackButton;
export {
  NavigationBackButton,
  back_button_default as default
};
//# sourceMappingURL=index.mjs.map
