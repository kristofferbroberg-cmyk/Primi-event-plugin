// packages/components/src/navigation/index.tsx
import clsx from "clsx";
import deprecated from "@wordpress/deprecated";
import { useEffect, useRef, useState } from "@wordpress/element";
import { isRTL } from "@wordpress/i18n";
import { getAnimateClassName } from "../animate/index.mjs";
import { ROOT_MENU } from "./constants.mjs";
import { NavigationContext } from "./context.mjs";
import { NavigationUI } from "./styles/navigation-styles.mjs";
import { useCreateNavigationTree } from "./use-create-navigation-tree.mjs";
import { jsx as _jsx } from "react/jsx-runtime";
var noop = () => {
};
function Navigation({
  activeItem,
  activeMenu = ROOT_MENU,
  children,
  className,
  onActivateMenu = noop
}) {
  const [menu, setMenu] = useState(activeMenu);
  const [slideOrigin, setSlideOrigin] = useState();
  const navigationTree = useCreateNavigationTree();
  const defaultSlideOrigin = isRTL() ? "right" : "left";
  deprecated("wp.components.Navigation (and all subcomponents)", {
    since: "6.8",
    version: "7.1",
    alternative: "wp.components.Navigator"
  });
  const setActiveMenu = (menuId, slideInOrigin = defaultSlideOrigin) => {
    if (!navigationTree.getMenu(menuId)) {
      return;
    }
    setSlideOrigin(slideInOrigin);
    setMenu(menuId);
    onActivateMenu(menuId);
  };
  const isMountedRef = useRef(false);
  useEffect(() => {
    if (!isMountedRef.current) {
      isMountedRef.current = true;
    }
  }, []);
  useEffect(() => {
    if (activeMenu !== menu) {
      setActiveMenu(activeMenu);
    }
  }, [activeMenu]);
  const context = {
    activeItem,
    activeMenu: menu,
    setActiveMenu,
    navigationTree
  };
  const classes = clsx("components-navigation", className);
  const animateClassName = getAnimateClassName({
    type: "slide-in",
    origin: slideOrigin
  });
  return /* @__PURE__ */ _jsx(NavigationUI, {
    className: classes,
    children: /* @__PURE__ */ _jsx("div", {
      className: animateClassName ? clsx({
        [animateClassName]: isMountedRef.current && slideOrigin
      }) : void 0,
      children: /* @__PURE__ */ _jsx(NavigationContext.Provider, {
        value: context,
        children
      })
    }, menu)
  });
}
var navigation_default = Navigation;
export {
  Navigation,
  navigation_default as default
};
//# sourceMappingURL=index.mjs.map
