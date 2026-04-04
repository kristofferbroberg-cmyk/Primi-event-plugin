"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// packages/components/src/navigation/menu/menu-title-search.tsx
var menu_title_search_exports = {};
__export(menu_title_search_exports, {
  default: () => menu_title_search_default
});
module.exports = __toCommonJS(menu_title_search_exports);
var import_element = require("@wordpress/element");
var import_i18n = require("@wordpress/i18n");
var import_with_spoken_messages = __toESM(require("../../higher-order/with-spoken-messages/index.cjs"));
var import_context = require("./context.cjs");
var import_context2 = require("../context.cjs");
var import_constants = require("../constants.cjs");
var import_search_control = __toESM(require("../../search-control/index.cjs"));
var import_navigation_styles = require("../styles/navigation-styles.cjs");
var import_jsx_runtime = require("react/jsx-runtime");
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
  } = (0, import_context2.useNavigationContext)();
  const {
    menu
  } = (0, import_context.useNavigationMenuContext)();
  const inputRef = (0, import_element.useRef)(null);
  (0, import_element.useEffect)(() => {
    const delayedFocus = setTimeout(() => {
      inputRef.current?.focus();
    }, import_constants.SEARCH_FOCUS_DELAY);
    return () => {
      clearTimeout(delayedFocus);
    };
  }, []);
  (0, import_element.useEffect)(() => {
    if (!search) {
      return;
    }
    const count = Object.values(items).filter((item) => item._isVisible).length;
    const resultsFoundMessage = (0, import_i18n.sprintf)(
      /* translators: %d: number of results. */
      (0, import_i18n._n)("%d result found.", "%d results found.", count),
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
  const placeholder = (0, import_i18n.sprintf)(
    /* translators: placeholder for menu search box. %s: menu title */
    (0, import_i18n.__)("Search %s"),
    title?.toLowerCase() || ""
  ).trim();
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_navigation_styles.MenuTitleSearchControlWrapper, {
    children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_search_control.default, {
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
var menu_title_search_default = (0, import_with_spoken_messages.default)(MenuTitleSearch);
//# sourceMappingURL=menu-title-search.cjs.map
