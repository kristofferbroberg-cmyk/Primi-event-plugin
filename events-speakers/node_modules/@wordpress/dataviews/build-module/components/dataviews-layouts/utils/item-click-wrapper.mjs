// packages/dataviews/src/components/dataviews-layouts/utils/item-click-wrapper.tsx
import { cloneElement } from "@wordpress/element";
import { jsx } from "react/jsx-runtime";
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
    return /* @__PURE__ */ jsx("div", { className, ...extraProps, children });
  }
  if (renderItemLink) {
    const renderedElement = renderItemLink({
      item,
      className: `${className} ${className}--clickable`,
      ...extraProps,
      children
    });
    return cloneElement(renderedElement, {
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
  return /* @__PURE__ */ jsx("div", { ...clickProps, ...extraProps, children });
}
export {
  ItemClickWrapper
};
//# sourceMappingURL=item-click-wrapper.mjs.map
