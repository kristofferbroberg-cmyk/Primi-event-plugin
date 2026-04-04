// packages/dataviews/src/components/dataviews-filters/search-widget.tsx
import * as Ariakit from "@ariakit/react";
import removeAccents from "remove-accents";
import clsx from "clsx";
import { useInstanceId } from "@wordpress/compose";
import { __, sprintf } from "@wordpress/i18n";
import { useState, useMemo, useDeferredValue } from "@wordpress/element";
import {
  VisuallyHidden,
  Icon,
  Composite,
  Spinner
} from "@wordpress/components";
import { search, check } from "@wordpress/icons";
import { getCurrentValue } from "./utils.mjs";
import useElements from "../../hooks/use-elements.mjs";
import { jsx, jsxs } from "react/jsx-runtime";
function normalizeSearchInput(input = "") {
  return removeAccents(input.trim().toLowerCase());
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
  return /* @__PURE__ */ jsx(
    "span",
    {
      className: clsx(
        "dataviews-filters__search-widget-listitem-multi-selection",
        { "is-selected": selected }
      ),
      children: selected && /* @__PURE__ */ jsx(Icon, { icon: check })
    }
  );
};
var SingleSelectionOption = ({ selected }) => {
  return /* @__PURE__ */ jsx(
    "span",
    {
      className: clsx(
        "dataviews-filters__search-widget-listitem-single-selection",
        { "is-selected": selected }
      )
    }
  );
};
function ListBox({ view, filter, onChangeView }) {
  const baseId = useInstanceId(ListBox, "dataviews-filter-list-box");
  const [activeCompositeId, setActiveCompositeId] = useState(
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
  const currentValue = getCurrentValue(filter, currentFilter);
  return /* @__PURE__ */ jsx(
    Composite,
    {
      virtualFocus: true,
      focusLoop: true,
      activeId: activeCompositeId,
      setActiveId: setActiveCompositeId,
      role: "listbox",
      className: "dataviews-filters__search-widget-listbox",
      "aria-label": sprintf(
        /* translators: List of items for a filter. 1: Filter name. e.g.: "List of: Author". */
        __("List of: %1$s"),
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
      render: /* @__PURE__ */ jsx(Composite.Typeahead, {}),
      children: filter.elements.map((element) => /* @__PURE__ */ jsxs(
        Composite.Hover,
        {
          render: /* @__PURE__ */ jsx(
            Composite.Item,
            {
              id: generateFilterElementCompositeItemId(
                baseId,
                element.value
              ),
              render: /* @__PURE__ */ jsx(
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
            filter.singleSelection && /* @__PURE__ */ jsx(
              SingleSelectionOption,
              {
                selected: currentValue === element.value
              }
            ),
            !filter.singleSelection && /* @__PURE__ */ jsx(
              MultiSelectionOption,
              {
                selected: currentValue.includes(element.value)
              }
            ),
            /* @__PURE__ */ jsx(
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
  const [searchValue, setSearchValue] = useState("");
  const deferredSearchValue = useDeferredValue(searchValue);
  const currentFilter = view.filters?.find(
    (_filter) => _filter.field === filter.field
  );
  const currentValue = getCurrentValue(filter, currentFilter);
  const matches = useMemo(() => {
    const normalizedSearch = normalizeSearchInput(deferredSearchValue);
    return filter.elements.filter(
      (item) => normalizeSearchInput(item.label).includes(normalizedSearch)
    );
  }, [filter.elements, deferredSearchValue]);
  return /* @__PURE__ */ jsxs(
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
        /* @__PURE__ */ jsxs("div", { className: "dataviews-filters__search-widget-filter-combobox__wrapper", children: [
          /* @__PURE__ */ jsx(
            Ariakit.ComboboxLabel,
            {
              render: /* @__PURE__ */ jsx(VisuallyHidden, { children: __("Search items") }),
              children: __("Search items")
            }
          ),
          /* @__PURE__ */ jsx(
            Ariakit.Combobox,
            {
              autoSelect: "always",
              placeholder: __("Search"),
              className: "dataviews-filters__search-widget-filter-combobox__input"
            }
          ),
          /* @__PURE__ */ jsx("div", { className: "dataviews-filters__search-widget-filter-combobox__icon", children: /* @__PURE__ */ jsx(Icon, { icon: search }) })
        ] }),
        /* @__PURE__ */ jsxs(
          Ariakit.ComboboxList,
          {
            className: "dataviews-filters__search-widget-filter-combobox-list",
            alwaysVisible: true,
            children: [
              matches.map((element) => {
                return /* @__PURE__ */ jsxs(
                  Ariakit.ComboboxItem,
                  {
                    resetValueOnSelect: false,
                    value: element.value,
                    className: "dataviews-filters__search-widget-listitem",
                    hideOnClick: false,
                    setValueOnClick: false,
                    focusOnHover: true,
                    children: [
                      filter.singleSelection && /* @__PURE__ */ jsx(
                        SingleSelectionOption,
                        {
                          selected: currentValue === element.value
                        }
                      ),
                      !filter.singleSelection && /* @__PURE__ */ jsx(
                        MultiSelectionOption,
                        {
                          selected: currentValue.includes(
                            element.value
                          )
                        }
                      ),
                      /* @__PURE__ */ jsxs(
                        "span",
                        {
                          className: "dataviews-filters__search-widget-listitem-value",
                          title: element.label,
                          children: [
                            /* @__PURE__ */ jsx(
                              Ariakit.ComboboxItemValue,
                              {
                                className: "dataviews-filters__search-widget-filter-combobox-item-value",
                                value: element.label
                              }
                            ),
                            !!element.description && /* @__PURE__ */ jsx("span", { className: "dataviews-filters__search-widget-listitem-description", children: element.description })
                          ]
                        }
                      )
                    ]
                  },
                  element.value
                );
              }),
              !matches.length && /* @__PURE__ */ jsx("p", { children: __("No results found") })
            ]
          }
        )
      ]
    }
  );
}
function SearchWidget(props) {
  const { elements, isLoading } = useElements({
    elements: props.filter.elements,
    getElements: props.filter.getElements
  });
  if (isLoading) {
    return /* @__PURE__ */ jsx("div", { className: "dataviews-filters__search-widget-no-elements", children: /* @__PURE__ */ jsx(Spinner, {}) });
  }
  if (elements.length === 0) {
    return /* @__PURE__ */ jsx("div", { className: "dataviews-filters__search-widget-no-elements", children: __("No elements found") });
  }
  const Widget = elements.length > 10 ? ComboboxList2 : ListBox;
  return /* @__PURE__ */ jsx(Widget, { ...props, filter: { ...props.filter, elements } });
}
export {
  SearchWidget as default
};
//# sourceMappingURL=search-widget.mjs.map
