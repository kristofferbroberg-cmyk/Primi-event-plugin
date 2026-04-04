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

// packages/components/src/navigation/item/base-content.tsx
var base_content_exports = {};
__export(base_content_exports, {
  default: () => NavigationItemBaseContent
});
module.exports = __toCommonJS(base_content_exports);
var import_navigation_styles = require("../styles/navigation-styles.cjs");
var import_jsx_runtime = require("react/jsx-runtime");
function NavigationItemBaseContent(props) {
  const {
    badge,
    title
  } = props;
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, {
    children: [title && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_navigation_styles.ItemTitleUI, {
      className: "components-navigation__item-title",
      as: "span",
      children: title
    }), badge && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_navigation_styles.ItemBadgeUI, {
      className: "components-navigation__item-badge",
      children: badge
    })]
  });
}
//# sourceMappingURL=base-content.cjs.map
