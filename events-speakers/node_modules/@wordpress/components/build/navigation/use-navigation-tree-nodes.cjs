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

// packages/components/src/navigation/use-navigation-tree-nodes.tsx
var use_navigation_tree_nodes_exports = {};
__export(use_navigation_tree_nodes_exports, {
  useNavigationTreeNodes: () => useNavigationTreeNodes
});
module.exports = __toCommonJS(use_navigation_tree_nodes_exports);
var import_element = require("@wordpress/element");
function useNavigationTreeNodes() {
  const [nodes, setNodes] = (0, import_element.useState)({});
  const getNode = (key) => nodes[key];
  const addNode = (key, value) => {
    const {
      children,
      ...newNode
    } = value;
    return setNodes((original) => ({
      ...original,
      [key]: newNode
    }));
  };
  const removeNode = (key) => {
    return setNodes((original) => {
      const {
        [key]: removedNode,
        ...remainingNodes
      } = original;
      return remainingNodes;
    });
  };
  return {
    nodes,
    getNode,
    addNode,
    removeNode
  };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  useNavigationTreeNodes
});
//# sourceMappingURL=use-navigation-tree-nodes.cjs.map
