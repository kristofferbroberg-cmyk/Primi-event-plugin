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

// packages/dataviews/src/components/dataviews-filters/add-filter.tsx
var add_filter_exports = {};
__export(add_filter_exports, {
  AddFilterMenu: () => AddFilterMenu,
  default: () => add_filter_default
});
module.exports = __toCommonJS(add_filter_exports);
var import_components = require("@wordpress/components");
var import_i18n = require("@wordpress/i18n");
var import_element = require("@wordpress/element");
var import_lock_unlock = require("../../lock-unlock.cjs");
var import_jsx_runtime = require("react/jsx-runtime");
var { Menu } = (0, import_lock_unlock.unlock)(import_components.privateApis);
function AddFilterMenu({
  filters,
  view,
  onChangeView,
  setOpenedFilter,
  triggerProps
}) {
  const inactiveFilters = filters.filter((filter) => !filter.isVisible);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Menu, { children: [
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu.TriggerButton, { ...triggerProps }),
    /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu.Popover, { children: inactiveFilters.map((filter) => {
      return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
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
          children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Menu.ItemLabel, { children: filter.name })
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
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    AddFilterMenu,
    {
      triggerProps: {
        render: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          import_components.Button,
          {
            accessibleWhenDisabled: true,
            size: "compact",
            className: "dataviews-filters-button",
            variant: "tertiary",
            disabled: !inactiveFilters.length,
            ref
          }
        ),
        children: (0, import_i18n.__)("Add filter")
      },
      ...{ filters, view, onChangeView, setOpenedFilter }
    }
  );
}
var add_filter_default = (0, import_element.forwardRef)(AddFilter);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AddFilterMenu
});
//# sourceMappingURL=add-filter.cjs.map
