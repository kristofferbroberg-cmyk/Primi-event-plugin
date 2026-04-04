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

// packages/dataviews/src/components/dataviews-pagination/index.tsx
var dataviews_pagination_exports = {};
__export(dataviews_pagination_exports, {
  DataViewsPagination: () => DataViewsPagination,
  default: () => dataviews_pagination_default
});
module.exports = __toCommonJS(dataviews_pagination_exports);
var import_components = require("@wordpress/components");
var import_element = require("@wordpress/element");
var import_i18n = require("@wordpress/i18n");
var import_icons = require("@wordpress/icons");
var import_ui = require("@wordpress/ui");
var import_dataviews_context = __toESM(require("../dataviews-context/index.cjs"));
var import_jsx_runtime = require("react/jsx-runtime");
function DataViewsPagination() {
  const {
    view,
    onChangeView,
    paginationInfo: { totalItems = 0, totalPages }
  } = (0, import_element.useContext)(import_dataviews_context.default);
  if (!totalItems || !totalPages || view.infiniteScrollEnabled) {
    return null;
  }
  const currentPage = view.page ?? 1;
  const pageSelectOptions = Array.from(Array(totalPages)).map(
    (_, i) => {
      const page = i + 1;
      return {
        value: page.toString(),
        label: page.toString(),
        "aria-label": currentPage === page ? (0, import_i18n.sprintf)(
          // translators: 1: current page number. 2: total number of pages.
          (0, import_i18n.__)("Page %1$d of %2$d"),
          currentPage,
          totalPages
        ) : page.toString()
      };
    }
  );
  return !!totalItems && totalPages !== 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
    import_ui.Stack,
    {
      direction: "row",
      className: "dataviews-pagination",
      justify: "end",
      align: "center",
      gap: "xl",
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          import_ui.Stack,
          {
            direction: "row",
            justify: "flex-start",
            align: "center",
            gap: "xs",
            className: "dataviews-pagination__page-select",
            children: (0, import_element.createInterpolateElement)(
              (0, import_i18n.sprintf)(
                // translators: 1: Current page number, 2: Total number of pages.
                (0, import_i18n._x)(
                  "<div>Page</div>%1$s<div>of %2$d</div>",
                  "paging"
                ),
                "<CurrentPage />",
                totalPages
              ),
              {
                div: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { "aria-hidden": true }),
                CurrentPage: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                  import_components.SelectControl,
                  {
                    "aria-label": (0, import_i18n.__)("Current page"),
                    value: currentPage.toString(),
                    options: pageSelectOptions,
                    onChange: (newValue) => {
                      onChangeView({
                        ...view,
                        page: +newValue
                      });
                    },
                    size: "small",
                    variant: "minimal"
                  }
                )
              }
            )
          }
        ),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_ui.Stack, { direction: "row", gap: "xs", align: "center", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            import_components.Button,
            {
              onClick: () => onChangeView({
                ...view,
                page: currentPage - 1
              }),
              disabled: currentPage === 1,
              accessibleWhenDisabled: true,
              label: (0, import_i18n.__)("Previous page"),
              icon: (0, import_i18n.isRTL)() ? import_icons.next : import_icons.previous,
              showTooltip: true,
              size: "compact",
              tooltipPosition: "top"
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            import_components.Button,
            {
              onClick: () => onChangeView({ ...view, page: currentPage + 1 }),
              disabled: currentPage >= totalPages,
              accessibleWhenDisabled: true,
              label: (0, import_i18n.__)("Next page"),
              icon: (0, import_i18n.isRTL)() ? import_icons.previous : import_icons.next,
              showTooltip: true,
              size: "compact",
              tooltipPosition: "top"
            }
          )
        ] })
      ]
    }
  );
}
var dataviews_pagination_default = (0, import_element.memo)(DataViewsPagination);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  DataViewsPagination
});
//# sourceMappingURL=index.cjs.map
