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

// packages/components/src/navigation/menu/search-no-results-found.tsx
var search_no_results_found_exports = {};
__export(search_no_results_found_exports, {
  default: () => NavigationSearchNoResultsFound
});
module.exports = __toCommonJS(search_no_results_found_exports);
var import_i18n = require("@wordpress/i18n");
var import_context = require("../context.cjs");
var import_navigation_styles = require("../styles/navigation-styles.cjs");
var import_jsx_runtime = require("react/jsx-runtime");
function NavigationSearchNoResultsFound({
  search
}) {
  const {
    navigationTree: {
      items
    }
  } = (0, import_context.useNavigationContext)();
  const resultsCount = Object.values(items).filter((item) => item._isVisible).length;
  if (!search || !!resultsCount) {
    return null;
  }
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_navigation_styles.ItemBaseUI, {
    children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_navigation_styles.ItemUI, {
      children: [(0, import_i18n.__)("No results found."), " "]
    })
  });
}
//# sourceMappingURL=search-no-results-found.cjs.map
