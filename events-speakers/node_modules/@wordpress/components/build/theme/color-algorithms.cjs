"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// packages/components/src/theme/color-algorithms.ts
var color_algorithms_exports = {};
__export(color_algorithms_exports, {
  checkContrasts: () => checkContrasts,
  generateShades: () => generateShades,
  generateThemeVariables: () => generateThemeVariables
});
module.exports = __toCommonJS(color_algorithms_exports);
var import_colord = require("colord");
var import_a11y = __toESM(require("colord/plugins/a11y"));
var import_names = __toESM(require("colord/plugins/names"));
var import_warning = __toESM(require("@wordpress/warning"));
var import_utils = require("../utils/index.cjs");
(0, import_colord.extend)([import_names.default, import_a11y.default]);
function generateThemeVariables(inputs) {
  validateInputs(inputs);
  const generatedColors = {
    ...generateAccentDependentColors(inputs.accent),
    ...generateBackgroundDependentColors(inputs.background)
  };
  warnContrastIssues(checkContrasts(inputs, generatedColors));
  return {
    colors: generatedColors
  };
}
function validateInputs(inputs) {
  for (const [key, value] of Object.entries(inputs)) {
    if (typeof value !== "undefined" && !(0, import_colord.colord)(value).isValid()) {
      globalThis.SCRIPT_DEBUG === true ? (0, import_warning.default)(`wp.components.Theme: "${value}" is not a valid color value for the '${key}' prop.`) : void 0;
    }
  }
}
function checkContrasts(inputs, outputs) {
  const background = inputs.background || import_utils.COLORS.white;
  const accent = inputs.accent || "#3858e9";
  const foreground = outputs.foreground || import_utils.COLORS.gray[900];
  const gray = outputs.gray || import_utils.COLORS.gray;
  return {
    accent: (0, import_colord.colord)(background).isReadable(accent) ? void 0 : `The background color ("${background}") does not have sufficient contrast against the accent color ("${accent}").`,
    foreground: (0, import_colord.colord)(background).isReadable(foreground) ? void 0 : `The background color provided ("${background}") does not have sufficient contrast against the standard foreground colors.`,
    grays: (0, import_colord.colord)(background).contrast(gray[600]) >= 3 && (0, import_colord.colord)(background).contrast(gray[700]) >= 4.5 ? void 0 : `The background color provided ("${background}") cannot generate a set of grayscale foreground colors with sufficient contrast. Try adjusting the color to be lighter or darker.`
  };
}
function warnContrastIssues(issues) {
  for (const error of Object.values(issues)) {
    if (error) {
      globalThis.SCRIPT_DEBUG === true ? (0, import_warning.default)("wp.components.Theme: " + error) : void 0;
    }
  }
}
function generateAccentDependentColors(accent) {
  if (!accent) {
    return {};
  }
  return {
    accent,
    accentDarker10: (0, import_colord.colord)(accent).darken(0.1).toHex(),
    accentDarker20: (0, import_colord.colord)(accent).darken(0.2).toHex(),
    accentInverted: getForegroundForColor(accent)
  };
}
function generateBackgroundDependentColors(background) {
  if (!background) {
    return {};
  }
  const foreground = getForegroundForColor(background);
  return {
    background,
    foreground,
    foregroundInverted: getForegroundForColor(foreground),
    gray: generateShades(background, foreground)
  };
}
function getForegroundForColor(color) {
  return (0, import_colord.colord)(color).isDark() ? import_utils.COLORS.white : import_utils.COLORS.gray[900];
}
function generateShades(background, foreground) {
  const SHADES = {
    100: 0.06,
    200: 0.121,
    300: 0.132,
    400: 0.2,
    600: 0.42,
    700: 0.543,
    800: 0.821
  };
  const limit = 0.884;
  const direction = (0, import_colord.colord)(background).isDark() ? "lighten" : "darken";
  const range = Math.abs((0, import_colord.colord)(background).toHsl().l - (0, import_colord.colord)(foreground).toHsl().l) / 100;
  const result = {};
  Object.entries(SHADES).forEach(([key, value]) => {
    result[parseInt(key)] = (0, import_colord.colord)(background)[direction](value / limit * range).toHex();
  });
  return result;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  checkContrasts,
  generateShades,
  generateThemeVariables
});
//# sourceMappingURL=color-algorithms.cjs.map
