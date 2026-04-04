// packages/dataviews/src/components/dataviews-layouts/grid/index.tsx
import clsx from "clsx";
import { Spinner } from "@wordpress/components";
import { __, sprintf } from "@wordpress/i18n";
import { Stack } from "@wordpress/ui";
import getDataByGroup from "../utils/get-data-by-group.mjs";
import CompositeGrid from "./composite-grid.mjs";
import { useDelayedLoading } from "../../../hooks/use-delayed-loading.mjs";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
function ViewGrid({
  actions,
  data,
  fields,
  getItemId,
  isLoading,
  onChangeSelection,
  onClickItem,
  isItemClickable,
  renderItemLink,
  selection,
  view,
  className,
  empty
}) {
  const isDelayedLoading = useDelayedLoading(!!isLoading);
  const hasData = !!data?.length;
  const groupField = view.groupBy?.field ? fields.find((f) => f.id === view.groupBy?.field) : null;
  const dataByGroup = groupField ? getDataByGroup(data, groupField) : null;
  const isInfiniteScroll = view.infiniteScrollEnabled && !dataByGroup;
  if (!hasData) {
    return /* @__PURE__ */ jsx(
      "div",
      {
        className: clsx("dataviews-no-results", {
          "is-refreshing": isDelayedLoading
        }),
        children: empty
      }
    );
  }
  const gridProps = {
    className: clsx(className, {
      "is-refreshing": !isInfiniteScroll && isDelayedLoading
    }),
    inert: !isInfiniteScroll && !!isLoading ? "true" : void 0,
    isLoading,
    view,
    fields,
    selection,
    onChangeSelection,
    onClickItem,
    isItemClickable,
    renderItemLink,
    getItemId,
    actions
  };
  return /* @__PURE__ */ jsxs(Fragment, {
    // Render multiple groups.
    children: [
      hasData && groupField && dataByGroup && /* @__PURE__ */ jsx(Stack, { direction: "column", gap: "lg", children: Array.from(dataByGroup.entries()).map(
        ([groupName, groupItems]) => /* @__PURE__ */ jsxs(
          Stack,
          {
            direction: "column",
            gap: "sm",
            children: [
              /* @__PURE__ */ jsx("h3", { className: "dataviews-view-grid__group-header", children: view.groupBy?.showLabel === false ? groupName : sprintf(
                // translators: 1: The label of the field e.g. "Date". 2: The value of the field, e.g.: "May 2022".
                __("%1$s: %2$s"),
                groupField.label,
                groupName
              ) }),
              /* @__PURE__ */ jsx(
                CompositeGrid,
                {
                  ...gridProps,
                  data: groupItems,
                  isInfiniteScroll: false
                }
              )
            ]
          },
          groupName
        )
      ) }),
      // Render a single grid with all data.
      !dataByGroup && /* @__PURE__ */ jsx(
        CompositeGrid,
        {
          ...gridProps,
          data,
          isInfiniteScroll: !!isInfiniteScroll
        }
      ),
      isInfiniteScroll && isLoading && /* @__PURE__ */ jsx("p", { className: "dataviews-loading-more", children: /* @__PURE__ */ jsx(Spinner, {}) })
    ]
  });
}
var grid_default = ViewGrid;
export {
  grid_default as default
};
//# sourceMappingURL=index.mjs.map
