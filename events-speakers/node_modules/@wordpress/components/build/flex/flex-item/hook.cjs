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

// packages/components/src/flex/flex-item/hook.ts
var hook_exports = {};
__export(hook_exports, {
  useFlexItem: () => useFlexItem
});
module.exports = __toCommonJS(hook_exports);
var import_react = require("@emotion/react");
var import_context = require("../../context/index.cjs");
var import_context2 = require("../context.cjs");
var styles = __toESM(require("../styles.cjs"));
var import_use_cx = require("../../utils/hooks/use-cx.cjs");
function useFlexItem(props) {
  const {
    className,
    display: displayProp,
    isBlock = false,
    ...otherProps
  } = (0, import_context.useContextSystem)(props, "FlexItem");
  const sx = {};
  const contextDisplay = (0, import_context2.useFlexContext)().flexItemDisplay;
  sx.Base = /* @__PURE__ */ (0, import_react.css)({
    display: displayProp || contextDisplay
  }, process.env.NODE_ENV === "production" ? "" : ";label:sx-Base;", process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImhvb2sudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBZ0NXIiwiZmlsZSI6Imhvb2sudHMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEV4dGVybmFsIGRlcGVuZGVuY2llc1xuICovXG5pbXBvcnQgdHlwZSB7IFNlcmlhbGl6ZWRTdHlsZXMgfSBmcm9tICdAZW1vdGlvbi9yZWFjdCc7XG5pbXBvcnQgeyBjc3MgfSBmcm9tICdAZW1vdGlvbi9yZWFjdCc7XG5cbi8qKlxuICogSW50ZXJuYWwgZGVwZW5kZW5jaWVzXG4gKi9cbmltcG9ydCB0eXBlIHsgV29yZFByZXNzQ29tcG9uZW50UHJvcHMgfSBmcm9tICcuLi8uLi9jb250ZXh0JztcbmltcG9ydCB7IHVzZUNvbnRleHRTeXN0ZW0gfSBmcm9tICcuLi8uLi9jb250ZXh0JztcbmltcG9ydCB7IHVzZUZsZXhDb250ZXh0IH0gZnJvbSAnLi4vY29udGV4dCc7XG5pbXBvcnQgKiBhcyBzdHlsZXMgZnJvbSAnLi4vc3R5bGVzJztcbmltcG9ydCB7IHVzZUN4IH0gZnJvbSAnLi4vLi4vdXRpbHMvaG9va3MvdXNlLWN4JztcbmltcG9ydCB0eXBlIHsgRmxleEl0ZW1Qcm9wcyB9IGZyb20gJy4uL3R5cGVzJztcblxuZXhwb3J0IGZ1bmN0aW9uIHVzZUZsZXhJdGVtKFxuXHRwcm9wczogV29yZFByZXNzQ29tcG9uZW50UHJvcHM8IEZsZXhJdGVtUHJvcHMsICdkaXYnID5cbikge1xuXHRjb25zdCB7XG5cdFx0Y2xhc3NOYW1lLFxuXHRcdGRpc3BsYXk6IGRpc3BsYXlQcm9wLFxuXHRcdGlzQmxvY2sgPSBmYWxzZSxcblx0XHQuLi5vdGhlclByb3BzXG5cdH0gPSB1c2VDb250ZXh0U3lzdGVtKCBwcm9wcywgJ0ZsZXhJdGVtJyApO1xuXG5cdGNvbnN0IHN4OiB7XG5cdFx0QmFzZT86IFNlcmlhbGl6ZWRTdHlsZXM7XG5cdH0gPSB7fTtcblxuXHRjb25zdCBjb250ZXh0RGlzcGxheSA9IHVzZUZsZXhDb250ZXh0KCkuZmxleEl0ZW1EaXNwbGF5O1xuXG5cdHN4LkJhc2UgPSBjc3MoIHtcblx0XHRkaXNwbGF5OiBkaXNwbGF5UHJvcCB8fCBjb250ZXh0RGlzcGxheSxcblx0fSApO1xuXG5cdGNvbnN0IGN4ID0gdXNlQ3goKTtcblxuXHRjb25zdCBjbGFzc2VzID0gY3goXG5cdFx0c3R5bGVzLkl0ZW0sXG5cdFx0c3guQmFzZSxcblx0XHRpc0Jsb2NrICYmIHN0eWxlcy5ibG9jayxcblx0XHRjbGFzc05hbWVcblx0KTtcblxuXHRyZXR1cm4ge1xuXHRcdC4uLm90aGVyUHJvcHMsXG5cdFx0Y2xhc3NOYW1lOiBjbGFzc2VzLFxuXHR9O1xufVxuIl19 */");
  const cx = (0, import_use_cx.useCx)();
  const classes = cx(styles.Item, sx.Base, isBlock && styles.block, className);
  return {
    ...otherProps,
    className: classes
  };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  useFlexItem
});
//# sourceMappingURL=hook.cjs.map
