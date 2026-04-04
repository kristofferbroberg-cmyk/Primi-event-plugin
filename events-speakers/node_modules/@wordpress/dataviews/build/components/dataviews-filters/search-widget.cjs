"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// packages/dataviews/src/components/dataviews-filters/search-widget.tsx
var search_widget_exports = {};
__export(search_widget_exports, {
  default: () => SearchWidget
});
module.exports = __toCommonJS(search_widget_exports);
var Ariakit = __toESM(require("@ariakit/react"));
var import_remove_accents = __toESM(require("remove-accents"));
var import_clsx = __toESM(require("clsx"));
var import_compose = require("@wordpress/compose");
var import_i18n = require("@wordpress/i18n");
var import_element = require("@wordpress/element");
var import_components = require("@wordpress/components");
var import_icons = require("@wordpress/icons");
var import_utils = require("./utils.cjs");
var import_use_elements = __toESM(require("../../hooks/use-elements.cjs"));
var import_jsx_runtime = require("react/jsx-runtime");
function normalizeSearchInput(input = "") {
  return (0, import_remove_accents.default)(input.trim().toLowerCase());
}
var getNewValue = (filterDefinition, currentFilter, value) => {
  if (filterDefinition.singleSelection) {
    return value;
  }
  if (Array.isArray(currentFilter?.value)) {
    return currentFilter.value.includes(value) ? currentFilter.value.filter((v) => v !== value) : [...currentFilter.value, value];
  }
  return [value];
};
function generateFilterElementCompositeItemId(prefix, filterElementValue) {
  return `${prefix}-${filterElementValue}`;
}
var MultiSelectionOption = ({ selected }) => {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "span",
    {
      className: (0, import_clsx.default)(
        "dataviews-filters__search-widget-listitem-multi-selection",
        { "is-selected": selected }
      ),
      children: selected && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_components.Icon, { icon: import_icons.check })
    }
  );
};
var SingleSelectionOption = ({ selected }) => {
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    "span",
    {
      className: (0, import_clsx.default)(
        "dataviews-filters__search-widget-listitem-single-selection",
        { "is-selected": selected }
      )
    }
  );
};
function ListBox({ view, filter, onChangeView }) {
  const baseId = (0, import_compose.useInstanceId)(ListBox, "dataviews-filter-list-box");
  const [activeCompositeId, setActiveCompositeId] = (0, import_element.useState)(
    // When there are one or less operators, the first item is set as active
    // (by setting the initial `activeId` to `undefined`).
    // With 2 or more operators, the focus is moved on the operators control
    // (by setting the initial `activeId` to `null`), meaning that there won't
    // be an active item initially. Focus is then managed via the
    // `onFocusVisible` callback.
    filter.operators?.length === 1 ? void 0 : null
  );
  const currentFilter = view.filters?.find(
    (f) => f.field === filter.field
  );
  const currentValue = (0, import_utils.getCurrentValue)(filter, currentFilter);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    import_components.Composite,
    {
      virtualFocus: true,
      focusLoop: true,
      activeId: activeCompositeId,
      setActiveId: setActiveCompositeId,
      role: "listbox",
      className: "dataviews-filters__search-widget-listbox",
      "aria-label": (0, import_i18n.sprintf)(
        /* translators: List of items for a filter. 1: Filter name. e.g.: "List of: Author". */
        (0, import_i18n.__)("List of: %1$s"),
        filter.name
      ),
      onFocusVisible: () => {
        if (!activeCompositeId && filter.elements.length) {
          setActiveCompositeId(
            generateFilterElementCompositeItemId(
              baseId,
              filter.elements[0].value
            )
          );
        }
      },
      render: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_components.Composite.Typeahead, {}),
      children: filter.elements.map((element) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
        import_components.Composite.Hover,
        {
          render: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            import_components.Composite.Item,
            {
              id: generateFilterElementCompositeItemId(
                baseId,
                element.value
              ),
              render: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                "div",
                {
                  "aria-label": element.label,
                  role: "option",
                  className: "dataviews-filters__search-widget-listitem"
                }
              ),
              onClick: () => {
                const newFilters = currentFilter ? [
                  ...(view.filters ?? []).map(
                    (_filter) => {
                      if (_filter.field === filter.field) {
                        return {
                          ..._filter,
                          operator: currentFilter.operator || filter.operators[0],
                          value: getNewValue(
                            filter,
                            currentFilter,
                            element.value
                          )
                        };
                      }
                      return _filter;
                    }
                  )
                ] : [
                  ...view.filters ?? [],
                  {
                    field: filter.field,
                    operator: filter.operators[0],
                    value: getNewValue(
                      filter,
                      currentFilter,
                      element.value
                    )
                  }
                ];
                onChangeView({
                  ...view,
                  page: 1,
                  filters: newFilters
                });
              }
            }
          ),
          children: [
            filter.singleSelection && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
              SingleSelectionOption,
              {
                selected: currentValue === element.value
              }
            ),
            !filter.singleSelection && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
              MultiSelectionOption,
              {
                selected: currentValue.includes(element.value)
              }
            ),
            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
              "span",
              {
                className: "dataviews-filters__search-widget-listitem-value",
                title: element.label,
                children: element.label
              }
            )
          ]
        },
        element.value
      ))
    }
  );
}
function ComboboxList2({ view, filter, onChangeView }) {
  const [searchValue, setSearchValue] = (0, import_element.useState)("");
  const deferredSearchValue = (0, import_element.useDeferredValue)(searchValue);
  const currentFilter = view.filters?.find(
    (_filter) => _filter.field === filter.field
  );
  const currentValue = (0, import_utils.getCurrentValue)(filter, currentFilter);
  const matches = (0, import_element.useMemo)(() => {
    const normalizedSearch = normalizeSearchInput(deferredSearchValue);
    return filter.elements.filter(
      (item) => normalizeSearchInput(item.label).includes(normalizedSearch)
    );
  }, [filter.elements, deferredSearchValue]);
  return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
    Ariakit.ComboboxProvider,
    {
      selectedValue: currentValue,
      setSelectedValue: (value) => {
        const newFilters = currentFilter ? [
          ...(view.filters ?? []).map((_filter) => {
            if (_filter.field === filter.field) {
              return {
                ..._filter,
                operator: currentFilter.operator || filter.operators[0],
                value
              };
            }
            return _filter;
          })
        ] : [
          ...view.filters ?? [],
          {
            field: filter.field,
            operator: filter.operators[0],
            value
          }
        ];
        onChangeView({
          ...view,
          page: 1,
          filters: newFilters
        });
      },
      setValue: setSearchValue,
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "dataviews-filters__search-widget-filter-combobox__wrapper", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            Ariakit.ComboboxLabel,
            {
              render: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_components.VisuallyHidden, { children: (0, import_i18n.__)("Search items") }),
              children: (0, import_i18n.__)("Search items")
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            Ariakit.Combobox,
            {
              autoSelect: "always",
              placeholder: (0, import_i18n.__)("Search"),
              className: "dataviews-filters__search-widget-filter-combobox__input"
            }
          ),
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "dataviews-filters__search-widget-filter-combobox__icon", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_components.Icon, { icon: import_icons.search }) })
        ] }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
          Ariakit.ComboboxList,
          {
            className: "dataviews-filters__search-widget-filter-combobox-list",
            alwaysVisible: true,
            children: [
              matches.map((element) => {
                return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
                  Ariakit.ComboboxItem,
                  {
                    resetValueOnSelect: false,
                    value: element.value,
                    className: "dataviews-filters__search-widget-listitem",
                    hideOnClick: false,
                    setValueOnClick: false,
                    focusOnHover: true,
                    children: [
                      filter.singleSelection && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                        SingleSelectionOption,
                        {
                          selected: currentValue === element.value
                        }
                      ),
                      !filter.singleSelection && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                        MultiSelectionOption,
                        {
                          selected: currentValue.includes(
                            element.value
                          )
                        }
                      ),
                      /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
                        "span",
                        {
                          className: "dataviews-filters__search-widget-listitem-value",
                          title: element.label,
                          children: [
                            /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
                              Ariakit.ComboboxItemValue,
                              {
                                className: "dataviews-filters__search-widget-filter-combobox-item-value",
                                value: element.label
                              }
                            ),
                            !!element.description && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "dataviews-filters__search-widget-listitem-description", children: element.description })
                          ]
                        }
                      )
                    ]
                  },
                  element.value
                );
              }),
              !matches.length && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: (0, import_i18n.__)("No results found") })
            ]
          }
        )
      ]
    }
  );
}
function SearchWidget(props) {
  const { elements, isLoading } = (0, import_use_elements.default)({
    elements: props.filter.elements,
    getElements: props.filter.getElements
  });
  if (isLoading) {
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "dataviews-filters__search-widget-no-elements", children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_components.Spinner, {}) });
  }
  if (elements.length === 0) {
    return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "dataviews-filters__search-widget-no-elements", children: (0, import_i18n.__)("No elements found") });
  }
  const Widget = elements.length > 10 ? ComboboxList2 : ListBox;
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Widget, { ...props, filter: { ...props.filter, elements } });
}
//# sourceMappingURL=search-widget.cjs.map
