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

// packages/components/src/flex/flex/hook.ts
var hook_exports = {};
__export(hook_exports, {
  useFlex: () => useFlex
});
module.exports = __toCommonJS(hook_exports);
var import_react = require("@emotion/react");
var import_element = require("@wordpress/element");
var import_deprecated = __toESM(require("@wordpress/deprecated"));
var import_context = require("../../context/index.cjs");
var import_use_responsive_value = require("../../utils/use-responsive-value.cjs");
var import_space = require("../../utils/space.cjs");
var styles = __toESM(require("../styles.cjs"));
var import_utils = require("../../utils/index.cjs");
function useDeprecatedProps(props) {
  const {
    isReversed,
    ...otherProps
  } = props;
  if (typeof isReversed !== "undefined") {
    (0, import_deprecated.default)("Flex isReversed", {
      alternative: 'Flex direction="row-reverse" or "column-reverse"',
      since: "5.9"
    });
    return {
      ...otherProps,
      direction: isReversed ? "row-reverse" : "row"
    };
  }
  return otherProps;
}
function useFlex(props) {
  const {
    align,
    className,
    direction: directionProp = "row",
    expanded = true,
    gap = 2,
    justify = "space-between",
    wrap = false,
    ...otherProps
  } = (0, import_context.useContextSystem)(useDeprecatedProps(props), "Flex");
  const directionAsArray = Array.isArray(directionProp) ? directionProp : [directionProp];
  const direction = (0, import_use_responsive_value.useResponsiveValue)(directionAsArray);
  const isColumn = typeof direction === "string" && !!direction.includes("column");
  const cx = (0, import_utils.useCx)();
  const classes = (0, import_element.useMemo)(() => {
    const base = /* @__PURE__ */ (0, import_react.css)({
      alignItems: align ?? (isColumn ? "normal" : "center"),
      flexDirection: direction,
      flexWrap: wrap ? "wrap" : void 0,
      gap: (0, import_space.space)(gap),
      justifyContent: justify,
      height: isColumn && expanded ? "100%" : void 0,
      width: !isColumn && expanded ? "100%" : void 0
    }, process.env.NODE_ENV === "production" ? "" : ";label:base;", process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImhvb2sudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBZ0VlIiwiZmlsZSI6Imhvb2sudHMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEV4dGVybmFsIGRlcGVuZGVuY2llc1xuICovXG5pbXBvcnQgeyBjc3MgfSBmcm9tICdAZW1vdGlvbi9yZWFjdCc7XG5cbi8qKlxuICogV29yZFByZXNzIGRlcGVuZGVuY2llc1xuICovXG5pbXBvcnQgeyB1c2VNZW1vIH0gZnJvbSAnQHdvcmRwcmVzcy9lbGVtZW50JztcbmltcG9ydCBkZXByZWNhdGVkIGZyb20gJ0B3b3JkcHJlc3MvZGVwcmVjYXRlZCc7XG5cbi8qKlxuICogSW50ZXJuYWwgZGVwZW5kZW5jaWVzXG4gKi9cbmltcG9ydCB0eXBlIHsgV29yZFByZXNzQ29tcG9uZW50UHJvcHMgfSBmcm9tICcuLi8uLi9jb250ZXh0JztcbmltcG9ydCB7IHVzZUNvbnRleHRTeXN0ZW0gfSBmcm9tICcuLi8uLi9jb250ZXh0JztcbmltcG9ydCB7IHVzZVJlc3BvbnNpdmVWYWx1ZSB9IGZyb20gJy4uLy4uL3V0aWxzL3VzZS1yZXNwb25zaXZlLXZhbHVlJztcbmltcG9ydCB7IHNwYWNlIH0gZnJvbSAnLi4vLi4vdXRpbHMvc3BhY2UnO1xuaW1wb3J0ICogYXMgc3R5bGVzIGZyb20gJy4uL3N0eWxlcyc7XG5pbXBvcnQgeyB1c2VDeCB9IGZyb20gJy4uLy4uL3V0aWxzJztcbmltcG9ydCB0eXBlIHsgRmxleFByb3BzIH0gZnJvbSAnLi4vdHlwZXMnO1xuXG5mdW5jdGlvbiB1c2VEZXByZWNhdGVkUHJvcHMoXG5cdHByb3BzOiBXb3JkUHJlc3NDb21wb25lbnRQcm9wczwgRmxleFByb3BzLCAnZGl2JyA+XG4pOiBPbWl0PCB0eXBlb2YgcHJvcHMsICdpc1JldmVyc2VkJyA+IHtcblx0Y29uc3QgeyBpc1JldmVyc2VkLCAuLi5vdGhlclByb3BzIH0gPSBwcm9wcztcblxuXHRpZiAoIHR5cGVvZiBpc1JldmVyc2VkICE9PSAndW5kZWZpbmVkJyApIHtcblx0XHRkZXByZWNhdGVkKCAnRmxleCBpc1JldmVyc2VkJywge1xuXHRcdFx0YWx0ZXJuYXRpdmU6ICdGbGV4IGRpcmVjdGlvbj1cInJvdy1yZXZlcnNlXCIgb3IgXCJjb2x1bW4tcmV2ZXJzZVwiJyxcblx0XHRcdHNpbmNlOiAnNS45Jyxcblx0XHR9ICk7XG5cdFx0cmV0dXJuIHtcblx0XHRcdC4uLm90aGVyUHJvcHMsXG5cdFx0XHRkaXJlY3Rpb246IGlzUmV2ZXJzZWQgPyAncm93LXJldmVyc2UnIDogJ3JvdycsXG5cdFx0fTtcblx0fVxuXG5cdHJldHVybiBvdGhlclByb3BzO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdXNlRmxleCggcHJvcHM6IFdvcmRQcmVzc0NvbXBvbmVudFByb3BzPCBGbGV4UHJvcHMsICdkaXYnID4gKSB7XG5cdGNvbnN0IHtcblx0XHRhbGlnbixcblx0XHRjbGFzc05hbWUsXG5cdFx0ZGlyZWN0aW9uOiBkaXJlY3Rpb25Qcm9wID0gJ3JvdycsXG5cdFx0ZXhwYW5kZWQgPSB0cnVlLFxuXHRcdGdhcCA9IDIsXG5cdFx0anVzdGlmeSA9ICdzcGFjZS1iZXR3ZWVuJyxcblx0XHR3cmFwID0gZmFsc2UsXG5cdFx0Li4ub3RoZXJQcm9wc1xuXHR9ID0gdXNlQ29udGV4dFN5c3RlbSggdXNlRGVwcmVjYXRlZFByb3BzKCBwcm9wcyApLCAnRmxleCcgKTtcblxuXHRjb25zdCBkaXJlY3Rpb25Bc0FycmF5ID0gQXJyYXkuaXNBcnJheSggZGlyZWN0aW9uUHJvcCApXG5cdFx0PyBkaXJlY3Rpb25Qcm9wXG5cdFx0OiBbIGRpcmVjdGlvblByb3AgXTtcblx0Y29uc3QgZGlyZWN0aW9uID0gdXNlUmVzcG9uc2l2ZVZhbHVlKCBkaXJlY3Rpb25Bc0FycmF5ICk7XG5cblx0Y29uc3QgaXNDb2x1bW4gPVxuXHRcdHR5cGVvZiBkaXJlY3Rpb24gPT09ICdzdHJpbmcnICYmICEhIGRpcmVjdGlvbi5pbmNsdWRlcyggJ2NvbHVtbicgKTtcblxuXHRjb25zdCBjeCA9IHVzZUN4KCk7XG5cblx0Y29uc3QgY2xhc3NlcyA9IHVzZU1lbW8oICgpID0+IHtcblx0XHRjb25zdCBiYXNlID0gY3NzKCB7XG5cdFx0XHRhbGlnbkl0ZW1zOiBhbGlnbiA/PyAoIGlzQ29sdW1uID8gJ25vcm1hbCcgOiAnY2VudGVyJyApLFxuXHRcdFx0ZmxleERpcmVjdGlvbjogZGlyZWN0aW9uLFxuXHRcdFx0ZmxleFdyYXA6IHdyYXAgPyAnd3JhcCcgOiB1bmRlZmluZWQsXG5cdFx0XHRnYXA6IHNwYWNlKCBnYXAgKSxcblx0XHRcdGp1c3RpZnlDb250ZW50OiBqdXN0aWZ5LFxuXHRcdFx0aGVpZ2h0OiBpc0NvbHVtbiAmJiBleHBhbmRlZCA/ICcxMDAlJyA6IHVuZGVmaW5lZCxcblx0XHRcdHdpZHRoOiAhIGlzQ29sdW1uICYmIGV4cGFuZGVkID8gJzEwMCUnIDogdW5kZWZpbmVkLFxuXHRcdH0gKTtcblxuXHRcdHJldHVybiBjeChcblx0XHRcdHN0eWxlcy5GbGV4LFxuXHRcdFx0YmFzZSxcblx0XHRcdGlzQ29sdW1uID8gc3R5bGVzLkl0ZW1zQ29sdW1uIDogc3R5bGVzLkl0ZW1zUm93LFxuXHRcdFx0Y2xhc3NOYW1lXG5cdFx0KTtcblx0fSwgW1xuXHRcdGFsaWduLFxuXHRcdGNsYXNzTmFtZSxcblx0XHRjeCxcblx0XHRkaXJlY3Rpb24sXG5cdFx0ZXhwYW5kZWQsXG5cdFx0Z2FwLFxuXHRcdGlzQ29sdW1uLFxuXHRcdGp1c3RpZnksXG5cdFx0d3JhcCxcblx0XSApO1xuXG5cdHJldHVybiB7IC4uLm90aGVyUHJvcHMsIGNsYXNzTmFtZTogY2xhc3NlcywgaXNDb2x1bW4gfTtcbn1cbiJdfQ== */");
    return cx(styles.Flex, base, isColumn ? styles.ItemsColumn : styles.ItemsRow, className);
  }, [align, className, cx, direction, expanded, gap, isColumn, justify, wrap]);
  return {
    ...otherProps,
    className: classes,
    isColumn
  };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  useFlex
});
//# sourceMappingURL=hook.cjs.map
