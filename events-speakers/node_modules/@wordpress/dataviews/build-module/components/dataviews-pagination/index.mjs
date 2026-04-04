// packages/dataviews/src/components/dataviews-pagination/index.tsx
import { Button, SelectControl } from "@wordpress/components";
import { createInterpolateElement, memo, useContext } from "@wordpress/element";
import { sprintf, __, _x, isRTL } from "@wordpress/i18n";
import { next, previous } from "@wordpress/icons";
import { Stack } from "@wordpress/ui";
import DataViewsContext from "../dataviews-context/index.mjs";
import { jsx, jsxs } from "react/jsx-runtime";
function DataViewsPagination() {
  const {
    view,
    onChangeView,
    paginationInfo: { totalItems = 0, totalPages }
  } = useContext(DataViewsContext);
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
        "aria-label": currentPage === page ? sprintf(
          // translators: 1: current page number. 2: total number of pages.
          __("Page %1$d of %2$d"),
          currentPage,
          totalPages
        ) : page.toString()
      };
    }
  );
  return !!totalItems && totalPages !== 1 && /* @__PURE__ */ jsxs(
    Stack,
    {
      direction: "row",
      className: "dataviews-pagination",
      justify: "end",
      align: "center",
      gap: "xl",
      children: [
        /* @__PURE__ */ jsx(
          Stack,
          {
            direction: "row",
            justify: "flex-start",
            align: "center",
            gap: "xs",
            className: "dataviews-pagination__page-select",
            children: createInterpolateElement(
              sprintf(
                // translators: 1: Current page number, 2: Total number of pages.
                _x(
                  "<div>Page</div>%1$s<div>of %2$d</div>",
                  "paging"
                ),
                "<CurrentPage />",
                totalPages
              ),
              {
                div: /* @__PURE__ */ jsx("div", { "aria-hidden": true }),
                CurrentPage: /* @__PURE__ */ jsx(
                  SelectControl,
                  {
                    "aria-label": __("Current page"),
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
        /* @__PURE__ */ jsxs(Stack, { direction: "row", gap: "xs", align: "center", children: [
          /* @__PURE__ */ jsx(
            Button,
            {
              onClick: () => onChangeView({
                ...view,
                page: currentPage - 1
              }),
              disabled: currentPage === 1,
              accessibleWhenDisabled: true,
              label: __("Previous page"),
              icon: isRTL() ? next : previous,
              showTooltip: true,
              size: "compact",
              tooltipPosition: "top"
            }
          ),
          /* @__PURE__ */ jsx(
            Button,
            {
              onClick: () => onChangeView({ ...view, page: currentPage + 1 }),
              disabled: currentPage >= totalPages,
              accessibleWhenDisabled: true,
              label: __("Next page"),
              icon: isRTL() ? previous : next,
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
var dataviews_pagination_default = memo(DataViewsPagination);
export {
  DataViewsPagination,
  dataviews_pagination_default as default
};
//# sourceMappingURL=index.mjs.map
