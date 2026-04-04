// packages/dataviews/src/components/dataviews-filters/filter.tsx
import clsx from "clsx";
import {
  Dropdown,
  FlexItem,
  SelectControl,
  Tooltip,
  Icon
} from "@wordpress/components";
import { __, sprintf } from "@wordpress/i18n";
import { useMemo, useRef } from "@wordpress/element";
import { closeSmall } from "@wordpress/icons";
import { Stack } from "@wordpress/ui";
import SearchWidget from "./search-widget.mjs";
import InputWidget from "./input-widget.mjs";
import { getOperatorByName } from "../../utils/operators.mjs";
import useElements from "../../hooks/use-elements.mjs";
import { jsx, jsxs } from "react/jsx-runtime";
var ENTER = "Enter";
var SPACE = " ";
var FilterText = ({
  activeElements,
  filterInView,
  filter
}) => {
  if (activeElements === void 0 || activeElements.length === 0) {
    return filter.name;
  }
  const operator = getOperatorByName(filterInView?.operator);
  if (operator !== void 0) {
    return operator.filterText(filter, activeElements);
  }
  return sprintf(
    /* translators: 1: Filter name e.g.: "Unknown status for Author". */
    __("Unknown status for %1$s"),
    filter.name
  );
};
function OperatorSelector({
  filter,
  view,
  onChangeView
}) {
  const operatorOptions = filter.operators?.map((operator) => ({
    value: operator,
    label: getOperatorByName(operator)?.label || operator
  }));
  const currentFilter = view.filters?.find(
    (_filter) => _filter.field === filter.field
  );
  const value = currentFilter?.operator || filter.operators[0];
  return operatorOptions.length > 1 && /* @__PURE__ */ jsxs(
    Stack,
    {
      direction: "row",
      gap: "sm",
      justify: "flex-start",
      className: "dataviews-filters__summary-operators-container",
      align: "center",
      children: [
        /* @__PURE__ */ jsx(FlexItem, { className: "dataviews-filters__summary-operators-filter-name", children: filter.name }),
        /* @__PURE__ */ jsx(
          SelectControl,
          {
            className: "dataviews-filters__summary-operators-filter-select",
            label: __("Conditions"),
            value,
            options: operatorOptions,
            onChange: (newValue) => {
              const newOperator = newValue;
              const currentOperator = currentFilter?.operator;
              const newFilters = currentFilter ? [
                ...(view.filters ?? []).map(
                  (_filter) => {
                    if (_filter.field === filter.field) {
                      const currentOpSelectionModel = getOperatorByName(
                        currentOperator
                      )?.selection;
                      const newOpSelectionModel = getOperatorByName(
                        newOperator
                      )?.selection;
                      const shouldResetValue = currentOpSelectionModel !== newOpSelectionModel || [
                        currentOpSelectionModel,
                        newOpSelectionModel
                      ].includes("custom");
                      return {
                        ..._filter,
                        value: shouldResetValue ? void 0 : _filter.value,
                        operator: newOperator
                      };
                    }
                    return _filter;
                  }
                )
              ] : [
                ...view.filters ?? [],
                {
                  field: filter.field,
                  operator: newOperator,
                  value: void 0
                }
              ];
              onChangeView({
                ...view,
                page: 1,
                filters: newFilters
              });
            },
            size: "small",
            variant: "minimal",
            hideLabelFromVision: true
          }
        )
      ]
    }
  );
}
function Filter({
  addFilterRef,
  openedFilter,
  fields,
  ...commonProps
}) {
  const toggleRef = useRef(null);
  const { filter, view, onChangeView } = commonProps;
  const filterInView = view.filters?.find(
    (f) => f.field === filter.field
  );
  let activeElements = [];
  const field = useMemo(() => {
    const currentField = fields.find((f) => f.id === filter.field);
    if (currentField) {
      return {
        ...currentField,
        // Configure getValue as if Item was a plain object.
        // See related input-widget.tsx
        getValue: ({ item }) => item[currentField.id]
      };
    }
    return currentField;
  }, [fields, filter.field]);
  const { elements } = useElements({
    elements: filter.elements,
    getElements: filter.getElements
  });
  if (elements.length > 0) {
    activeElements = elements.filter((element) => {
      if (filter.singleSelection) {
        return element.value === filterInView?.value;
      }
      return filterInView?.value?.includes(element.value);
    });
  } else if (Array.isArray(filterInView?.value)) {
    const label = filterInView.value.map((v) => {
      const formattedValue = field?.getValueFormatted({
        item: { [field.id]: v },
        field
      });
      return formattedValue || String(v);
    });
    activeElements = [
      {
        value: filterInView.value,
        // @ts-ignore
        label
      }
    ];
  } else if (typeof filterInView?.value === "object") {
    activeElements = [
      { value: filterInView.value, label: filterInView.value }
    ];
  } else if (filterInView?.value !== void 0) {
    const label = field !== void 0 ? field.getValueFormatted({
      item: { [field.id]: filterInView.value },
      field
    }) : String(filterInView.value);
    activeElements = [
      {
        value: filterInView.value,
        label
      }
    ];
  }
  const isPrimary = filter.isPrimary;
  const isLocked = filterInView?.isLocked;
  const hasValues = !isLocked && filterInView?.value !== void 0;
  const canResetOrRemove = !isLocked && (!isPrimary || hasValues);
  return /* @__PURE__ */ jsx(
    Dropdown,
    {
      defaultOpen: openedFilter === filter.field,
      contentClassName: "dataviews-filters__summary-popover",
      popoverProps: { placement: "bottom-start", role: "dialog" },
      onClose: () => {
        toggleRef.current?.focus();
      },
      renderToggle: ({ isOpen, onToggle }) => /* @__PURE__ */ jsxs("div", { className: "dataviews-filters__summary-chip-container", children: [
        /* @__PURE__ */ jsx(
          Tooltip,
          {
            text: sprintf(
              /* translators: 1: Filter name. */
              __("Filter by: %1$s"),
              filter.name.toLowerCase()
            ),
            placement: "top",
            children: /* @__PURE__ */ jsx(
              "div",
              {
                className: clsx(
                  "dataviews-filters__summary-chip",
                  {
                    "has-reset": canResetOrRemove,
                    "has-values": hasValues,
                    "is-not-clickable": isLocked
                  }
                ),
                role: "button",
                tabIndex: isLocked ? -1 : 0,
                onClick: () => {
                  if (!isLocked) {
                    onToggle();
                  }
                },
                onKeyDown: (event) => {
                  if (!isLocked && [ENTER, SPACE].includes(event.key)) {
                    onToggle();
                    event.preventDefault();
                  }
                },
                "aria-disabled": isLocked,
                "aria-pressed": isOpen,
                "aria-expanded": isOpen,
                ref: toggleRef,
                children: /* @__PURE__ */ jsx(
                  FilterText,
                  {
                    activeElements,
                    filterInView,
                    filter
                  }
                )
              }
            )
          }
        ),
        canResetOrRemove && /* @__PURE__ */ jsx(
          Tooltip,
          {
            text: isPrimary ? __("Reset") : __("Remove"),
            placement: "top",
            children: /* @__PURE__ */ jsx(
              "button",
              {
                className: clsx(
                  "dataviews-filters__summary-chip-remove",
                  { "has-values": hasValues }
                ),
                onClick: () => {
                  onChangeView({
                    ...view,
                    page: 1,
                    filters: view.filters?.filter(
                      (_filter) => _filter.field !== filter.field
                    )
                  });
                  if (!isPrimary) {
                    addFilterRef.current?.focus();
                  } else {
                    toggleRef.current?.focus();
                  }
                },
                children: /* @__PURE__ */ jsx(Icon, { icon: closeSmall })
              }
            )
          }
        )
      ] }),
      renderContent: () => {
        return /* @__PURE__ */ jsxs(Stack, { direction: "column", justify: "flex-start", children: [
          /* @__PURE__ */ jsx(OperatorSelector, { ...commonProps }),
          commonProps.filter.hasElements ? /* @__PURE__ */ jsx(
            SearchWidget,
            {
              ...commonProps,
              filter: {
                ...commonProps.filter,
                elements
              }
            }
          ) : /* @__PURE__ */ jsx(InputWidget, { ...commonProps, fields })
        ] });
      }
    }
  );
}
export {
  Filter as default
};
//# sourceMappingURL=filter.mjs.map
