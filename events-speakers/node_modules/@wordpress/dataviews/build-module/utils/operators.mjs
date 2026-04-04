// packages/dataviews/src/utils/operators.tsx
import { subDays, subWeeks, subMonths, subYears } from "date-fns";
import { __, sprintf } from "@wordpress/i18n";
import { createInterpolateElement } from "@wordpress/element";
import { getDate } from "@wordpress/date";
import {
  OPERATOR_AFTER,
  OPERATOR_AFTER_INC,
  OPERATOR_BEFORE,
  OPERATOR_BEFORE_INC,
  OPERATOR_BETWEEN,
  OPERATOR_CONTAINS,
  OPERATOR_GREATER_THAN,
  OPERATOR_GREATER_THAN_OR_EQUAL,
  OPERATOR_IN_THE_PAST,
  OPERATOR_IS,
  OPERATOR_IS_ALL,
  OPERATOR_IS_ANY,
  OPERATOR_IS_NONE,
  OPERATOR_IS_NOT,
  OPERATOR_IS_NOT_ALL,
  OPERATOR_LESS_THAN,
  OPERATOR_LESS_THAN_OR_EQUAL,
  OPERATOR_NOT_CONTAINS,
  OPERATOR_NOT_ON,
  OPERATOR_ON,
  OPERATOR_OVER,
  OPERATOR_STARTS_WITH
} from "../constants.mjs";
import { jsx } from "react/jsx-runtime";
var filterTextWrappers = {
  Name: /* @__PURE__ */ jsx("span", { className: "dataviews-filters__summary-filter-text-name" }),
  Value: /* @__PURE__ */ jsx("span", { className: "dataviews-filters__summary-filter-text-value" })
};
function getRelativeDate(value, unit) {
  switch (unit) {
    case "days":
      return subDays(/* @__PURE__ */ new Date(), value);
    case "weeks":
      return subWeeks(/* @__PURE__ */ new Date(), value);
    case "months":
      return subMonths(/* @__PURE__ */ new Date(), value);
    case "years":
      return subYears(/* @__PURE__ */ new Date(), value);
    default:
      return /* @__PURE__ */ new Date();
  }
}
var isNoneOperatorDefinition = {
  /* translators: DataViews operator name */
  label: __("Is none of"),
  filterText: (filter, activeElements) => createInterpolateElement(
    sprintf(
      /* translators: 1: Filter name (e.g. "Author"). 2: Filter value (e.g. "Admin"): "Author is none of: Admin, Editor". */
      __("<Name>%1$s is none of: </Name><Value>%2$s</Value>"),
      filter.name,
      activeElements.map((element) => element.label).join(", ")
    ),
    filterTextWrappers
  ),
  filter: ((item, field, filterValue) => {
    if (!filterValue?.length) {
      return true;
    }
    const fieldValue = field.getValue({ item });
    if (Array.isArray(fieldValue)) {
      return !filterValue.some(
        (fv) => fieldValue.includes(fv)
      );
    } else if (typeof fieldValue === "string") {
      return !filterValue.includes(fieldValue);
    }
    return false;
  }),
  selection: "multi"
};
var OPERATORS = [
  {
    name: OPERATOR_IS_ANY,
    /* translators: DataViews operator name */
    label: __("Includes"),
    filterText: (filter, activeElements) => createInterpolateElement(
      sprintf(
        /* translators: 1: Filter name (e.g. "Author"). 2: Filter value (e.g. "Admin"): "Author is any: Admin, Editor". */
        __("<Name>%1$s includes: </Name><Value>%2$s</Value>"),
        filter.name,
        activeElements.map((element) => element.label).join(", ")
      ),
      filterTextWrappers
    ),
    filter(item, field, filterValue) {
      if (!filterValue?.length) {
        return true;
      }
      const fieldValue = field.getValue({ item });
      if (Array.isArray(fieldValue)) {
        return filterValue.some(
          (fv) => fieldValue.includes(fv)
        );
      } else if (typeof fieldValue === "string") {
        return filterValue.includes(fieldValue);
      }
      return false;
    },
    selection: "multi"
  },
  {
    name: OPERATOR_IS_NONE,
    ...isNoneOperatorDefinition
  },
  {
    name: OPERATOR_IS_ALL,
    /* translators: DataViews operator name */
    label: __("Includes all"),
    filterText: (filter, activeElements) => createInterpolateElement(
      sprintf(
        /* translators: 1: Filter name (e.g. "Author"). 2: Filter value (e.g. "Admin"): "Author includes all: Admin, Editor". */
        __("<Name>%1$s includes all: </Name><Value>%2$s</Value>"),
        filter.name,
        activeElements.map((element) => element.label).join(", ")
      ),
      filterTextWrappers
    ),
    filter(item, field, filterValue) {
      if (!filterValue?.length) {
        return true;
      }
      return filterValue.every((value) => {
        return field.getValue({ item })?.includes(value);
      });
    },
    selection: "multi"
  },
  {
    name: OPERATOR_IS_NOT_ALL,
    ...isNoneOperatorDefinition
  },
  {
    name: OPERATOR_BETWEEN,
    /* translators: DataViews operator name */
    label: __("Between (inc)"),
    filterText: (filter, activeElements) => createInterpolateElement(
      sprintf(
        /* translators: 1: Filter name (e.g. "Item count"). 2: Filter value min. 3: Filter value max. e.g.: "Item count between (inc): 10 and 180". */
        __(
          "<Name>%1$s between (inc): </Name><Value>%2$s and %3$s</Value>"
        ),
        filter.name,
        activeElements[0].label[0],
        activeElements[0].label[1]
      ),
      filterTextWrappers
    ),
    filter(item, field, filterValue) {
      if (!Array.isArray(filterValue) || filterValue.length !== 2 || filterValue[0] === void 0 || filterValue[1] === void 0) {
        return true;
      }
      const fieldValue = field.getValue({ item });
      if (typeof fieldValue === "number" || fieldValue instanceof Date || typeof fieldValue === "string") {
        return fieldValue >= filterValue[0] && fieldValue <= filterValue[1];
      }
      return false;
    },
    selection: "custom"
  },
  {
    name: OPERATOR_IN_THE_PAST,
    /* translators: DataViews operator name */
    label: __("In the past"),
    filterText: (filter, activeElements) => createInterpolateElement(
      sprintf(
        /* translators: 1: Filter name (e.g. "Date"). 2: Filter value (e.g. "7 days"): "Date is in the past: 7 days". */
        __(
          "<Name>%1$s is in the past: </Name><Value>%2$s</Value>"
        ),
        filter.name,
        `${activeElements[0].value.value} ${activeElements[0].value.unit}`
      ),
      filterTextWrappers
    ),
    filter(item, field, filterValue) {
      if (filterValue?.value === void 0 || filterValue?.unit === void 0) {
        return true;
      }
      const targetDate = getRelativeDate(
        filterValue.value,
        filterValue.unit
      );
      const fieldValue = getDate(field.getValue({ item }));
      return fieldValue >= targetDate && fieldValue <= /* @__PURE__ */ new Date();
    },
    selection: "custom"
  },
  {
    name: OPERATOR_OVER,
    /* translators: DataViews operator name */
    label: __("Over"),
    filterText: (filter, activeElements) => createInterpolateElement(
      sprintf(
        /* translators: 1: Filter name (e.g. "Date"). 2: Filter value (e.g. "7 days"): "Date is over: 7 days". */
        __("<Name>%1$s is over: </Name><Value>%2$s</Value>"),
        filter.name,
        `${activeElements[0].value.value} ${activeElements[0].value.unit}`
      ),
      filterTextWrappers
    ),
    filter(item, field, filterValue) {
      if (filterValue?.value === void 0 || filterValue?.unit === void 0) {
        return true;
      }
      const targetDate = getRelativeDate(
        filterValue.value,
        filterValue.unit
      );
      const fieldValue = getDate(field.getValue({ item }));
      return fieldValue < targetDate;
    },
    selection: "custom"
  },
  {
    name: OPERATOR_IS,
    /* translators: DataViews operator name */
    label: __("Is"),
    filterText: (filter, activeElements) => createInterpolateElement(
      sprintf(
        /* translators: 1: Filter name (e.g. "Author"). 2: Filter value (e.g. "Admin"): "Author is: Admin". */
        __("<Name>%1$s is: </Name><Value>%2$s</Value>"),
        filter.name,
        activeElements[0].label
      ),
      filterTextWrappers
    ),
    filter(item, field, filterValue) {
      return filterValue === field.getValue({ item }) || filterValue === void 0;
    },
    selection: "single"
  },
  {
    name: OPERATOR_IS_NOT,
    /* translators: DataViews operator name */
    label: __("Is not"),
    filterText: (filter, activeElements) => createInterpolateElement(
      sprintf(
        /* translators: 1: Filter name (e.g. "Author"). 2: Filter value (e.g. "Admin"): "Author is not: Admin". */
        __("<Name>%1$s is not: </Name><Value>%2$s</Value>"),
        filter.name,
        activeElements[0].label
      ),
      filterTextWrappers
    ),
    filter(item, field, filterValue) {
      return filterValue !== field.getValue({ item });
    },
    selection: "single"
  },
  {
    name: OPERATOR_LESS_THAN,
    /* translators: DataViews operator name */
    label: __("Less than"),
    filterText: (filter, activeElements) => createInterpolateElement(
      sprintf(
        /* translators: 1: Filter name (e.g. "Count"). 2: Filter value (e.g. "10"): "Count is less than: 10". */
        __("<Name>%1$s is less than: </Name><Value>%2$s</Value>"),
        filter.name,
        activeElements[0].label
      ),
      filterTextWrappers
    ),
    filter(item, field, filterValue) {
      if (filterValue === void 0) {
        return true;
      }
      const fieldValue = field.getValue({ item });
      return fieldValue < filterValue;
    },
    selection: "single"
  },
  {
    name: OPERATOR_GREATER_THAN,
    /* translators: DataViews operator name */
    label: __("Greater than"),
    filterText: (filter, activeElements) => createInterpolateElement(
      sprintf(
        /* translators: 1: Filter name (e.g. "Count"). 2: Filter value (e.g. "10"): "Count is greater than: 10". */
        __(
          "<Name>%1$s is greater than: </Name><Value>%2$s</Value>"
        ),
        filter.name,
        activeElements[0].label
      ),
      filterTextWrappers
    ),
    filter(item, field, filterValue) {
      if (filterValue === void 0) {
        return true;
      }
      const fieldValue = field.getValue({ item });
      return fieldValue > filterValue;
    },
    selection: "single"
  },
  {
    name: OPERATOR_LESS_THAN_OR_EQUAL,
    /* translators: DataViews operator name */
    label: __("Less than or equal"),
    filterText: (filter, activeElements) => createInterpolateElement(
      sprintf(
        /* translators: 1: Filter name (e.g. "Count"). 2: Filter value (e.g. "10"): "Count is less than or equal to: 10". */
        __(
          "<Name>%1$s is less than or equal to: </Name><Value>%2$s</Value>"
        ),
        filter.name,
        activeElements[0].label
      ),
      filterTextWrappers
    ),
    filter(item, field, filterValue) {
      if (filterValue === void 0) {
        return true;
      }
      const fieldValue = field.getValue({ item });
      return fieldValue <= filterValue;
    },
    selection: "single"
  },
  {
    name: OPERATOR_GREATER_THAN_OR_EQUAL,
    /* translators: DataViews operator name */
    label: __("Greater than or equal"),
    filterText: (filter, activeElements) => createInterpolateElement(
      sprintf(
        /* translators: 1: Filter name (e.g. "Count"). 2: Filter value (e.g. "10"): "Count is greater than or equal to: 10". */
        __(
          "<Name>%1$s is greater than or equal to: </Name><Value>%2$s</Value>"
        ),
        filter.name,
        activeElements[0].label
      ),
      filterTextWrappers
    ),
    filter(item, field, filterValue) {
      if (filterValue === void 0) {
        return true;
      }
      const fieldValue = field.getValue({ item });
      return fieldValue >= filterValue;
    },
    selection: "single"
  },
  {
    name: OPERATOR_BEFORE,
    /* translators: DataViews operator name */
    label: __("Before"),
    filterText: (filter, activeElements) => createInterpolateElement(
      sprintf(
        /* translators: 1: Filter name (e.g. "Date"). 2: Filter value (e.g. "2024-01-01"): "Date is before: 2024-01-01". */
        __("<Name>%1$s is before: </Name><Value>%2$s</Value>"),
        filter.name,
        activeElements[0].label
      ),
      filterTextWrappers
    ),
    filter(item, field, filterValue) {
      if (filterValue === void 0) {
        return true;
      }
      const filterDate = getDate(filterValue);
      const fieldDate = getDate(field.getValue({ item }));
      return fieldDate < filterDate;
    },
    selection: "single"
  },
  {
    name: OPERATOR_AFTER,
    /* translators: DataViews operator name */
    label: __("After"),
    filterText: (filter, activeElements) => createInterpolateElement(
      sprintf(
        /* translators: 1: Filter name (e.g. "Date"). 2: Filter value (e.g. "2024-01-01"): "Date is after: 2024-01-01". */
        __("<Name>%1$s is after: </Name><Value>%2$s</Value>"),
        filter.name,
        activeElements[0].label
      ),
      filterTextWrappers
    ),
    filter(item, field, filterValue) {
      if (filterValue === void 0) {
        return true;
      }
      const filterDate = getDate(filterValue);
      const fieldDate = getDate(field.getValue({ item }));
      return fieldDate > filterDate;
    },
    selection: "single"
  },
  {
    name: OPERATOR_BEFORE_INC,
    /* translators: DataViews operator name */
    label: __("Before (inc)"),
    filterText: (filter, activeElements) => createInterpolateElement(
      sprintf(
        /* translators: 1: Filter name (e.g. "Date"). 2: Filter value (e.g. "2024-01-01"): "Date is on or before: 2024-01-01". */
        __(
          "<Name>%1$s is on or before: </Name><Value>%2$s</Value>"
        ),
        filter.name,
        activeElements[0].label
      ),
      filterTextWrappers
    ),
    filter(item, field, filterValue) {
      if (filterValue === void 0) {
        return true;
      }
      const filterDate = getDate(filterValue);
      const fieldDate = getDate(field.getValue({ item }));
      return fieldDate <= filterDate;
    },
    selection: "single"
  },
  {
    name: OPERATOR_AFTER_INC,
    /* translators: DataViews operator name */
    label: __("After (inc)"),
    filterText: (filter, activeElements) => createInterpolateElement(
      sprintf(
        /* translators: 1: Filter name (e.g. "Date"). 2: Filter value (e.g. "2024-01-01"): "Date is on or after: 2024-01-01". */
        __(
          "<Name>%1$s is on or after: </Name><Value>%2$s</Value>"
        ),
        filter.name,
        activeElements[0].label
      ),
      filterTextWrappers
    ),
    filter(item, field, filterValue) {
      if (filterValue === void 0) {
        return true;
      }
      const filterDate = getDate(filterValue);
      const fieldDate = getDate(field.getValue({ item }));
      return fieldDate >= filterDate;
    },
    selection: "single"
  },
  {
    name: OPERATOR_CONTAINS,
    /* translators: DataViews operator name */
    label: __("Contains"),
    filterText: (filter, activeElements) => createInterpolateElement(
      sprintf(
        /* translators: 1: Filter name (e.g. "Title"). 2: Filter value (e.g. "Hello"): "Title contains: Hello". */
        __("<Name>%1$s contains: </Name><Value>%2$s</Value>"),
        filter.name,
        activeElements[0].label
      ),
      filterTextWrappers
    ),
    filter(item, field, filterValue) {
      if (filterValue === void 0) {
        return true;
      }
      const fieldValue = field.getValue({ item });
      return typeof fieldValue === "string" && filterValue && fieldValue.toLowerCase().includes(String(filterValue).toLowerCase());
    },
    selection: "single"
  },
  {
    name: OPERATOR_NOT_CONTAINS,
    /* translators: DataViews operator name */
    label: __("Doesn't contain"),
    filterText: (filter, activeElements) => createInterpolateElement(
      sprintf(
        /* translators: 1: Filter name (e.g. "Title"). 2: Filter value (e.g. "Hello"): "Title doesn't contain: Hello". */
        __(
          "<Name>%1$s doesn't contain: </Name><Value>%2$s</Value>"
        ),
        filter.name,
        activeElements[0].label
      ),
      filterTextWrappers
    ),
    filter(item, field, filterValue) {
      if (filterValue === void 0) {
        return true;
      }
      const fieldValue = field.getValue({ item });
      return typeof fieldValue === "string" && filterValue && !fieldValue.toLowerCase().includes(String(filterValue).toLowerCase());
    },
    selection: "single"
  },
  {
    name: OPERATOR_STARTS_WITH,
    /* translators: DataViews operator name */
    label: __("Starts with"),
    filterText: (filter, activeElements) => createInterpolateElement(
      sprintf(
        /* translators: 1: Filter name (e.g. "Title"). 2: Filter value (e.g. "Hello"): "Title starts with: Hello". */
        __("<Name>%1$s starts with: </Name><Value>%2$s</Value>"),
        filter.name,
        activeElements[0].label
      ),
      filterTextWrappers
    ),
    filter(item, field, filterValue) {
      if (filterValue === void 0) {
        return true;
      }
      const fieldValue = field.getValue({ item });
      return typeof fieldValue === "string" && filterValue && fieldValue.toLowerCase().startsWith(String(filterValue).toLowerCase());
    },
    selection: "single"
  },
  {
    name: OPERATOR_ON,
    /* translators: DataViews operator name */
    label: __("On"),
    filterText: (filter, activeElements) => createInterpolateElement(
      sprintf(
        /* translators: 1: Filter name (e.g. "Date"). 2: Filter value (e.g. "2024-01-01"): "Date is: 2024-01-01". */
        __("<Name>%1$s is: </Name><Value>%2$s</Value>"),
        filter.name,
        activeElements[0].label
      ),
      filterTextWrappers
    ),
    filter(item, field, filterValue) {
      if (filterValue === void 0) {
        return true;
      }
      const filterDate = getDate(filterValue);
      const fieldDate = getDate(field.getValue({ item }));
      return filterDate.getTime() === fieldDate.getTime();
    },
    selection: "single"
  },
  {
    name: OPERATOR_NOT_ON,
    /* translators: DataViews operator name */
    label: __("Not on"),
    filterText: (filter, activeElements) => createInterpolateElement(
      sprintf(
        /* translators: 1: Filter name (e.g. "Date"). 2: Filter value (e.g. "2024-01-01"): "Date is not: 2024-01-01". */
        __("<Name>%1$s is not: </Name><Value>%2$s</Value>"),
        filter.name,
        activeElements[0].label
      ),
      filterTextWrappers
    ),
    filter(item, field, filterValue) {
      if (filterValue === void 0) {
        return true;
      }
      const filterDate = getDate(filterValue);
      const fieldDate = getDate(field.getValue({ item }));
      return filterDate.getTime() !== fieldDate.getTime();
    },
    selection: "single"
  }
];
var getOperatorByName = (name) => OPERATORS.find((op) => op.name === name);
var getAllOperatorNames = () => OPERATORS.map((op) => op.name);
var isSingleSelectionOperator = (name) => OPERATORS.filter((op) => op.selection === "single").some(
  (op) => op.name === name
);
var isRegisteredOperator = (name) => OPERATORS.some((op) => op.name === name);
export {
  getAllOperatorNames,
  getOperatorByName,
  isRegisteredOperator,
  isSingleSelectionOperator
};
//# sourceMappingURL=operators.mjs.map
