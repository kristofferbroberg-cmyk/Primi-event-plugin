// packages/dataviews/src/components/dataform-controls/index.tsx
import checkbox from "./checkbox.mjs";
import combobox from "./combobox.mjs";
import datetime from "./datetime.mjs";
import date from "./date.mjs";
import adaptiveSelect from "./adaptive-select.mjs";
import email from "./email.mjs";
import telephone from "./telephone.mjs";
import url from "./url.mjs";
import integer from "./integer.mjs";
import number from "./number.mjs";
import radio from "./radio.mjs";
import select from "./select.mjs";
import text from "./text.mjs";
import toggle from "./toggle.mjs";
import textarea from "./textarea.mjs";
import toggleGroup from "./toggle-group.mjs";
import array from "./array.mjs";
import color from "./color.mjs";
import password from "./password.mjs";
import hasElements from "../../field-types/utils/has-elements.mjs";
import { jsx } from "react/jsx-runtime";
var FORM_CONTROLS = {
  adaptiveSelect,
  array,
  checkbox,
  color,
  combobox,
  datetime,
  date,
  email,
  telephone,
  url,
  integer,
  number,
  password,
  radio,
  select,
  text,
  toggle,
  textarea,
  toggleGroup
};
function isEditConfig(value) {
  return value && typeof value === "object" && typeof value.control === "string";
}
function createConfiguredControl(config) {
  const { control, ...controlConfig } = config;
  const BaseControlType = getControlByType(control);
  if (BaseControlType === null) {
    return null;
  }
  return function ConfiguredControl(props) {
    return /* @__PURE__ */ jsx(BaseControlType, { ...props, config: controlConfig });
  };
}
function getControl(field, fallback) {
  if (typeof field.Edit === "function") {
    return field.Edit;
  }
  if (typeof field.Edit === "string") {
    return getControlByType(field.Edit);
  }
  if (isEditConfig(field.Edit)) {
    return createConfiguredControl(field.Edit);
  }
  if (hasElements(field) && field.type !== "array") {
    return getControlByType("adaptiveSelect");
  }
  if (fallback === null) {
    return null;
  }
  return getControlByType(fallback);
}
function getControlByType(type) {
  if (Object.keys(FORM_CONTROLS).includes(type)) {
    return FORM_CONTROLS[type];
  }
  return null;
}
export {
  getControl,
  getControlByType
};
//# sourceMappingURL=index.mjs.map
