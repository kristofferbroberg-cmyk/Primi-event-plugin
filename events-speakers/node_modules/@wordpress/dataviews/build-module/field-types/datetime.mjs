// packages/dataviews/src/field-types/datetime.tsx
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
  OPERATOR_OVER
} from "../constants.mjs";
import isValidRequired from "./utils/is-valid-required.mjs";
import render from "./utils/render-default.mjs";
var format = {
  datetime: getSettings().formats.datetime,
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
  let formatDatetime;
  if (field.type !== "datetime") {
    formatDatetime = format;
  } else {
    formatDatetime = field.format;
  }
  return dateI18n(formatDatetime.datetime, getDate(value));
}
var sort = (a, b, direction) => {
  const timeA = new Date(a).getTime();
  const timeB = new Date(b).getTime();
  return direction === "asc" ? timeA - timeB : timeB - timeA;
};
var datetime_default = {
  type: "datetime",
  render,
  Edit: "datetime",
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
    OPERATOR_OVER
  ],
  validOperators: [
    OPERATOR_ON,
    OPERATOR_NOT_ON,
    OPERATOR_BEFORE,
    OPERATOR_AFTER,
    OPERATOR_BEFORE_INC,
    OPERATOR_AFTER_INC,
    OPERATOR_IN_THE_PAST,
    OPERATOR_OVER
  ],
  format,
  getValueFormatted,
  validate: {
    required: isValidRequired,
    elements: isValidElements
  }
};
export {
  datetime_default as default
};
//# sourceMappingURL=datetime.mjs.map
