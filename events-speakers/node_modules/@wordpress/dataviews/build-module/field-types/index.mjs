// packages/dataviews/src/field-types/index.tsx
import { getControl } from "../components/dataform-controls/index.mjs";
import getFilterBy from "./utils/get-filter-by.mjs";
import getValueFromId from "./utils/get-value-from-id.mjs";
import hasElements from "./utils/has-elements.mjs";
import setValueFromId from "./utils/set-value-from-id.mjs";
import { default as email } from "./email.mjs";
import { default as integer } from "./integer.mjs";
import { default as number } from "./number.mjs";
import { default as text } from "./text.mjs";
import { default as datetime } from "./datetime.mjs";
import { default as date } from "./date.mjs";
import { default as boolean } from "./boolean.mjs";
import { default as media } from "./media.mjs";
import { default as array } from "./array.mjs";
import { default as password } from "./password.mjs";
import { default as telephone } from "./telephone.mjs";
import { default as color } from "./color.mjs";
import { default as url } from "./url.mjs";
import { default as noType } from "./no-type.mjs";
import getIsValid from "./utils/get-is-valid.mjs";
import getFilter from "./utils/get-filter.mjs";
import getFormat from "./utils/get-format.mjs";
function getFieldTypeByName(type) {
  const found = [
    email,
    integer,
    number,
    text,
    datetime,
    date,
    boolean,
    media,
    array,
    password,
    telephone,
    color,
    url
  ].find((fieldType) => fieldType?.type === type);
  if (!!found) {
    return found;
  }
  return noType;
}
function normalizeFields(fields) {
  return fields.map((field) => {
    const fieldType = getFieldTypeByName(field.type);
    const getValue = field.getValue || getValueFromId(field.id);
    const sort = function(a, b, direction) {
      const aValue = getValue({ item: a });
      const bValue = getValue({ item: b });
      return field.sort ? field.sort(aValue, bValue, direction) : fieldType.sort(aValue, bValue, direction);
    };
    return {
      id: field.id,
      label: field.label || field.id,
      header: field.header || field.label || field.id,
      description: field.description,
      placeholder: field.placeholder,
      getValue,
      setValue: field.setValue || setValueFromId(field.id),
      elements: field.elements,
      getElements: field.getElements,
      hasElements: hasElements(field),
      isVisible: field.isVisible,
      enableHiding: field.enableHiding ?? true,
      readOnly: field.readOnly ?? false,
      // The type provides defaults for the following props
      type: fieldType.type,
      render: field.render ?? fieldType.render,
      Edit: getControl(field, fieldType.Edit),
      sort,
      enableSorting: field.enableSorting ?? fieldType.enableSorting,
      enableGlobalSearch: field.enableGlobalSearch ?? fieldType.enableGlobalSearch,
      isValid: getIsValid(field, fieldType),
      filterBy: getFilterBy(
        field,
        fieldType.defaultOperators,
        fieldType.validOperators
      ),
      filter: getFilter(fieldType),
      format: getFormat(field, fieldType),
      getValueFormatted: field.getValueFormatted ?? fieldType.getValueFormatted
    };
  });
}
export {
  normalizeFields as default
};
//# sourceMappingURL=index.mjs.map
