// packages/dataviews/src/components/dataviews-filters/filters.tsx
import { memo, useContext, useRef } from "@wordpress/element";
import { Stack } from "@wordpress/ui";
import Filter from "./filter.mjs";
import { default as AddFilter } from "./add-filter.mjs";
import ResetFilters from "./reset-filters.mjs";
import useFilters from "./use-filters.mjs";
import DataViewsContext from "../dataviews-context/index.mjs";
import { jsx } from "react/jsx-runtime";
function Filters({ className }) {
  const { fields, view, onChangeView, openedFilter, setOpenedFilter } = useContext(DataViewsContext);
  const addFilterRef = useRef(null);
  const filters = useFilters(fields, view);
  const addFilter = /* @__PURE__ */ jsx(
    AddFilter,
    {
      filters,
      view,
      onChangeView,
      ref: addFilterRef,
      setOpenedFilter
    },
    "add-filter"
  );
  const visibleFilters = filters.filter((filter) => filter.isVisible);
  if (visibleFilters.length === 0) {
    return null;
  }
  const filterComponents = [
    ...visibleFilters.map((filter) => {
      return /* @__PURE__ */ jsx(
        Filter,
        {
          filter,
          view,
          fields,
          onChangeView,
          addFilterRef,
          openedFilter
        },
        filter.field
      );
    }),
    addFilter
  ];
  filterComponents.push(
    /* @__PURE__ */ jsx(
      ResetFilters,
      {
        filters,
        view,
        onChangeView
      },
      "reset-filters"
    )
  );
  return /* @__PURE__ */ jsx(
    Stack,
    {
      direction: "row",
      justify: "flex-start",
      gap: "sm",
      style: { width: "fit-content" },
      wrap: "wrap",
      className,
      children: filterComponents
    }
  );
}
var filters_default = memo(Filters);
export {
  filters_default as default
};
//# sourceMappingURL=filters.mjs.map
