// packages/dataviews/src/field-types/date.tsx
import { dateI18n, getDate, getSettings } from "@wordpress/date";
import isValidElements from "./utils/is-valid-elements.mjs";
import {
  OPERATOR_ON,
  OPERATOR_NOT_ON,
  OPERATOR_BEFORE,
  OPERATOR_AFTER,
  OPERATOR_BEFORE_INC,
  OPERATOR_AFTER_INC,
  OPERATOR_IN_THE_PAST,
  OPERATOR_OVER,
  OPERATOR_BETWEEN
} from "../constants.mjs";
import isValidRequired from "./utils/is-valid-required.mjs";
import render from "./utils/render-default.mjs";
var format = {
  date: getSettings().formats.date,
  weekStartsOn: getSettings().l10n.startOfWeek
};
function getValueFormatted({
  item,
  field
}) {
  const value = field.getValue({ item });
  if (["", void 0, null].includes(value)) {
    return "";
  }
  let formatDate;
  if (field.type !== "date") {
    formatDate = format;
  } else {
    formatDate = field.format;
  }
  return dateI18n(formatDate.date, getDate(value));
}
var sort = (a, b, direction) => {
  const timeA = new Date(a).getTime();
  const timeB = new Date(b).getTime();
  return direction === "asc" ? timeA - timeB : timeB - timeA;
};
var date_default = {
  type: "date",
  render,
  Edit: "date",
  sort,
  enableSorting: true,
  enableGlobalSearch: false,
  defaultOperators: [
    OPERATOR_ON,
    OPERATOR_NOT_ON,
    OPERATOR_BEFORE,
    OPERATOR_AFTER,
    OPERATOR_BEFORE_INC,
    OPERATOR_AFTER_INC,
    OPERATOR_IN_THE_PAST,
    OPERATOR_OVER,
    OPERATOR_BETWEEN
  ],
  validOperators: [
    OPERATOR_ON,
    OPERATOR_NOT_ON,
    OPERATOR_BEFORE,
    OPERATOR_AFTER,
    OPERATOR_BEFORE_INC,
    OPERATOR_AFTER_INC,
    OPERATOR_IN_THE_PAST,
    OPERATOR_OVER,
    OPERATOR_BETWEEN
  ],
  format,
  getValueFormatted,
  validate: {
    required: isValidRequired,
    elements: isValidElements
  }
};
export {
  date_default as default
};
//# sourceMappingURL=date.mjs.map
