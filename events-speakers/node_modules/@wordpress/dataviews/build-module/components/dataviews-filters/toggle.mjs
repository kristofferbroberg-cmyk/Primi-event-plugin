// packages/dataviews/src/components/dataviews-filters/toggle.tsx
import { useContext, useRef, useCallback, useEffect } from "@wordpress/element";
import { Button } from "@wordpress/components";
import { funnel } from "@wordpress/icons";
import { __, _x } from "@wordpress/i18n";
import { AddFilterMenu } from "./add-filter.mjs";
import DataViewsContext from "../dataviews-context/index.mjs";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
function FiltersToggle() {
  const {
    filters,
    view,
    onChangeView,
    setOpenedFilter,
    isShowingFilter,
    setIsShowingFilter
  } = useContext(DataViewsContext);
  const buttonRef = useRef(null);
  const onChangeViewWithFilterVisibility = useCallback(
    (_view) => {
      onChangeView(_view);
      setIsShowingFilter(true);
    },
    [onChangeView, setIsShowingFilter]
  );
  if (filters.length === 0) {
    return null;
  }
  const hasVisibleFilters = filters.some((filter) => filter.isVisible);
  const addFilterButtonProps = {
    label: __("Add filter"),
    "aria-expanded": false,
    isPressed: false
  };
  const toggleFiltersButtonProps = {
    label: _x("Filter", "verb"),
    "aria-expanded": isShowingFilter,
    isPressed: isShowingFilter,
    onClick: () => {
      if (!isShowingFilter) {
        setOpenedFilter(null);
      }
      setIsShowingFilter(!isShowingFilter);
    }
  };
  const hasPrimaryOrLockedFilters = filters.some(
    (filter) => filter.isPrimary || filter.isLocked
  );
  const buttonComponent = /* @__PURE__ */ jsx(
    Button,
    {
      ref: buttonRef,
      className: "dataviews-filters__visibility-toggle",
      size: "compact",
      icon: funnel,
      disabled: hasPrimaryOrLockedFilters,
      accessibleWhenDisabled: true,
      ...hasVisibleFilters ? toggleFiltersButtonProps : addFilterButtonProps
    }
  );
  return /* @__PURE__ */ jsx("div", { className: "dataviews-filters__container-visibility-toggle", children: !hasVisibleFilters ? /* @__PURE__ */ jsx(
    AddFilterMenu,
    {
      filters,
      view,
      onChangeView: onChangeViewWithFilterVisibility,
      setOpenedFilter,
      triggerProps: { render: buttonComponent }
    }
  ) : /* @__PURE__ */ jsx(
    FilterVisibilityToggle,
    {
      buttonRef,
      filtersCount: view.filters?.length,
      children: buttonComponent
    }
  ) });
}
function FilterVisibilityToggle({
  buttonRef,
  filtersCount,
  children
}) {
  useEffect(
    () => () => {
      buttonRef.current?.focus();
    },
    [buttonRef]
  );
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    children,
    !!filtersCount && /* @__PURE__ */ jsx("span", { className: "dataviews-filters-toggle__count", children: filtersCount })
  ] });
}
var toggle_default = FiltersToggle;
export {
  toggle_default as default
};
//# sourceMappingURL=toggle.mjs.map
