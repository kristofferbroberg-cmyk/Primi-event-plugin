// packages/components/src/unit-control/utils.ts
import { __, _x } from "@wordpress/i18n";
import { Platform } from "@wordpress/element";
var isWeb = Platform.OS === "web";
var allUnits = {
  px: {
    value: "px",
    label: isWeb ? "px" : __("Pixels (px)"),
    a11yLabel: __("Pixels (px)"),
    step: 1
  },
  "%": {
    value: "%",
    label: isWeb ? "%" : __("Percentage (%)"),
    a11yLabel: __("Percent (%)"),
    step: 0.1
  },
  em: {
    value: "em",
    label: isWeb ? "em" : __("Relative to parent font size (em)"),
    a11yLabel: _x("ems", "Relative to parent font size (em)"),
    step: 0.01
  },
  rem: {
    value: "rem",
    label: isWeb ? "rem" : __("Relative to root font size (rem)"),
    a11yLabel: _x("rems", "Relative to root font size (rem)"),
    step: 0.01
  },
  vw: {
    value: "vw",
    label: isWeb ? "vw" : __("Viewport width (vw)"),
    a11yLabel: __("Viewport width (vw)"),
    step: 0.1
  },
  vh: {
    value: "vh",
    label: isWeb ? "vh" : __("Viewport height (vh)"),
    a11yLabel: __("Viewport height (vh)"),
    step: 0.1
  },
  vmin: {
    value: "vmin",
    label: isWeb ? "vmin" : __("Viewport smallest dimension (vmin)"),
    a11yLabel: __("Viewport smallest dimension (vmin)"),
    step: 0.1
  },
  vmax: {
    value: "vmax",
    label: isWeb ? "vmax" : __("Viewport largest dimension (vmax)"),
    a11yLabel: __("Viewport largest dimension (vmax)"),
    step: 0.1
  },
  ch: {
    value: "ch",
    label: isWeb ? "ch" : __("Width of the zero (0) character (ch)"),
    a11yLabel: __("Width of the zero (0) character (ch)"),
    step: 0.01
  },
  ex: {
    value: "ex",
    label: isWeb ? "ex" : __("x-height of the font (ex)"),
    a11yLabel: __("x-height of the font (ex)"),
    step: 0.01
  },
  cm: {
    value: "cm",
    label: isWeb ? "cm" : __("Centimeters (cm)"),
    a11yLabel: __("Centimeters (cm)"),
    step: 1e-3
  },
  mm: {
    value: "mm",
    label: isWeb ? "mm" : __("Millimeters (mm)"),
    a11yLabel: __("Millimeters (mm)"),
    step: 0.1
  },
  in: {
    value: "in",
    label: isWeb ? "in" : __("Inches (in)"),
    a11yLabel: __("Inches (in)"),
    step: 1e-3
  },
  pc: {
    value: "pc",
    label: isWeb ? "pc" : __("Picas (pc)"),
    a11yLabel: __("Picas (pc)"),
    step: 1
  },
  pt: {
    value: "pt",
    label: isWeb ? "pt" : __("Points (pt)"),
    a11yLabel: __("Points (pt)"),
    step: 1
  },
  svw: {
    value: "svw",
    label: isWeb ? "svw" : __("Small viewport width (svw)"),
    a11yLabel: __("Small viewport width (svw)"),
    step: 0.1
  },
  svh: {
    value: "svh",
    label: isWeb ? "svh" : __("Small viewport height (svh)"),
    a11yLabel: __("Small viewport height (svh)"),
    step: 0.1
  },
  svi: {
    value: "svi",
    label: isWeb ? "svi" : __("Viewport smallest size in the inline direction (svi)"),
    a11yLabel: __("Small viewport width or height (svi)"),
    step: 0.1
  },
  svb: {
    value: "svb",
    label: isWeb ? "svb" : __("Viewport smallest size in the block direction (svb)"),
    a11yLabel: __("Small viewport width or height (svb)"),
    step: 0.1
  },
  svmin: {
    value: "svmin",
    label: isWeb ? "svmin" : __("Small viewport smallest dimension (svmin)"),
    a11yLabel: __("Small viewport smallest dimension (svmin)"),
    step: 0.1
  },
  lvw: {
    value: "lvw",
    label: isWeb ? "lvw" : __("Large viewport width (lvw)"),
    a11yLabel: __("Large viewport width (lvw)"),
    step: 0.1
  },
  lvh: {
    value: "lvh",
    label: isWeb ? "lvh" : __("Large viewport height (lvh)"),
    a11yLabel: __("Large viewport height (lvh)"),
    step: 0.1
  },
  lvi: {
    value: "lvi",
    label: isWeb ? "lvi" : __("Large viewport width or height (lvi)"),
    a11yLabel: __("Large viewport width or height (lvi)"),
    step: 0.1
  },
  lvb: {
    value: "lvb",
    label: isWeb ? "lvb" : __("Large viewport width or height (lvb)"),
    a11yLabel: __("Large viewport width or height (lvb)"),
    step: 0.1
  },
  lvmin: {
    value: "lvmin",
    label: isWeb ? "lvmin" : __("Large viewport smallest dimension (lvmin)"),
    a11yLabel: __("Large viewport smallest dimension (lvmin)"),
    step: 0.1
  },
  dvw: {
    value: "dvw",
    label: isWeb ? "dvw" : __("Dynamic viewport width (dvw)"),
    a11yLabel: __("Dynamic viewport width (dvw)"),
    step: 0.1
  },
  dvh: {
    value: "dvh",
    label: isWeb ? "dvh" : __("Dynamic viewport height (dvh)"),
    a11yLabel: __("Dynamic viewport height (dvh)"),
    step: 0.1
  },
  dvi: {
    value: "dvi",
    label: isWeb ? "dvi" : __("Dynamic viewport width or height (dvi)"),
    a11yLabel: __("Dynamic viewport width or height (dvi)"),
    step: 0.1
  },
  dvb: {
    value: "dvb",
    label: isWeb ? "dvb" : __("Dynamic viewport width or height (dvb)"),
    a11yLabel: __("Dynamic viewport width or height (dvb)"),
    step: 0.1
  },
  dvmin: {
    value: "dvmin",
    label: isWeb ? "dvmin" : __("Dynamic viewport smallest dimension (dvmin)"),
    a11yLabel: __("Dynamic viewport smallest dimension (dvmin)"),
    step: 0.1
  },
  dvmax: {
    value: "dvmax",
    label: isWeb ? "dvmax" : __("Dynamic viewport largest dimension (dvmax)"),
    a11yLabel: __("Dynamic viewport largest dimension (dvmax)"),
    step: 0.1
  },
  svmax: {
    value: "svmax",
    label: isWeb ? "svmax" : __("Small viewport largest dimension (svmax)"),
    a11yLabel: __("Small viewport largest dimension (svmax)"),
    step: 0.1
  },
  lvmax: {
    value: "lvmax",
    label: isWeb ? "lvmax" : __("Large viewport largest dimension (lvmax)"),
    a11yLabel: __("Large viewport largest dimension (lvmax)"),
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
export {
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
};
//# sourceMappingURL=utils.mjs.map
