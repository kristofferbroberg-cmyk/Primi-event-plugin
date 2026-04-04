// packages/dataviews/src/components/dataviews-filters/input-widget.tsx
import fastDeepEqual from "fast-deep-equal/es6/index.js";
import { useEvent } from "@wordpress/compose";
import { useMemo } from "@wordpress/element";
import { Flex } from "@wordpress/components";
import { getCurrentValue } from "./utils.mjs";
import { jsx } from "react/jsx-runtime";
function InputWidget({
  filter,
  view,
  onChangeView,
  fields
}) {
  const currentFilter = view.filters?.find(
    (f) => f.field === filter.field
  );
  const currentValue = getCurrentValue(filter, currentFilter);
  const field = useMemo(() => {
    const currentField = fields.find((f) => f.id === filter.field);
    if (currentField) {
      return {
        ...currentField,
        // Deactivate validation for filters.
        isValid: {},
        // Configure getValue/setValue as if Item was a plain object.
        getValue: ({ item }) => item[currentField.id],
        setValue: ({ value }) => ({
          [currentField.id]: value
        })
      };
    }
    return currentField;
  }, [fields, filter.field]);
  const data = useMemo(() => {
    return (view.filters ?? []).reduce(
      (acc, activeFilter) => {
        acc[activeFilter.field] = activeFilter.value;
        return acc;
      },
      {}
    );
  }, [view.filters]);
  const handleChange = useEvent((updatedData) => {
    if (!field || !currentFilter) {
      return;
    }
    const nextValue = field.getValue({ item: updatedData });
    if (fastDeepEqual(nextValue, currentValue)) {
      return;
    }
    onChangeView({
      ...view,
      filters: (view.filters ?? []).map(
        (_filter) => _filter.field === filter.field ? {
          ..._filter,
          operator: currentFilter.operator || filter.operators[0],
          // Consider empty strings as undefined:
          //
          // - undefined as value means the filter is unset: the filter widget displays no value and the search returns all records
          // - empty string as value means "search empty string": returns only the records that have an empty string as value
          //
          // In practice, this means the filter will not be able to find an empty string as the value.
          value: nextValue === "" ? void 0 : nextValue
        } : _filter
      )
    });
  });
  if (!field || !field.Edit || !currentFilter) {
    return null;
  }
  return /* @__PURE__ */ jsx(
    Flex,
    {
      className: "dataviews-filters__user-input-widget",
      gap: 2.5,
      direction: "column",
      children: /* @__PURE__ */ jsx(
        field.Edit,
        {
          hideLabelFromVision: true,
          data,
          field,
          operator: currentFilter.operator,
          onChange: handleChange
        }
      )
    }
  );
}
export {
  InputWidget as default
};
//# sourceMappingURL=input-widget.mjs.map
