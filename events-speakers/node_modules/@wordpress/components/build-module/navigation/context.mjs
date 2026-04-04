// packages/components/src/navigation/context.tsx
import { createContext, useContext } from "@wordpress/element";
import { ROOT_MENU } from "./constants.mjs";
var noop = () => {
};
var defaultIsEmpty = () => false;
var defaultGetter = () => void 0;
var NavigationContext = createContext({
  activeItem: void 0,
  activeMenu: ROOT_MENU,
  setActiveMenu: noop,
  navigationTree: {
    items: {},
    getItem: defaultGetter,
    addItem: noop,
    removeItem: noop,
    menus: {},
    getMenu: defaultGetter,
    addMenu: noop,
    removeMenu: noop,
    childMenu: {},
    traverseMenu: noop,
    isMenuEmpty: defaultIsEmpty
  }
});
NavigationContext.displayName = "NavigationContext";
var useNavigationContext = () => useContext(NavigationContext);
export {
  NavigationContext,
  useNavigationContext
};
//# sourceMappingURL=context.mjs.map
