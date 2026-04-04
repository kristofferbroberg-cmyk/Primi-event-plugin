// packages/components/src/navigation/menu/index.tsx
import clsx from "clsx";
import { useState } from "@wordpress/element";
import { ROOT_MENU } from "../constants.mjs";
import { NavigationMenuContext } from "./context.mjs";
import { useNavigationContext } from "../context.mjs";
import { useNavigationTreeMenu } from "./use-navigation-tree-menu.mjs";
import NavigationBackButton from "../back-button/index.mjs";
import NavigationMenuTitle from "./menu-title.mjs";
import NavigationSearchNoResultsFound from "./search-no-results-found.mjs";
import { NavigableMenu } from "../../navigable-container/index.mjs";
import { MenuUI } from "../styles/navigation-styles.mjs";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
function NavigationMenu(props) {
  const {
    backButtonLabel,
    children,
    className,
    hasSearch,
    menu = ROOT_MENU,
    onBackButtonClick,
    onSearch: setControlledSearch,
    parentMenu,
    search: controlledSearch,
    isSearchDebouncing,
    title,
    titleAction
  } = props;
  const [uncontrolledSearch, setUncontrolledSearch] = useState("");
  useNavigationTreeMenu(props);
  const {
    activeMenu
  } = useNavigationContext();
  const context = {
    menu,
    search: uncontrolledSearch
  };
  if (activeMenu !== menu) {
    return /* @__PURE__ */ _jsx(NavigationMenuContext.Provider, {
      value: context,
      children
    });
  }
  const isControlledSearch = !!setControlledSearch;
  const search = isControlledSearch ? controlledSearch : uncontrolledSearch;
  const onSearch = isControlledSearch ? setControlledSearch : setUncontrolledSearch;
  const menuTitleId = `components-navigation__menu-title-${menu}`;
  const classes = clsx("components-navigation__menu", className);
  return /* @__PURE__ */ _jsx(NavigationMenuContext.Provider, {
    value: context,
    children: /* @__PURE__ */ _jsxs(MenuUI, {
      className: classes,
      children: [(parentMenu || onBackButtonClick) && /* @__PURE__ */ _jsx(NavigationBackButton, {
        backButtonLabel,
        parentMenu,
        onClick: onBackButtonClick
      }), title && /* @__PURE__ */ _jsx(NavigationMenuTitle, {
        hasSearch,
        onSearch,
        search,
        title,
        titleAction
      }), /* @__PURE__ */ _jsx(NavigableMenu, {
        children: /* @__PURE__ */ _jsxs("ul", {
          "aria-labelledby": menuTitleId,
          children: [children, search && !isSearchDebouncing && /* @__PURE__ */ _jsx(NavigationSearchNoResultsFound, {
            search
          })]
        })
      })]
    })
  });
}
var menu_default = NavigationMenu;
export {
  NavigationMenu,
  menu_default as default
};
//# sourceMappingURL=index.mjs.map
