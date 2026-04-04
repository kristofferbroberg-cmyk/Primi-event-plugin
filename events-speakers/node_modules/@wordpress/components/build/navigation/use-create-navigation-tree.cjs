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

// packages/components/src/navigation/use-create-navigation-tree.tsx
var use_create_navigation_tree_exports = {};
__export(use_create_navigation_tree_exports, {
  useCreateNavigationTree: () => useCreateNavigationTree
});
module.exports = __toCommonJS(use_create_navigation_tree_exports);
var import_element = require("@wordpress/element");
var import_use_navigation_tree_nodes = require("./use-navigation-tree-nodes.cjs");
var useCreateNavigationTree = () => {
  const {
    nodes: items,
    getNode: getItem,
    addNode: addItem,
    removeNode: removeItem
  } = (0, import_use_navigation_tree_nodes.useNavigationTreeNodes)();
  const {
    nodes: menus,
    getNode: getMenu,
    addNode: addMenu,
    removeNode: removeMenu
  } = (0, import_use_navigation_tree_nodes.useNavigationTreeNodes)();
  const [childMenu, setChildMenu] = (0, import_element.useState)({});
  const getChildMenu = (menu) => childMenu[menu] || [];
  const traverseMenu = (startMenu, callback) => {
    const visited = [];
    let queue = [startMenu];
    let current;
    while (queue.length > 0) {
      current = getMenu(queue.shift());
      if (!current || visited.includes(current.menu)) {
        continue;
      }
      visited.push(current.menu);
      queue = [...queue, ...getChildMenu(current.menu)];
      if (callback(current) === false) {
        break;
      }
    }
  };
  const isMenuEmpty = (menuToCheck) => {
    let isEmpty = true;
    traverseMenu(menuToCheck, (current) => {
      if (!current.isEmpty) {
        isEmpty = false;
        return false;
      }
      return void 0;
    });
    return isEmpty;
  };
  return {
    items,
    getItem,
    addItem,
    removeItem,
    menus,
    getMenu,
    addMenu: (key, value) => {
      setChildMenu((state) => {
        const newState = {
          ...state
        };
        if (!value.parentMenu) {
          return newState;
        }
        if (!newState[value.parentMenu]) {
          newState[value.parentMenu] = [];
        }
        newState[value.parentMenu].push(key);
        return newState;
      });
      addMenu(key, value);
    },
    removeMenu,
    childMenu,
    traverseMenu,
    isMenuEmpty
  };
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  useCreateNavigationTree
});
//# sourceMappingURL=use-create-navigation-tree.cjs.map
