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

// packages/components/src/navigation/item/use-navigation-tree-item.tsx
var use_navigation_tree_item_exports = {};
__export(use_navigation_tree_item_exports, {
  useNavigationTreeItem: () => useNavigationTreeItem
});
module.exports = __toCommonJS(use_navigation_tree_item_exports);
var import_element = require("@wordpress/element");
var import_context = require("../context.cjs");
var import_context2 = require("../group/context.cjs");
var import_context3 = require("../menu/context.cjs");
var import_utils = require("../utils.cjs");
var useNavigationTreeItem = (itemId, props) => {
  const {
    activeMenu,
    navigationTree: {
      addItem,
      removeItem
    }
  } = (0, import_context.useNavigationContext)();
  const {
    group
  } = (0, import_context2.useNavigationGroupContext)();
  const {
    menu,
    search
  } = (0, import_context3.useNavigationMenuContext)();
  (0, import_element.useEffect)(() => {
    const isMenuActive = activeMenu === menu;
    const isItemVisible = !search || props.title !== void 0 && (0, import_utils.normalizedSearch)(props.title, search);
    addItem(itemId, {
      ...props,
      group,
      menu,
      _isVisible: isMenuActive && isItemVisible
    });
    return () => {
      removeItem(itemId);
    };
  }, [activeMenu, search]);
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  useNavigationTreeItem
});
//# sourceMappingURL=use-navigation-tree-item.cjs.map
