// packages/dataviews/src/components/dataviews-filters/add-filter.tsx
import {
  privateApis as componentsPrivateApis,
  Button
} from "@wordpress/components";
import { __ } from "@wordpress/i18n";
import { forwardRef } from "@wordpress/element";
import { unlock } from "../../lock-unlock.mjs";
import { jsx, jsxs } from "react/jsx-runtime";
var { Menu } = unlock(componentsPrivateApis);
function AddFilterMenu({
  filters,
  view,
  onChangeView,
  setOpenedFilter,
  triggerProps
}) {
  const inactiveFilters = filters.filter((filter) => !filter.isVisible);
  return /* @__PURE__ */ jsxs(Menu, { children: [
    /* @__PURE__ */ jsx(Menu.TriggerButton, { ...triggerProps }),
    /* @__PURE__ */ jsx(Menu.Popover, { children: inactiveFilters.map((filter) => {
      return /* @__PURE__ */ jsx(
        Menu.Item,
        {
          onClick: () => {
            setOpenedFilter(filter.field);
            onChangeView({
              ...view,
              page: 1,
              filters: [
                ...view.filters || [],
                {
                  field: filter.field,
                  value: void 0,
                  operator: filter.operators[0]
                }
              ]
            });
          },
          children: /* @__PURE__ */ jsx(Menu.ItemLabel, { children: filter.name })
        },
        filter.field
      );
    }) })
  ] });
}
function AddFilter({ filters, view, onChangeView, setOpenedFilter }, ref) {
  if (!filters.length || filters.every(({ isPrimary }) => isPrimary)) {
    return null;
  }
  const inactiveFilters = filters.filter((filter) => !filter.isVisible);
  return /* @__PURE__ */ jsx(
    AddFilterMenu,
    {
      triggerProps: {
        render: /* @__PURE__ */ jsx(
          Button,
          {
            accessibleWhenDisabled: true,
            size: "compact",
            className: "dataviews-filters-button",
            variant: "tertiary",
            disabled: !inactiveFilters.length,
            ref
          }
        ),
        children: __("Add filter")
      },
      ...{ filters, view, onChangeView, setOpenedFilter }
    }
  );
}
var add_filter_default = forwardRef(AddFilter);
export {
  AddFilterMenu,
  add_filter_default as default
};
//# sourceMappingURL=add-filter.mjs.map
