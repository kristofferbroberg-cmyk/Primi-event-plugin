"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// packages/components/src/navigation/menu/use-navigation-tree-menu.tsx
var use_navigation_tree_menu_exports = {};
__export(use_navigation_tree_menu_exports, {
  useNavigationTreeMenu: () => useNavigationTreeMenu
});
module.exports = __toCommonJS(use_navigation_tree_menu_exports);
var import_element = require("@wordpress/element");
var import_context = require("../context.cjs");
var import_constants = require("../constants.cjs");
var useNavigationTreeMenu = (props) => {
  const {
    navigationTree: {
      addMenu,
      removeMenu
    }
  } = (0, import_context.useNavigationContext)();
  const key = props.menu || import_constants.ROOT_MENU;
  (0, import_element.useEffect)(() => {
    addMenu(key, {
      ...props,
      menu: key
    });
    return () => {
      removeMenu(key);
    };
  }, []);
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  useNavigationTreeMenu
});
//# sourceMappingURL=use-navigation-tree-menu.cjs.map
