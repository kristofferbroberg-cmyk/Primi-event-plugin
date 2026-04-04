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

// packages/dataviews/src/components/dataviews-filters/filter.tsx
var filter_exports = {};
__export(filter_exports, {
  default: () => Filter
});
module.exports = __toCommonJS(filter_exports);
var import_clsx = __toESM(require("clsx"));
var import_components = require("@wordpress/components");
var import_i18n = require("@wordpress/i18n");
var import_element = require("@wordpress/element");
var import_icons = require("@wordpress/icons");
var import_ui = require("@wordpress/ui");
var import_search_widget = __toESM(require("./search-widget.cjs"));
var import_input_widget = __toESM(require("./input-widget.cjs"));
var import_operators = require("../../utils/operators.cjs");
var import_use_elements = __toESM(require("../../hooks/use-elements.cjs"));
var import_jsx_runtime = require("react/jsx-runtime");
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
  const operator = (0, import_operators.getOperatorByName)(filterInView?.operator);
  if (operator !== void 0) {
    return operator.filterText(filter, activeElements);
  }
  return (0, import_i18n.sprintf)(
    /* translators: 1: Filter name e.g.: "Unknown status for Author". */
    (0, import_i18n.__)("Unknown status for %1$s"),
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
    label: (0, import_operators.getOperatorByName)(operator)?.label || operator
  }));
  const currentFilter = view.filters?.find(
    (_filter) => _filter.field === filter.field
  );
  const value = currentFilter?.operator || filter.operators[0];
  return operatorOptions.length > 1 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(
    import_ui.Stack,
    {
      direction: "row",
      gap: "sm",
      justify: "flex-start",
      className: "dataviews-filters__summary-operators-container",
      align: "center",
      children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_components.FlexItem, { className: "dataviews-filters__summary-operators-filter-name", children: filter.name }),
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          import_components.SelectControl,
          {
            className: "dataviews-filters__summary-operators-filter-select",
            label: (0, import_i18n.__)("Conditions"),
            value,
            options: operatorOptions,
            onChange: (newValue) => {
              const newOperator = newValue;
              const currentOperator = currentFilter?.operator;
              const newFilters = currentFilter ? [
                ...(view.filters ?? []).map(
                  (_filter) => {
                    if (_filter.field === filter.field) {
                      const currentOpSelectionModel = (0, import_operators.getOperatorByName)(
                        currentOperator
                      )?.selection;
                      const newOpSelectionModel = (0, import_operators.getOperatorByName)(
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
  const toggleRef = (0, import_element.useRef)(null);
  const { filter, view, onChangeView } = commonProps;
  const filterInView = view.filters?.find(
    (f) => f.field === filter.field
  );
  let activeElements = [];
  const field = (0, import_element.useMemo)(() => {
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
  const { elements } = (0, import_use_elements.default)({
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
  return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
    import_components.Dropdown,
    {
      defaultOpen: openedFilter === filter.field,
      contentClassName: "dataviews-filters__summary-popover",
      popoverProps: { placement: "bottom-start", role: "dialog" },
      onClose: () => {
        toggleRef.current?.focus();
      },
      renderToggle: ({ isOpen, onToggle }) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { className: "dataviews-filters__summary-chip-container", children: [
        /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          import_components.Tooltip,
          {
            text: (0, import_i18n.sprintf)(
              /* translators: 1: Filter name. */
              (0, import_i18n.__)("Filter by: %1$s"),
              filter.name.toLowerCase()
            ),
            placement: "top",
            children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
              "div",
              {
                className: (0, import_clsx.default)(
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
                children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
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
        canResetOrRemove && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
          import_components.Tooltip,
          {
            text: isPrimary ? (0, import_i18n.__)("Reset") : (0, import_i18n.__)("Remove"),
            placement: "top",
            children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
              "button",
              {
                className: (0, import_clsx.default)(
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
                children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_components.Icon, { icon: import_icons.closeSmall })
              }
            )
          }
        )
      ] }),
      renderContent: () => {
        return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_ui.Stack, { direction: "column", justify: "flex-start", children: [
          /* @__PURE__ */ (0, import_jsx_runtime.jsx)(OperatorSelector, { ...commonProps }),
          commonProps.filter.hasElements ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(
            import_search_widget.default,
            {
              ...commonProps,
              filter: {
                ...commonProps.filter,
                elements
              }
            }
          ) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_input_widget.default, { ...commonProps, fields })
        ] });
      }
    }
  );
}
//# sourceMappingURL=filter.cjs.map
