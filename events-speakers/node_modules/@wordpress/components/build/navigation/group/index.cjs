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

// packages/components/src/navigation/group/index.tsx
var group_exports = {};
__export(group_exports, {
  NavigationGroup: () => NavigationGroup,
  default: () => group_default
});
module.exports = __toCommonJS(group_exports);
var import_clsx = __toESM(require("clsx"));
var import_element = require("@wordpress/element");
var import_context = require("./context.cjs");
var import_navigation_styles = require("../styles/navigation-styles.cjs");
var import_context2 = require("../context.cjs");
var import_jsx_runtime = require("react/jsx-runtime");
var uniqueId = 0;
function NavigationGroup({
  children,
  className,
  title
}) {
  const [groupId] = (0, import_element.useState)(`group-${++uniqueId}`);
  const {
    navigationTree: {
      items
    }
  } = (0, import_context2.useNavigationContext)();
  const context = {
    group: groupId
  };
  if (!Object.values(items).some((item) => item.group === groupId && item._isVisible)) {
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_context.NavigationGroupContext.Provider, {
      value: context,
      children
    });
  }
  const groupTitleId = `components-navigation__group-title-${groupId}`;
  const classes = (0, import_clsx.default)("components-navigation__group", className);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_context.NavigationGroupContext.Provider, {
    value: context,
    children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
      className: classes,
      children: [title && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_navigation_styles.GroupTitleUI, {
        className: "components-navigation__group-title",
        id: groupTitleId,
        level: 3,
        children: title
      }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
        "aria-labelledby": groupTitleId,
        role: "group",
        children
      })]
    })
  });
}
var group_default = NavigationGroup;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  NavigationGroup
});
//# sourceMappingURL=index.cjs.map
