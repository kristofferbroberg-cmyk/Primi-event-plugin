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

// packages/components/src/unit-control/utils.ts
var utils_exports = {};
__export(utils_exports, {
  ALL_CSS_UNITS: () => ALL_CSS_UNITS,
  CSS_UNITS: () => CSS_UNITS,
  DEFAULT_UNIT: () => DEFAULT_UNIT,
  filterUnitsWithSettings: () => filterUnitsWithSettings,
  getAccessibleLabelForUnit: () => getAccessibleLabelForUnit,
  getParsedQuantityAndUnit: () => getParsedQuantityAndUnit,
  getUnitsWithCurrentUnit: () => getUnitsWithCurrentUnit,
  getValidParsedQuantityAndUnit: () => getValidParsedQuantityAndUnit,
  hasUnits: () => hasUnits,
  parseQuantityAndUnitFromRawValue: () => parseQuantityAndUnitFromRawValue,
  useCustomUnits: () => useCustomUnits
});
module.exports = __toCommonJS(utils_exports);
var import_i18n = require("@wordpress/i18n");
var import_element = require("@wordpress/element");
var isWeb = import_element.Platform.OS === "web";
var allUnits = {
  px: {
    value: "px",
    label: isWeb ? "px" : (0, import_i18n.__)("Pixels (px)"),
    a11yLabel: (0, import_i18n.__)("Pixels (px)"),
    step: 1
  },
  "%": {
    value: "%",
    label: isWeb ? "%" : (0, import_i18n.__)("Percentage (%)"),
    a11yLabel: (0, import_i18n.__)("Percent (%)"),
    step: 0.1
  },
  em: {
    value: "em",
    label: isWeb ? "em" : (0, import_i18n.__)("Relative to parent font size (em)"),
    a11yLabel: (0, import_i18n._x)("ems", "Relative to parent font size (em)"),
    step: 0.01
  },
  rem: {
    value: "rem",
    label: isWeb ? "rem" : (0, import_i18n.__)("Relative to root font size (rem)"),
    a11yLabel: (0, import_i18n._x)("rems", "Relative to root font size (rem)"),
    step: 0.01
  },
  vw: {
    value: "vw",
    label: isWeb ? "vw" : (0, import_i18n.__)("Viewport width (vw)"),
    a11yLabel: (0, import_i18n.__)("Viewport width (vw)"),
    step: 0.1
  },
  vh: {
    value: "vh",
    label: isWeb ? "vh" : (0, import_i18n.__)("Viewport height (vh)"),
    a11yLabel: (0, import_i18n.__)("Viewport height (vh)"),
    step: 0.1
  },
  vmin: {
    value: "vmin",
    label: isWeb ? "vmin" : (0, import_i18n.__)("Viewport smallest dimension (vmin)"),
    a11yLabel: (0, import_i18n.__)("Viewport smallest dimension (vmin)"),
    step: 0.1
  },
  vmax: {
    value: "vmax",
    label: isWeb ? "vmax" : (0, import_i18n.__)("Viewport largest dimension (vmax)"),
    a11yLabel: (0, import_i18n.__)("Viewport largest dimension (vmax)"),
    step: 0.1
  },
  ch: {
    value: "ch",
    label: isWeb ? "ch" : (0, import_i18n.__)("Width of the zero (0) character (ch)"),
    a11yLabel: (0, import_i18n.__)("Width of the zero (0) character (ch)"),
    step: 0.01
  },
  ex: {
    value: "ex",
    label: isWeb ? "ex" : (0, import_i18n.__)("x-height of the font (ex)"),
    a11yLabel: (0, import_i18n.__)("x-height of the font (ex)"),
    step: 0.01
  },
  cm: {
    value: "cm",
    label: isWeb ? "cm" : (0, import_i18n.__)("Centimeters (cm)"),
    a11yLabel: (0, import_i18n.__)("Centimeters (cm)"),
    step: 1e-3
  },
  mm: {
    value: "mm",
    label: isWeb ? "mm" : (0, import_i18n.__)("Millimeters (mm)"),
    a11yLabel: (0, import_i18n.__)("Millimeters (mm)"),
    step: 0.1
  },
  in: {
    value: "in",
    label: isWeb ? "in" : (0, import_i18n.__)("Inches (in)"),
    a11yLabel: (0, import_i18n.__)("Inches (in)"),
    step: 1e-3
  },
  pc: {
    value: "pc",
    label: isWeb ? "pc" : (0, import_i18n.__)("Picas (pc)"),
    a11yLabel: (0, import_i18n.__)("Picas (pc)"),
    step: 1
  },
  pt: {
    value: "pt",
    label: isWeb ? "pt" : (0, import_i18n.__)("Points (pt)"),
    a11yLabel: (0, import_i18n.__)("Points (pt)"),
    step: 1
  },
  svw: {
    value: "svw",
    label: isWeb ? "svw" : (0, import_i18n.__)("Small viewport width (svw)"),
    a11yLabel: (0, import_i18n.__)("Small viewport width (svw)"),
    step: 0.1
  },
  svh: {
    value: "svh",
    label: isWeb ? "svh" : (0, import_i18n.__)("Small viewport height (svh)"),
    a11yLabel: (0, import_i18n.__)("Small viewport height (svh)"),
    step: 0.1
  },
  svi: {
    value: "svi",
    label: isWeb ? "svi" : (0, import_i18n.__)("Viewport smallest size in the inline direction (svi)"),
    a11yLabel: (0, import_i18n.__)("Small viewport width or height (svi)"),
    step: 0.1
  },
  svb: {
    value: "svb",
    label: isWeb ? "svb" : (0, import_i18n.__)("Viewport smallest size in the block direction (svb)"),
    a11yLabel: (0, import_i18n.__)("Small viewport width or height (svb)"),
    step: 0.1
  },
  svmin: {
    value: "svmin",
    label: isWeb ? "svmin" : (0, import_i18n.__)("Small viewport smallest dimension (svmin)"),
    a11yLabel: (0, import_i18n.__)("Small viewport smallest dimension (svmin)"),
    step: 0.1
  },
  lvw: {
    value: "lvw",
    label: isWeb ? "lvw" : (0, import_i18n.__)("Large viewport width (lvw)"),
    a11yLabel: (0, import_i18n.__)("Large viewport width (lvw)"),
    step: 0.1
  },
  lvh: {
    value: "lvh",
    label: isWeb ? "lvh" : (0, import_i18n.__)("Large viewport height (lvh)"),
    a11yLabel: (0, import_i18n.__)("Large viewport height (lvh)"),
    step: 0.1
  },
  lvi: {
    value: "lvi",
    label: isWeb ? "lvi" : (0, import_i18n.__)("Large viewport width or height (lvi)"),
    a11yLabel: (0, import_i18n.__)("Large viewport width or height (lvi)"),
    step: 0.1
  },
  lvb: {
    value: "lvb",
    label: isWeb ? "lvb" : (0, import_i18n.__)("Large viewport width or height (lvb)"),
    a11yLabel: (0, import_i18n.__)("Large viewport width or height (lvb)"),
    step: 0.1
  },
  lvmin: {
    value: "lvmin",
    label: isWeb ? "lvmin" : (0, import_i18n.__)("Large viewport smallest dimension (lvmin)"),
    a11yLabel: (0, import_i18n.__)("Large viewport smallest dimension (lvmin)"),
    step: 0.1
  },
  dvw: {
    value: "dvw",
    label: isWeb ? "dvw" : (0, import_i18n.__)("Dynamic viewport width (dvw)"),
    a11yLabel: (0, import_i18n.__)("Dynamic viewport width (dvw)"),
    step: 0.1
  },
  dvh: {
    value: "dvh",
    label: isWeb ? "dvh" : (0, import_i18n.__)("Dynamic viewport height (dvh)"),
    a11yLabel: (0, import_i18n.__)("Dynamic viewport height (dvh)"),
    step: 0.1
  },
  dvi: {
    value: "dvi",
    label: isWeb ? "dvi" : (0, import_i18n.__)("Dynamic viewport width or height (dvi)"),
    a11yLabel: (0, import_i18n.__)("Dynamic viewport width or height (dvi)"),
    step: 0.1
  },
  dvb: {
    value: "dvb",
    label: isWeb ? "dvb" : (0, import_i18n.__)("Dynamic viewport width or height (dvb)"),
    a11yLabel: (0, import_i18n.__)("Dynamic viewport width or height (dvb)"),
    step: 0.1
  },
  dvmin: {
    value: "dvmin",
    label: isWeb ? "dvmin" : (0, import_i18n.__)("Dynamic viewport smallest dimension (dvmin)"),
    a11yLabel: (0, import_i18n.__)("Dynamic viewport smallest dimension (dvmin)"),
    step: 0.1
  },
  dvmax: {
    value: "dvmax",
    label: isWeb ? "dvmax" : (0, import_i18n.__)("Dynamic viewport largest dimension (dvmax)"),
    a11yLabel: (0, import_i18n.__)("Dynamic viewport largest dimension (dvmax)"),
    step: 0.1
  },
  svmax: {
    value: "svmax",
    label: isWeb ? "svmax" : (0, import_i18n.__)("Small viewport largest dimension (svmax)"),
    a11yLabel: (0, import_i18n.__)("Small viewport largest dimension (svmax)"),
    step: 0.1
  },
  lvmax: {
    value: "lvmax",
    label: isWeb ? "lvmax" : (0, import_i18n.__)("Large viewport largest dimension (lvmax)"),
    a11yLabel: (0, import_i18n.__)("Large viewport largest dimension (lvmax)"),
    step: 0.1
  }
};
var ALL_CSS_UNITS = Object.values(allUnits);
var CSS_UNITS = [allUnits.px, allUnits["%"], allUnits.em, allUnits.rem, allUnits.vw, allUnits.vh];
var DEFAULT_UNIT = allUnits.px;
function getParsedQuantityAndUnit(rawValue, fallbackUnit, allowedUnits) {
  const initialValue = fallbackUnit ? `${rawValue ?? ""}${fallbackUnit}` : rawValue;
  return parseQuantityAndUnitFromRawValue(initialValue, allowedUnits);
}
function hasUnits(units) {
  return Array.isArray(units) && !!units.length;
}
function parseQuantityAndUnitFromRawValue(rawValue, allowedUnits = ALL_CSS_UNITS) {
  let trimmedValue;
  let quantityToReturn;
  if (typeof rawValue !== "undefined" || rawValue === null) {
    trimmedValue = `${rawValue}`.trim();
    const parsedQuantity = parseFloat(trimmedValue);
    quantityToReturn = !isFinite(parsedQuantity) ? void 0 : parsedQuantity;
  }
  const unitMatch = trimmedValue?.match(/[\d.\-\+]*\s*(.*)/);
  const matchedUnit = unitMatch?.[1]?.toLowerCase();
  let unitToReturn;
  if (hasUnits(allowedUnits)) {
    const match = allowedUnits.find((item) => item.value === matchedUnit);
    unitToReturn = match?.value;
  } else {
    unitToReturn = DEFAULT_UNIT.value;
  }
  return [quantityToReturn, unitToReturn];
}
function getValidParsedQuantityAndUnit(rawValue, allowedUnits, fallbackQuantity, fallbackUnit) {
  const [parsedQuantity, parsedUnit] = parseQuantityAndUnitFromRawValue(rawValue, allowedUnits);
  const quantityToReturn = parsedQuantity ?? fallbackQuantity;
  let unitToReturn = parsedUnit || fallbackUnit;
  if (!unitToReturn && hasUnits(allowedUnits)) {
    unitToReturn = allowedUnits[0].value;
  }
  return [quantityToReturn, unitToReturn];
}
function getAccessibleLabelForUnit(unit) {
  const match = ALL_CSS_UNITS.find((item) => item.value === unit);
  return match?.a11yLabel ? match?.a11yLabel : match?.value;
}
function filterUnitsWithSettings(allowedUnitValues = [], availableUnits) {
  return Array.isArray(availableUnits) ? availableUnits.filter((unit) => allowedUnitValues.includes(unit.value)) : [];
}
var useCustomUnits = ({
  units = ALL_CSS_UNITS,
  availableUnits = [],
  defaultValues
}) => {
  const customUnitsToReturn = filterUnitsWithSettings(availableUnits, units);
  if (!defaultValues) {
    return customUnitsToReturn;
  }
  return customUnitsToReturn.map((unit) => {
    const [defaultValue] = defaultValues[unit.value] ? parseQuantityAndUnitFromRawValue(defaultValues[unit.value]) : [];
    return {
      ...unit,
      default: defaultValue
    };
  });
};
function getUnitsWithCurrentUnit(rawValue, legacyUnit, units = ALL_CSS_UNITS) {
  const unitsToReturn = Array.isArray(units) ? [...units] : [];
  const [, currentUnit] = getParsedQuantityAndUnit(rawValue, legacyUnit, ALL_CSS_UNITS);
  if (currentUnit && !unitsToReturn.some((unit) => unit.value === currentUnit)) {
    if (allUnits[currentUnit]) {
      unitsToReturn.unshift(allUnits[currentUnit]);
    }
  }
  return unitsToReturn;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ALL_CSS_UNITS,
  CSS_UNITS,
  DEFAULT_UNIT,
  filterUnitsWithSettings,
  getAccessibleLabelForUnit,
  getParsedQuantityAndUnit,
  getUnitsWithCurrentUnit,
  getValidParsedQuantityAndUnit,
  hasUnits,
  parseQuantityAndUnitFromRawValue,
  useCustomUnits
});
//# sourceMappingURL=utils.cjs.map
