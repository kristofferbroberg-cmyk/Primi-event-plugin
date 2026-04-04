// packages/dataviews/src/components/dataviews-layouts/table/column-primary.tsx
import { Stack } from "@wordpress/ui";
import { ItemClickWrapper } from "../utils/item-click-wrapper.mjs";
import { jsx, jsxs } from "react/jsx-runtime";
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
  return /* @__PURE__ */ jsxs(Stack, { direction: "row", gap: "md", align: "flex-start", justify: "flex-start", children: [
    mediaField && /* @__PURE__ */ jsx(
      ItemClickWrapper,
      {
        item,
        isItemClickable,
        onClickItem,
        renderItemLink,
        className: "dataviews-view-table__cell-content-wrapper dataviews-column-primary__media",
        "aria-label": isItemClickable(item) && (!!onClickItem || !!renderItemLink) && !!titleField ? titleField.getValue?.({ item }) : void 0,
        children: /* @__PURE__ */ jsx(
          mediaField.render,
          {
            item,
            field: mediaField,
            config: { sizes: "32px" }
          }
        )
      }
    ),
    /* @__PURE__ */ jsxs(
      Stack,
      {
        direction: "column",
        align: "flex-start",
        className: "dataviews-view-table__primary-column-content",
        children: [
          titleField && /* @__PURE__ */ jsxs(
            ItemClickWrapper,
            {
              item,
              isItemClickable,
              onClickItem,
              renderItemLink,
              className: "dataviews-view-table__cell-content-wrapper dataviews-title-field",
              children: [
                level !== void 0 && level > 0 && /* @__PURE__ */ jsxs("span", { className: "dataviews-view-table__level", children: [
                  Array(level).fill("\u2014").join(" "),
                  "\xA0"
                ] }),
                /* @__PURE__ */ jsx(titleField.render, { item, field: titleField })
              ]
            }
          ),
          descriptionField && /* @__PURE__ */ jsx(
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
export {
  column_primary_default as default
};
//# sourceMappingURL=column-primary.mjs.map
