// packages/dataviews/src/field-types/utils/parse-date-time.ts
import { isValid as isValidDate } from "date-fns";
import { getDate } from "@wordpress/date";
function parseDateTime(dateTimeString) {
  if (!dateTimeString) {
    return null;
  }
  const parsed = getDate(dateTimeString);
  return parsed && isValidDate(parsed) ? parsed : null;
}
export {
  parseDateTime as default
};
//# sourceMappingURL=parse-date-time.mjs.map
