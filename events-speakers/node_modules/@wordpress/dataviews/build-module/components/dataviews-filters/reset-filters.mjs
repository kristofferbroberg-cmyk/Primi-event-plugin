// packages/dataviews/src/components/dataviews-filters/reset-filters.tsx
import { Button } from "@wordpress/components";
import { __ } from "@wordpress/i18n";
import { jsx } from "react/jsx-runtime";
function ResetFilter({
  filters,
  view,
  onChangeView
}) {
  const isPrimary = (field) => filters.some(
    (_filter) => _filter.field === field && _filter.isPrimary
  );
  const isDisabled = !view.search && !view.filters?.some(
    (_filter) => !_filter.isLocked && (_filter.value !== void 0 || !isPrimary(_filter.field))
  );
  return /* @__PURE__ */ jsx(
    Button,
    {
      disabled: isDisabled,
      accessibleWhenDisabled: true,
      size: "compact",
      variant: "tertiary",
      className: "dataviews-filters__reset-button",
      onClick: () => {
        onChangeView({
          ...view,
          page: 1,
          search: "",
          filters: view.filters?.filter((f) => !!f.isLocked) || []
        });
      },
      children: __("Reset")
    }
  );
}
export {
  ResetFilter as default
};
//# sourceMappingURL=reset-filters.mjs.map
