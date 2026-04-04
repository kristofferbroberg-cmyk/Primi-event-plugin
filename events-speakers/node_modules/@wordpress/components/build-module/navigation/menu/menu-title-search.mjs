// packages/components/src/navigation/menu/menu-title-search.tsx
import { useEffect, useRef } from "@wordpress/element";
import { __, _n, sprintf } from "@wordpress/i18n";
import withSpokenMessages from "../../higher-order/with-spoken-messages/index.mjs";
import { useNavigationMenuContext } from "./context.mjs";
import { useNavigationContext } from "../context.mjs";
import { SEARCH_FOCUS_DELAY } from "../constants.mjs";
import SearchControl from "../../search-control/index.mjs";
import { MenuTitleSearchControlWrapper } from "../styles/navigation-styles.mjs";
import { jsx as _jsx } from "react/jsx-runtime";
function MenuTitleSearch({
  debouncedSpeak,
  onCloseSearch,
  onSearch,
  search,
  title
}) {
  const {
    navigationTree: {
      items
    }
  } = useNavigationContext();
  const {
    menu
  } = useNavigationMenuContext();
  const inputRef = useRef(null);
  useEffect(() => {
    const delayedFocus = setTimeout(() => {
      inputRef.current?.focus();
    }, SEARCH_FOCUS_DELAY);
    return () => {
      clearTimeout(delayedFocus);
    };
  }, []);
  useEffect(() => {
    if (!search) {
      return;
    }
    const count = Object.values(items).filter((item) => item._isVisible).length;
    const resultsFoundMessage = sprintf(
      /* translators: %d: number of results. */
      _n("%d result found.", "%d results found.", count),
      count
    );
    debouncedSpeak(resultsFoundMessage);
  }, [items, search]);
  const onClose = () => {
    onSearch?.("");
    onCloseSearch();
  };
  const onKeyDown = (event) => {
    if (event.code === "Escape" && !event.defaultPrevented) {
      event.preventDefault();
      onClose();
    }
  };
  const inputId = `components-navigation__menu-title-search-${menu}`;
  const placeholder = sprintf(
    /* translators: placeholder for menu search box. %s: menu title */
    __("Search %s"),
    title?.toLowerCase() || ""
  ).trim();
  return /* @__PURE__ */ _jsx(MenuTitleSearchControlWrapper, {
    children: /* @__PURE__ */ _jsx(SearchControl, {
      className: "components-navigation__menu-search-input",
      id: inputId,
      onChange: (value) => onSearch?.(value),
      onKeyDown,
      placeholder,
      onClose,
      ref: inputRef,
      value: search
    })
  });
}
var menu_title_search_default = withSpokenMessages(MenuTitleSearch);
export {
  menu_title_search_default as default
};
//# sourceMappingURL=menu-title-search.mjs.map
