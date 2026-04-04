// packages/dataviews/src/components/dataviews-filters/use-filters.ts
import { useMemo } from "@wordpress/element";
import {
  isRegisteredOperator,
  isSingleSelectionOperator
} from "../../utils/operators.mjs";
function useFilters(fields, view) {
  return useMemo(() => {
    const filters = [];
    fields.forEach((field) => {
      if (field.filterBy === false || !field.hasElements && !field.Edit) {
        return;
      }
      const operators = field.filterBy.operators;
      const isPrimary = !!field.filterBy?.isPrimary;
      const isLocked = view.filters?.some(
        (f) => f.field === field.id && !!f.isLocked
      ) ?? false;
      filters.push({
        field: field.id,
        name: field.label,
        elements: field.elements,
        getElements: field.getElements,
        hasElements: field.hasElements,
        singleSelection: operators.some(
          (op) => isSingleSelectionOperator(op)
        ),
        operators,
        isVisible: isLocked || isPrimary || !!view.filters?.some(
          (f) => f.field === field.id && isRegisteredOperator(f.operator)
        ),
        isPrimary,
        isLocked
      });
    });
    filters.sort((a, b) => {
      if (a.isLocked && !b.isLocked) {
        return -1;
      }
      if (!a.isLocked && b.isLocked) {
        return 1;
      }
      if (a.isPrimary && !b.isPrimary) {
        return -1;
      }
      if (!a.isPrimary && b.isPrimary) {
        return 1;
      }
      return a.name.localeCompare(b.name);
    });
    return filters;
  }, [fields, view]);
}
var use_filters_default = useFilters;
export {
  use_filters_default as default
};
//# sourceMappingURL=use-filters.mjs.map
