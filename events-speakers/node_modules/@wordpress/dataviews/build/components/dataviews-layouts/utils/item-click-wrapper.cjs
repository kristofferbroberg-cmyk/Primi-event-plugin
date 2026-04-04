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

// packages/dataviews/src/components/dataviews-layouts/utils/item-click-wrapper.tsx
var item_click_wrapper_exports = {};
__export(item_click_wrapper_exports, {
  ItemClickWrapper: () => ItemClickWrapper
});
module.exports = __toCommonJS(item_click_wrapper_exports);
var import_element = require("@wordpress/element");
var import_jsx_runtime = require("react/jsx-runtime");
function getClickableItemProps({
  item,
  isItemClickable,
  onClickItem,
  className
}) {
  if (!isItemClickable(item) || !onClickItem) {
    return { className };
  }
  return {
    className: className ? `${className} ${className}--clickable` : void 0,
    role: "button",
    tabIndex: 0,
    onClick: (event) => {
      event.stopPropagation();
      onClickItem(item);
    },
    onKeyDown: (event) => {
      if (event.key === "Enter" || event.key === "" || event.key === " ") {
        event.stopPropagation();
        onClickItem(item);
      }
    }
  };
}
function ItemClickWrapper({
  item,
  isItemClickable,
  onClickItem,
  renderItemLink,
  className,
  children,
  ...extraProps
}) {
  if (!isItemClickable(item)) {
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className, ...extraProps, children });
  }
  if (renderItemLink) {
    const renderedElement = renderItemLink({
      item,
      className: `${className} ${className}--clickable`,
      ...extraProps,
      children
    });
    return (0, import_element.cloneElement)(renderedElement, {
      onClick: (event) => {
        event.stopPropagation();
        if (renderedElement.props.onClick) {
          renderedElement.props.onClick(event);
        }
      },
      onKeyDown: (event) => {
        if (event.key === "Enter" || event.key === "" || event.key === " ") {
          event.stopPropagation();
          if (renderedElement.props.onKeyDown) {
            renderedElement.props.onKeyDown(event);
          }
        }
      }
    });
  }
  const clickProps = getClickableItemProps({
    item,
    isItemClickable,
    onClickItem,
    className
  });
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { ...clickProps, ...extraProps, children });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ItemClickWrapper
});
//# sourceMappingURL=item-click-wrapper.cjs.map
