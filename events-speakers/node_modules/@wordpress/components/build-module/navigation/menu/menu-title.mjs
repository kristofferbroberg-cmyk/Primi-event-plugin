// packages/components/src/navigation/menu/menu-title.tsx
import { useRef, useState } from "@wordpress/element";
import { __, sprintf } from "@wordpress/i18n";
import { Icon, search as searchIcon } from "@wordpress/icons";
import { getAnimateClassName } from "../../animate/index.mjs";
import Button from "../../button/index.mjs";
import MenuTitleSearch from "./menu-title-search.mjs";
import { GroupTitleUI, MenuTitleActionsUI, MenuTitleUI } from "../styles/navigation-styles.mjs";
import { useNavigationMenuContext } from "./context.mjs";
import { SEARCH_FOCUS_DELAY } from "../constants.mjs";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
function NavigationMenuTitle({
  hasSearch,
  onSearch,
  search,
  title,
  titleAction
}) {
  const [isSearching, setIsSearching] = useState(false);
  const {
    menu
  } = useNavigationMenuContext();
  const searchButtonRef = useRef(null);
  if (!title) {
    return null;
  }
  const onCloseSearch = () => {
    setIsSearching(false);
    setTimeout(() => {
      searchButtonRef.current?.focus();
    }, SEARCH_FOCUS_DELAY);
  };
  const menuTitleId = `components-navigation__menu-title-${menu}`;
  const searchButtonLabel = sprintf(__("Search in %s"), title);
  return /* @__PURE__ */ _jsxs(MenuTitleUI, {
    className: "components-navigation__menu-title",
    children: [!isSearching && /* @__PURE__ */ _jsxs(GroupTitleUI, {
      as: "h2",
      className: "components-navigation__menu-title-heading",
      level: 3,
      children: [/* @__PURE__ */ _jsx("span", {
        id: menuTitleId,
        children: title
      }), (hasSearch || titleAction) && /* @__PURE__ */ _jsxs(MenuTitleActionsUI, {
        children: [titleAction, hasSearch && /* @__PURE__ */ _jsx(Button, {
          size: "small",
          variant: "tertiary",
          label: searchButtonLabel,
          onClick: () => setIsSearching(true),
          ref: searchButtonRef,
          children: /* @__PURE__ */ _jsx(Icon, {
            icon: searchIcon
          })
        })]
      })]
    }), isSearching && /* @__PURE__ */ _jsx("div", {
      className: getAnimateClassName({
        type: "slide-in",
        origin: "left"
      }),
      children: /* @__PURE__ */ _jsx(MenuTitleSearch, {
        onCloseSearch,
        onSearch,
        search,
        title
      })
    })]
  });
}
export {
  NavigationMenuTitle as default
};
//# sourceMappingURL=menu-title.mjs.map
