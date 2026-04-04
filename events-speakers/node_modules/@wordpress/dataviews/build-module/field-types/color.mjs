// packages/dataviews/src/field-types/color.tsx
import { colord } from "colord";
import { __ } from "@wordpress/i18n";
import RenderFromElements from "./utils/render-from-elements.mjs";
import {
  OPERATOR_IS,
  OPERATOR_IS_ANY,
  OPERATOR_IS_NONE,
  OPERATOR_IS_NOT
} from "../constants.mjs";
import isValidElements from "./utils/is-valid-elements.mjs";
import isValidRequired from "./utils/is-valid-required.mjs";
import getValueFormatted from "./utils/get-value-formatted-default.mjs";
import { jsx, jsxs } from "react/jsx-runtime";
function render({ item, field }) {
  if (field.hasElements) {
    return /* @__PURE__ */ jsx(RenderFromElements, { item, field });
  }
  const value = getValueFormatted({ item, field });
  if (!value || !colord(value).isValid()) {
    return value;
  }
  return /* @__PURE__ */ jsxs("div", { style: { display: "flex", alignItems: "center", gap: "8px" }, children: [
    /* @__PURE__ */ jsx(
      "div",
      {
        style: {
          width: "16px",
          height: "16px",
          borderRadius: "50%",
          backgroundColor: value,
          border: "1px solid #ddd",
          flexShrink: 0
        }
      }
    ),
    /* @__PURE__ */ jsx("span", { children: value })
  ] });
}
function isValidCustom(item, field) {
  const value = field.getValue({ item });
  if (![void 0, "", null].includes(value) && !colord(value).isValid()) {
    return __("Value must be a valid color.");
  }
  return null;
}
var sort = (a, b, direction) => {
  const colorA = colord(a);
  const colorB = colord(b);
  if (!colorA.isValid() && !colorB.isValid()) {
    return 0;
  }
  if (!colorA.isValid()) {
    return direction === "asc" ? 1 : -1;
  }
  if (!colorB.isValid()) {
    return direction === "asc" ? -1 : 1;
  }
  const hslA = colorA.toHsl();
  const hslB = colorB.toHsl();
  if (hslA.h !== hslB.h) {
    return direction === "asc" ? hslA.h - hslB.h : hslB.h - hslA.h;
  }
  if (hslA.s !== hslB.s) {
    return direction === "asc" ? hslA.s - hslB.s : hslB.s - hslA.s;
  }
  return direction === "asc" ? hslA.l - hslB.l : hslB.l - hslA.l;
};
var color_default = {
  type: "color",
  render,
  Edit: "color",
  sort,
  enableSorting: true,
  enableGlobalSearch: false,
  defaultOperators: [OPERATOR_IS_ANY, OPERATOR_IS_NONE],
  validOperators: [
    OPERATOR_IS,
    OPERATOR_IS_NOT,
    OPERATOR_IS_ANY,
    OPERATOR_IS_NONE
  ],
  format: {},
  getValueFormatted,
  validate: {
    required: isValidRequired,
    elements: isValidElements,
    custom: isValidCustom
  }
};
export {
  color_default as default
};
//# sourceMappingURL=color.mjs.map
