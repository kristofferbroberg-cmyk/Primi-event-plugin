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

// packages/dataviews/src/utils/operators.tsx
var operators_exports = {};
__export(operators_exports, {
  getAllOperatorNames: () => getAllOperatorNames,
  getOperatorByName: () => getOperatorByName,
  isRegisteredOperator: () => isRegisteredOperator,
  isSingleSelectionOperator: () => isSingleSelectionOperator
});
module.exports = __toCommonJS(operators_exports);
var import_date_fns = require("date-fns");
var import_i18n = require("@wordpress/i18n");
var import_element = require("@wordpress/element");
var import_date = require("@wordpress/date");
var import_constants = require("../constants.cjs");
var import_jsx_runtime = require("react/jsx-runtime");
var filterTextWrappers = {
  Name: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "dataviews-filters__summary-filter-text-name" }),
  Value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { className: "dataviews-filters__summary-filter-text-value" })
};
function getRelativeDate(value, unit) {
  switch (unit) {
    case "days":
      return (0, import_date_fns.subDays)(/* @__PURE__ */ new Date(), value);
    case "weeks":
      return (0, import_date_fns.subWeeks)(/* @__PURE__ */ new Date(), value);
    case "months":
      return (0, import_date_fns.subMonths)(/* @__PURE__ */ new Date(), value);
    case "years":
      return (0, import_date_fns.subYears)(/* @__PURE__ */ new Date(), value);
    default:
      return /* @__PURE__ */ new Date();
  }
}
var isNoneOperatorDefinition = {
  /* translators: DataViews operator name */
  label: (0, import_i18n.__)("Is none of"),
  filterText: (filter, activeElements) => (0, import_element.createInterpolateElement)(
    (0, import_i18n.sprintf)(
      /* translators: 1: Filter name (e.g. "Author"). 2: Filter value (e.g. "Admin"): "Author is none of: Admin, Editor". */
      (0, import_i18n.__)("<Name>%1$s is none of: </Name><Value>%2$s</Value>"),
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
    name: import_constants.OPERATOR_IS_ANY,
    /* translators: DataViews operator name */
    label: (0, import_i18n.__)("Includes"),
    filterText: (filter, activeElements) => (0, import_element.createInterpolateElement)(
      (0, import_i18n.sprintf)(
        /* translators: 1: Filter name (e.g. "Author"). 2: Filter value (e.g. "Admin"): "Author is any: Admin, Editor". */
        (0, import_i18n.__)("<Name>%1$s includes: </Name><Value>%2$s</Value>"),
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
    name: import_constants.OPERATOR_IS_NONE,
    ...isNoneOperatorDefinition
  },
  {
    name: import_constants.OPERATOR_IS_ALL,
    /* translators: DataViews operator name */
    label: (0, import_i18n.__)("Includes all"),
    filterText: (filter, activeElements) => (0, import_element.createInterpolateElement)(
      (0, import_i18n.sprintf)(
        /* translators: 1: Filter name (e.g. "Author"). 2: Filter value (e.g. "Admin"): "Author includes all: Admin, Editor". */
        (0, import_i18n.__)("<Name>%1$s includes all: </Name><Value>%2$s</Value>"),
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
    name: import_constants.OPERATOR_IS_NOT_ALL,
    ...isNoneOperatorDefinition
  },
  {
    name: import_constants.OPERATOR_BETWEEN,
    /* translators: DataViews operator name */
    label: (0, import_i18n.__)("Between (inc)"),
    filterText: (filter, activeElements) => (0, import_element.createInterpolateElement)(
      (0, import_i18n.sprintf)(
        /* translators: 1: Filter name (e.g. "Item count"). 2: Filter value min. 3: Filter value max. e.g.: "Item count between (inc): 10 and 180". */
        (0, import_i18n.__)(
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
    name: import_constants.OPERATOR_IN_THE_PAST,
    /* translators: DataViews operator name */
    label: (0, import_i18n.__)("In the past"),
    filterText: (filter, activeElements) => (0, import_element.createInterpolateElement)(
      (0, import_i18n.sprintf)(
        /* translators: 1: Filter name (e.g. "Date"). 2: Filter value (e.g. "7 days"): "Date is in the past: 7 days". */
        (0, import_i18n.__)(
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
      const fieldValue = (0, import_date.getDate)(field.getValue({ item }));
      return fieldValue >= targetDate && fieldValue <= /* @__PURE__ */ new Date();
    },
    selection: "custom"
  },
  {
    name: import_constants.OPERATOR_OVER,
    /* translators: DataViews operator name */
    label: (0, import_i18n.__)("Over"),
    filterText: (filter, activeElements) => (0, import_element.createInterpolateElement)(
      (0, import_i18n.sprintf)(
        /* translators: 1: Filter name (e.g. "Date"). 2: Filter value (e.g. "7 days"): "Date is over: 7 days". */
        (0, import_i18n.__)("<Name>%1$s is over: </Name><Value>%2$s</Value>"),
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
      const fieldValue = (0, import_date.getDate)(field.getValue({ item }));
      return fieldValue < targetDate;
    },
    selection: "custom"
  },
  {
    name: import_constants.OPERATOR_IS,
    /* translators: DataViews operator name */
    label: (0, import_i18n.__)("Is"),
    filterText: (filter, activeElements) => (0, import_element.createInterpolateElement)(
      (0, import_i18n.sprintf)(
        /* translators: 1: Filter name (e.g. "Author"). 2: Filter value (e.g. "Admin"): "Author is: Admin". */
        (0, import_i18n.__)("<Name>%1$s is: </Name><Value>%2$s</Value>"),
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
    name: import_constants.OPERATOR_IS_NOT,
    /* translators: DataViews operator name */
    label: (0, import_i18n.__)("Is not"),
    filterText: (filter, activeElements) => (0, import_element.createInterpolateElement)(
      (0, import_i18n.sprintf)(
        /* translators: 1: Filter name (e.g. "Author"). 2: Filter value (e.g. "Admin"): "Author is not: Admin". */
        (0, import_i18n.__)("<Name>%1$s is not: </Name><Value>%2$s</Value>"),
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
    name: import_constants.OPERATOR_LESS_THAN,
    /* translators: DataViews operator name */
    label: (0, import_i18n.__)("Less than"),
    filterText: (filter, activeElements) => (0, import_element.createInterpolateElement)(
      (0, import_i18n.sprintf)(
        /* translators: 1: Filter name (e.g. "Count"). 2: Filter value (e.g. "10"): "Count is less than: 10". */
        (0, import_i18n.__)("<Name>%1$s is less than: </Name><Value>%2$s</Value>"),
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
    name: import_constants.OPERATOR_GREATER_THAN,
    /* translators: DataViews operator name */
    label: (0, import_i18n.__)("Greater than"),
    filterText: (filter, activeElements) => (0, import_element.createInterpolateElement)(
      (0, import_i18n.sprintf)(
        /* translators: 1: Filter name (e.g. "Count"). 2: Filter value (e.g. "10"): "Count is greater than: 10". */
        (0, import_i18n.__)(
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
    name: import_constants.OPERATOR_LESS_THAN_OR_EQUAL,
    /* translators: DataViews operator name */
    label: (0, import_i18n.__)("Less than or equal"),
    filterText: (filter, activeElements) => (0, import_element.createInterpolateElement)(
      (0, import_i18n.sprintf)(
        /* translators: 1: Filter name (e.g. "Count"). 2: Filter value (e.g. "10"): "Count is less than or equal to: 10". */
        (0, import_i18n.__)(
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
    name: import_constants.OPERATOR_GREATER_THAN_OR_EQUAL,
    /* translators: DataViews operator name */
    label: (0, import_i18n.__)("Greater than or equal"),
    filterText: (filter, activeElements) => (0, import_element.createInterpolateElement)(
      (0, import_i18n.sprintf)(
        /* translators: 1: Filter name (e.g. "Count"). 2: Filter value (e.g. "10"): "Count is greater than or equal to: 10". */
        (0, import_i18n.__)(
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
    name: import_constants.OPERATOR_BEFORE,
    /* translators: DataViews operator name */
    label: (0, import_i18n.__)("Before"),
    filterText: (filter, activeElements) => (0, import_element.createInterpolateElement)(
      (0, import_i18n.sprintf)(
        /* translators: 1: Filter name (e.g. "Date"). 2: Filter value (e.g. "2024-01-01"): "Date is before: 2024-01-01". */
        (0, import_i18n.__)("<Name>%1$s is before: </Name><Value>%2$s</Value>"),
        filter.name,
        activeElements[0].label
      ),
      filterTextWrappers
    ),
    filter(item, field, filterValue) {
      if (filterValue === void 0) {
        return true;
      }
      const filterDate = (0, import_date.getDate)(filterValue);
      const fieldDate = (0, import_date.getDate)(field.getValue({ item }));
      return fieldDate < filterDate;
    },
    selection: "single"
  },
  {
    name: import_constants.OPERATOR_AFTER,
    /* translators: DataViews operator name */
    label: (0, import_i18n.__)("After"),
    filterText: (filter, activeElements) => (0, import_element.createInterpolateElement)(
      (0, import_i18n.sprintf)(
        /* translators: 1: Filter name (e.g. "Date"). 2: Filter value (e.g. "2024-01-01"): "Date is after: 2024-01-01". */
        (0, import_i18n.__)("<Name>%1$s is after: </Name><Value>%2$s</Value>"),
        filter.name,
        activeElements[0].label
      ),
      filterTextWrappers
    ),
    filter(item, field, filterValue) {
      if (filterValue === void 0) {
        return true;
      }
      const filterDate = (0, import_date.getDate)(filterValue);
      const fieldDate = (0, import_date.getDate)(field.getValue({ item }));
      return fieldDate > filterDate;
    },
    selection: "single"
  },
  {
    name: import_constants.OPERATOR_BEFORE_INC,
    /* translators: DataViews operator name */
    label: (0, import_i18n.__)("Before (inc)"),
    filterText: (filter, activeElements) => (0, import_element.createInterpolateElement)(
      (0, import_i18n.sprintf)(
        /* translators: 1: Filter name (e.g. "Date"). 2: Filter value (e.g. "2024-01-01"): "Date is on or before: 2024-01-01". */
        (0, import_i18n.__)(
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
      const filterDate = (0, import_date.getDate)(filterValue);
      const fieldDate = (0, import_date.getDate)(field.getValue({ item }));
      return fieldDate <= filterDate;
    },
    selection: "single"
  },
  {
    name: import_constants.OPERATOR_AFTER_INC,
    /* translators: DataViews operator name */
    label: (0, import_i18n.__)("After (inc)"),
    filterText: (filter, activeElements) => (0, import_element.createInterpolateElement)(
      (0, import_i18n.sprintf)(
        /* translators: 1: Filter name (e.g. "Date"). 2: Filter value (e.g. "2024-01-01"): "Date is on or after: 2024-01-01". */
        (0, import_i18n.__)(
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
      const filterDate = (0, import_date.getDate)(filterValue);
      const fieldDate = (0, import_date.getDate)(field.getValue({ item }));
      return fieldDate >= filterDate;
    },
    selection: "single"
  },
  {
    name: import_constants.OPERATOR_CONTAINS,
    /* translators: DataViews operator name */
    label: (0, import_i18n.__)("Contains"),
    filterText: (filter, activeElements) => (0, import_element.createInterpolateElement)(
      (0, import_i18n.sprintf)(
        /* translators: 1: Filter name (e.g. "Title"). 2: Filter value (e.g. "Hello"): "Title contains: Hello". */
        (0, import_i18n.__)("<Name>%1$s contains: </Name><Value>%2$s</Value>"),
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
    name: import_constants.OPERATOR_NOT_CONTAINS,
    /* translators: DataViews operator name */
    label: (0, import_i18n.__)("Doesn't contain"),
    filterText: (filter, activeElements) => (0, import_element.createInterpolateElement)(
      (0, import_i18n.sprintf)(
        /* translators: 1: Filter name (e.g. "Title"). 2: Filter value (e.g. "Hello"): "Title doesn't contain: Hello". */
        (0, import_i18n.__)(
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
    name: import_constants.OPERATOR_STARTS_WITH,
    /* translators: DataViews operator name */
    label: (0, import_i18n.__)("Starts with"),
    filterText: (filter, activeElements) => (0, import_element.createInterpolateElement)(
      (0, import_i18n.sprintf)(
        /* translators: 1: Filter name (e.g. "Title"). 2: Filter value (e.g. "Hello"): "Title starts with: Hello". */
        (0, import_i18n.__)("<Name>%1$s starts with: </Name><Value>%2$s</Value>"),
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
    name: import_constants.OPERATOR_ON,
    /* translators: DataViews operator name */
    label: (0, import_i18n.__)("On"),
    filterText: (filter, activeElements) => (0, import_element.createInterpolateElement)(
      (0, import_i18n.sprintf)(
        /* translators: 1: Filter name (e.g. "Date"). 2: Filter value (e.g. "2024-01-01"): "Date is: 2024-01-01". */
        (0, import_i18n.__)("<Name>%1$s is: </Name><Value>%2$s</Value>"),
        filter.name,
        activeElements[0].label
      ),
      filterTextWrappers
    ),
    filter(item, field, filterValue) {
      if (filterValue === void 0) {
        return true;
      }
      const filterDate = (0, import_date.getDate)(filterValue);
      const fieldDate = (0, import_date.getDate)(field.getValue({ item }));
      return filterDate.getTime() === fieldDate.getTime();
    },
    selection: "single"
  },
  {
    name: import_constants.OPERATOR_NOT_ON,
    /* translators: DataViews operator name */
    label: (0, import_i18n.__)("Not on"),
    filterText: (filter, activeElements) => (0, import_element.createInterpolateElement)(
      (0, import_i18n.sprintf)(
        /* translators: 1: Filter name (e.g. "Date"). 2: Filter value (e.g. "2024-01-01"): "Date is not: 2024-01-01". */
        (0, import_i18n.__)("<Name>%1$s is not: </Name><Value>%2$s</Value>"),
        filter.name,
        activeElements[0].label
      ),
      filterTextWrappers
    ),
    filter(item, field, filterValue) {
      if (filterValue === void 0) {
        return true;
      }
      const filterDate = (0, import_date.getDate)(filterValue);
      const fieldDate = (0, import_date.getDate)(field.getValue({ item }));
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
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getAllOperatorNames,
  getOperatorByName,
  isRegisteredOperator,
  isSingleSelectionOperator
});
//# sourceMappingURL=operators.cjs.map
