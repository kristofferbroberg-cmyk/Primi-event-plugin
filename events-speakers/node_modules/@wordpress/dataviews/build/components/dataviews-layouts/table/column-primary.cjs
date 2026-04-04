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

// packages/dataviews/src/components/dataviews-layouts/table/column-primary.tsx
var column_primary_exports = {};
__export(column_primary_exports, {
  default: () => column_primary_default
});
module.exports = __toCommonJS(column_primary_exports);
var import_ui = require("@wordpress/ui");
var import_item_click_wrapper = require("../utils/item-click-wrapper.cjs");
var import_jsx_runtime = require("react/jsx-runtime");
function ColumnPrimary({
  item,
  level,
  titleField,
  mediaField,
  descriptionField,
  onClickItem,
  renderItemLink,
  isItemClickable
}) {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_ui.Stack, { direction: "row", gap: "md", align: "flex-start", justify: "flex-start", children: [
    mediaField && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
      import_item_click_wrapper.ItemClickWrapper,
      {
        item,
        isItemClickable,
        onClickItem,
        renderItemLink,
        className: "dataviews-view-table__cell-content-wrapper dataviews-column-primary__media",
        "aria-label": isItemClickable(item) && (!!onClickItem || !!renderItemLink) && !!titleField ? titleField.getValue?.({ item }) : void 0,
        children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          mediaField.render,
          {
            item,
            field: mediaField,
            config: { sizes: "32px" }
          }
        )
      }
    ),
    /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
      import_ui.Stack,
      {
        direction: "column",
        align: "flex-start",
        className: "dataviews-view-table__primary-column-content",
        children: [
          titleField && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
            import_item_click_wrapper.ItemClickWrapper,
            {
              item,
              isItemClickable,
              onClickItem,
              renderItemLink,
              className: "dataviews-view-table__cell-content-wrapper dataviews-title-field",
              children: [
                level !== void 0 && level > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { className: "dataviews-view-table__level", children: [
                  Array(level).fill("\u2014").join(" "),
                  "\xA0"
                ] }),
                /* @__PURE__ */ (0, import_jsx_runtime.jsx)(titleField.render, { item, field: titleField })
              ]
            }
          ),
          descriptionField && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            descriptionField.render,
            {
              item,
              field: descriptionField
            }
          )
        ]
      }
    )
  ] });
}
var column_primary_default = ColumnPrimary;
//# sourceMappingURL=column-primary.cjs.map
