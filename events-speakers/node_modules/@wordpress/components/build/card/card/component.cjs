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

// packages/components/src/card/card/component.tsx
var component_exports = {};
__export(component_exports, {
  Card: () => Card,
  default: () => component_default
});
module.exports = __toCommonJS(component_exports);
var import_react = require("@emotion/react");
var import_element = require("@wordpress/element");
var import_context = require("../../context/index.cjs");
var import_elevation = require("../../elevation/index.cjs");
var import_view = require("../../view/index.cjs");
var styles = __toESM(require("../styles.cjs"));
var import_hook = require("./hook.cjs");
var import_config_values = __toESM(require("../../utils/config-values.cjs"));
var import_use_cx = require("../../utils/hooks/use-cx.cjs");
var import_jsx_runtime = require("react/jsx-runtime");
function UnconnectedCard(props, forwardedRef) {
  const {
    children,
    elevation,
    isBorderless,
    isRounded,
    size,
    ...otherProps
  } = (0, import_hook.useCard)(props);
  const elevationBorderRadius = isRounded ? import_config_values.default.radiusLarge : 0;
  const cx = (0, import_use_cx.useCx)();
  const elevationClassName = (0, import_element.useMemo)(() => cx(/* @__PURE__ */ (0, import_react.css)({
    borderRadius: elevationBorderRadius
  }, process.env.NODE_ENV === "production" ? "" : ";label:elevationClassName;", process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImNvbXBvbmVudC50c3giXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBeUNZIiwiZmlsZSI6ImNvbXBvbmVudC50c3giLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEV4dGVybmFsIGRlcGVuZGVuY2llc1xuICovXG5pbXBvcnQgeyBjc3MgfSBmcm9tICdAZW1vdGlvbi9yZWFjdCc7XG5pbXBvcnQgdHlwZSB7IEZvcndhcmRlZFJlZiB9IGZyb20gJ3JlYWN0JztcblxuLyoqXG4gKiBXb3JkUHJlc3MgZGVwZW5kZW5jaWVzXG4gKi9cbmltcG9ydCB7IHVzZU1lbW8gfSBmcm9tICdAd29yZHByZXNzL2VsZW1lbnQnO1xuXG4vKipcbiAqIEludGVybmFsIGRlcGVuZGVuY2llc1xuICovXG5pbXBvcnQgdHlwZSB7IFdvcmRQcmVzc0NvbXBvbmVudFByb3BzIH0gZnJvbSAnLi4vLi4vY29udGV4dCc7XG5pbXBvcnQgeyBjb250ZXh0Q29ubmVjdCwgQ29udGV4dFN5c3RlbVByb3ZpZGVyIH0gZnJvbSAnLi4vLi4vY29udGV4dCc7XG5pbXBvcnQgeyBFbGV2YXRpb24gfSBmcm9tICcuLi8uLi9lbGV2YXRpb24nO1xuaW1wb3J0IHsgVmlldyB9IGZyb20gJy4uLy4uL3ZpZXcnO1xuaW1wb3J0ICogYXMgc3R5bGVzIGZyb20gJy4uL3N0eWxlcyc7XG5pbXBvcnQgeyB1c2VDYXJkIH0gZnJvbSAnLi9ob29rJztcbmltcG9ydCBDT05GSUcgZnJvbSAnLi4vLi4vdXRpbHMvY29uZmlnLXZhbHVlcyc7XG5pbXBvcnQgeyB1c2VDeCB9IGZyb20gJy4uLy4uL3V0aWxzL2hvb2tzL3VzZS1jeCc7XG5pbXBvcnQgdHlwZSB7IFByb3BzIH0gZnJvbSAnLi4vdHlwZXMnO1xuXG5mdW5jdGlvbiBVbmNvbm5lY3RlZENhcmQoXG5cdHByb3BzOiBXb3JkUHJlc3NDb21wb25lbnRQcm9wczwgUHJvcHMsICdkaXYnID4sXG5cdGZvcndhcmRlZFJlZjogRm9yd2FyZGVkUmVmPCBhbnkgPlxuKSB7XG5cdGNvbnN0IHtcblx0XHRjaGlsZHJlbixcblx0XHRlbGV2YXRpb24sXG5cdFx0aXNCb3JkZXJsZXNzLFxuXHRcdGlzUm91bmRlZCxcblx0XHRzaXplLFxuXHRcdC4uLm90aGVyUHJvcHNcblx0fSA9IHVzZUNhcmQoIHByb3BzICk7XG5cdGNvbnN0IGVsZXZhdGlvbkJvcmRlclJhZGl1cyA9IGlzUm91bmRlZCA/IENPTkZJRy5yYWRpdXNMYXJnZSA6IDA7XG5cblx0Y29uc3QgY3ggPSB1c2VDeCgpO1xuXG5cdGNvbnN0IGVsZXZhdGlvbkNsYXNzTmFtZSA9IHVzZU1lbW8oXG5cdFx0KCkgPT4gY3goIGNzcyggeyBib3JkZXJSYWRpdXM6IGVsZXZhdGlvbkJvcmRlclJhZGl1cyB9ICkgKSxcblx0XHRbIGN4LCBlbGV2YXRpb25Cb3JkZXJSYWRpdXMgXVxuXHQpO1xuXG5cdGNvbnN0IGNvbnRleHRQcm92aWRlclZhbHVlID0gdXNlTWVtbyggKCkgPT4ge1xuXHRcdGNvbnN0IGNvbnRleHRQcm9wcyA9IHtcblx0XHRcdHNpemUsXG5cdFx0XHRpc0JvcmRlcmxlc3MsXG5cdFx0fTtcblx0XHRyZXR1cm4ge1xuXHRcdFx0Q2FyZEJvZHk6IGNvbnRleHRQcm9wcyxcblx0XHRcdENhcmRIZWFkZXI6IGNvbnRleHRQcm9wcyxcblx0XHRcdENhcmRGb290ZXI6IGNvbnRleHRQcm9wcyxcblx0XHR9O1xuXHR9LCBbIGlzQm9yZGVybGVzcywgc2l6ZSBdICk7XG5cblx0cmV0dXJuIChcblx0XHQ8Q29udGV4dFN5c3RlbVByb3ZpZGVyIHZhbHVlPXsgY29udGV4dFByb3ZpZGVyVmFsdWUgfT5cblx0XHRcdDxWaWV3IHsgLi4ub3RoZXJQcm9wcyB9IHJlZj17IGZvcndhcmRlZFJlZiB9PlxuXHRcdFx0XHQ8VmlldyBjbGFzc05hbWU9eyBjeCggc3R5bGVzLkNvbnRlbnQgKSB9PnsgY2hpbGRyZW4gfTwvVmlldz5cblx0XHRcdFx0PEVsZXZhdGlvblxuXHRcdFx0XHRcdGNsYXNzTmFtZT17IGVsZXZhdGlvbkNsYXNzTmFtZSB9XG5cdFx0XHRcdFx0aXNJbnRlcmFjdGl2ZT17IGZhbHNlIH1cblx0XHRcdFx0XHR2YWx1ZT17IGVsZXZhdGlvbiA/IDEgOiAwIH1cblx0XHRcdFx0Lz5cblx0XHRcdFx0PEVsZXZhdGlvblxuXHRcdFx0XHRcdGNsYXNzTmFtZT17IGVsZXZhdGlvbkNsYXNzTmFtZSB9XG5cdFx0XHRcdFx0aXNJbnRlcmFjdGl2ZT17IGZhbHNlIH1cblx0XHRcdFx0XHR2YWx1ZT17IGVsZXZhdGlvbiB9XG5cdFx0XHRcdC8+XG5cdFx0XHQ8L1ZpZXc+XG5cdFx0PC9Db250ZXh0U3lzdGVtUHJvdmlkZXI+XG5cdCk7XG59XG5cbi8qKlxuICogYENhcmRgIHByb3ZpZGVzIGEgZmxleGlibGUgYW5kIGV4dGVuc2libGUgY29udGVudCBjb250YWluZXIuXG4gKiBgQ2FyZGAgYWxzbyBwcm92aWRlcyBhIGNvbnZlbmllbnQgc2V0IG9mIHN1Yi1jb21wb25lbnRzIHN1Y2ggYXMgYENhcmRCb2R5YCxcbiAqIGBDYXJkSGVhZGVyYCwgYENhcmRGb290ZXJgLCBhbmQgbW9yZS5cbiAqXG4gKiBgYGBqc3hcbiAqIGltcG9ydCB7XG4gKiAgIENhcmQsXG4gKiAgIENhcmRIZWFkZXIsXG4gKiAgIENhcmRCb2R5LFxuICogICBDYXJkRm9vdGVyLFxuICogICBfX2V4cGVyaW1lbnRhbFRleHQgYXMgVGV4dCxcbiAqICAgX19leHBlcmltZW50YWxIZWFkaW5nIGFzIEhlYWRpbmcsXG4gKiB9IGZyb20gYEB3b3JkcHJlc3MvY29tcG9uZW50c2A7XG4gKlxuICogZnVuY3Rpb24gRXhhbXBsZSgpIHtcbiAqICAgcmV0dXJuIChcbiAqICAgICA8Q2FyZD5cbiAqICAgICAgIDxDYXJkSGVhZGVyPlxuICogICAgICAgICA8SGVhZGluZyBsZXZlbD17IDQgfT5DYXJkIFRpdGxlPC9IZWFkaW5nPlxuICogICAgICAgPC9DYXJkSGVhZGVyPlxuICogICAgICAgPENhcmRCb2R5PlxuICogICAgICAgICA8VGV4dD5DYXJkIENvbnRlbnQ8L1RleHQ+XG4gKiAgICAgICA8L0NhcmRCb2R5PlxuICogICAgICAgPENhcmRGb290ZXI+XG4gKiAgICAgICAgIDxUZXh0PkNhcmQgRm9vdGVyPC9UZXh0PlxuICogICAgICAgPC9DYXJkRm9vdGVyPlxuICogICAgIDwvQ2FyZD5cbiAqICAgKTtcbiAqIH1cbiAqIGBgYFxuICovXG5leHBvcnQgY29uc3QgQ2FyZCA9IGNvbnRleHRDb25uZWN0KCBVbmNvbm5lY3RlZENhcmQsICdDYXJkJyApO1xuXG5leHBvcnQgZGVmYXVsdCBDYXJkO1xuIl19 */")), [cx, elevationBorderRadius]);
  const contextProviderValue = (0, import_element.useMemo)(() => {
    const contextProps = {
      size,
      isBorderless
    };
    return {
      CardBody: contextProps,
      CardHeader: contextProps,
      CardFooter: contextProps
    };
  }, [isBorderless, size]);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_context.ContextSystemProvider, {
    value: contextProviderValue,
    children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_view.View, {
      ...otherProps,
      ref: forwardedRef,
      children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_view.View, {
        className: cx(styles.Content),
        children
      }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_elevation.Elevation, {
        className: elevationClassName,
        isInteractive: false,
        value: elevation ? 1 : 0
      }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_elevation.Elevation, {
        className: elevationClassName,
        isInteractive: false,
        value: elevation
      })]
    })
  });
}
var Card = (0, import_context.contextConnect)(UnconnectedCard, "Card");
var component_default = Card;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Card
});
//# sourceMappingURL=component.cjs.map
