// packages/dataviews/src/components/dataviews-filters/filters-toggled.tsx
import { useContext } from "@wordpress/element";
import DataViewsContext from "../dataviews-context/index.mjs";
import Filters from "./filters.mjs";
import { jsx } from "react/jsx-runtime";
function FiltersToggled(props) {
  const { isShowingFilter } = useContext(DataViewsContext);
  if (!isShowingFilter) {
    return null;
  }
  return /* @__PURE__ */ jsx(Filters, { ...props });
}
var filters_toggled_default = FiltersToggled;
export {
  filters_toggled_default as default
};
//# sourceMappingURL=filters-toggled.mjs.map
