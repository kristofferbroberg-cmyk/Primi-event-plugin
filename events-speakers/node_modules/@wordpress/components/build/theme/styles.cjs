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

// packages/components/src/theme/styles.ts
var styles_exports = {};
__export(styles_exports, {
  Wrapper: () => Wrapper,
  colorVariables: () => colorVariables
});
module.exports = __toCommonJS(styles_exports);
var import_base = __toESM(require("@emotion/styled/base"));
var import_react = require("@emotion/react");
function _EMOTION_STRINGIFIED_CSS_ERROR__() {
  return "You have tried to stringify object returned from `css` function. It isn't supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop).";
}
var colorVariables = ({
  colors
}) => {
  const shades = Object.entries(colors.gray || {}).map(([k, v]) => `--wp-components-color-gray-${k}: ${v};`).join("");
  return [/* @__PURE__ */ (0, import_react.css)("--wp-components-color-accent:", colors.accent, ";--wp-components-color-accent-darker-10:", colors.accentDarker10, ";--wp-components-color-accent-darker-20:", colors.accentDarker20, ";--wp-components-color-accent-inverted:", colors.accentInverted, ";--wp-components-color-background:", colors.background, ";--wp-components-color-foreground:", colors.foreground, ";--wp-components-color-foreground-inverted:", colors.foregroundInverted, ";", shades, ";" + (process.env.NODE_ENV === "production" ? "" : ";label:colorVariables;"), process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN0eWxlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFpQksiLCJmaWxlIjoic3R5bGVzLnRzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBFeHRlcm5hbCBkZXBlbmRlbmNpZXNcbiAqL1xuaW1wb3J0IHN0eWxlZCBmcm9tICdAZW1vdGlvbi9zdHlsZWQnO1xuaW1wb3J0IHsgY3NzIH0gZnJvbSAnQGVtb3Rpb24vcmVhY3QnO1xuXG4vKipcbiAqIEludGVybmFsIGRlcGVuZGVuY2llc1xuICovXG5pbXBvcnQgdHlwZSB7IFRoZW1lT3V0cHV0VmFsdWVzIH0gZnJvbSAnLi90eXBlcyc7XG5cbmV4cG9ydCBjb25zdCBjb2xvclZhcmlhYmxlcyA9ICggeyBjb2xvcnMgfTogVGhlbWVPdXRwdXRWYWx1ZXMgKSA9PiB7XG5cdGNvbnN0IHNoYWRlcyA9IE9iamVjdC5lbnRyaWVzKCBjb2xvcnMuZ3JheSB8fCB7fSApXG5cdFx0Lm1hcCggKCBbIGssIHYgXSApID0+IGAtLXdwLWNvbXBvbmVudHMtY29sb3ItZ3JheS0keyBrIH06ICR7IHYgfTtgIClcblx0XHQuam9pbiggJycgKTtcblxuXHRyZXR1cm4gW1xuXHRcdGNzc2Bcblx0XHRcdC0td3AtY29tcG9uZW50cy1jb2xvci1hY2NlbnQ6ICR7IGNvbG9ycy5hY2NlbnQgfTtcblx0XHRcdC0td3AtY29tcG9uZW50cy1jb2xvci1hY2NlbnQtZGFya2VyLTEwOiAkeyBjb2xvcnMuYWNjZW50RGFya2VyMTAgfTtcblx0XHRcdC0td3AtY29tcG9uZW50cy1jb2xvci1hY2NlbnQtZGFya2VyLTIwOiAkeyBjb2xvcnMuYWNjZW50RGFya2VyMjAgfTtcblx0XHRcdC0td3AtY29tcG9uZW50cy1jb2xvci1hY2NlbnQtaW52ZXJ0ZWQ6ICR7IGNvbG9ycy5hY2NlbnRJbnZlcnRlZCB9O1xuXG5cdFx0XHQtLXdwLWNvbXBvbmVudHMtY29sb3ItYmFja2dyb3VuZDogJHsgY29sb3JzLmJhY2tncm91bmQgfTtcblx0XHRcdC0td3AtY29tcG9uZW50cy1jb2xvci1mb3JlZ3JvdW5kOiAkeyBjb2xvcnMuZm9yZWdyb3VuZCB9O1xuXHRcdFx0LS13cC1jb21wb25lbnRzLWNvbG9yLWZvcmVncm91bmQtaW52ZXJ0ZWQ6ICR7IGNvbG9ycy5mb3JlZ3JvdW5kSW52ZXJ0ZWQgfTtcblxuXHRcdFx0JHsgc2hhZGVzIH1cblx0XHRgLFxuXHRdO1xufTtcblxuZXhwb3J0IGNvbnN0IFdyYXBwZXIgPSBzdHlsZWQuZGl2YFxuXHRjb2xvcjogdmFyKCAtLXdwLWNvbXBvbmVudHMtY29sb3ItZm9yZWdyb3VuZCwgY3VycmVudENvbG9yICk7XG5gO1xuIl19 */")];
};
var Wrapper = /* @__PURE__ */ (0, import_base.default)("div", process.env.NODE_ENV === "production" ? {
  target: "e1krjpvb0"
} : {
  target: "e1krjpvb0",
  label: "Wrapper"
})(process.env.NODE_ENV === "production" ? {
  name: "1a3idx0",
  styles: "color:var( --wp-components-color-foreground, currentColor )"
} : {
  name: "1a3idx0",
  styles: "color:var( --wp-components-color-foreground, currentColor )/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN0eWxlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFnQ2lDIiwiZmlsZSI6InN0eWxlcy50cyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogRXh0ZXJuYWwgZGVwZW5kZW5jaWVzXG4gKi9cbmltcG9ydCBzdHlsZWQgZnJvbSAnQGVtb3Rpb24vc3R5bGVkJztcbmltcG9ydCB7IGNzcyB9IGZyb20gJ0BlbW90aW9uL3JlYWN0JztcblxuLyoqXG4gKiBJbnRlcm5hbCBkZXBlbmRlbmNpZXNcbiAqL1xuaW1wb3J0IHR5cGUgeyBUaGVtZU91dHB1dFZhbHVlcyB9IGZyb20gJy4vdHlwZXMnO1xuXG5leHBvcnQgY29uc3QgY29sb3JWYXJpYWJsZXMgPSAoIHsgY29sb3JzIH06IFRoZW1lT3V0cHV0VmFsdWVzICkgPT4ge1xuXHRjb25zdCBzaGFkZXMgPSBPYmplY3QuZW50cmllcyggY29sb3JzLmdyYXkgfHwge30gKVxuXHRcdC5tYXAoICggWyBrLCB2IF0gKSA9PiBgLS13cC1jb21wb25lbnRzLWNvbG9yLWdyYXktJHsgayB9OiAkeyB2IH07YCApXG5cdFx0LmpvaW4oICcnICk7XG5cblx0cmV0dXJuIFtcblx0XHRjc3NgXG5cdFx0XHQtLXdwLWNvbXBvbmVudHMtY29sb3ItYWNjZW50OiAkeyBjb2xvcnMuYWNjZW50IH07XG5cdFx0XHQtLXdwLWNvbXBvbmVudHMtY29sb3ItYWNjZW50LWRhcmtlci0xMDogJHsgY29sb3JzLmFjY2VudERhcmtlcjEwIH07XG5cdFx0XHQtLXdwLWNvbXBvbmVudHMtY29sb3ItYWNjZW50LWRhcmtlci0yMDogJHsgY29sb3JzLmFjY2VudERhcmtlcjIwIH07XG5cdFx0XHQtLXdwLWNvbXBvbmVudHMtY29sb3ItYWNjZW50LWludmVydGVkOiAkeyBjb2xvcnMuYWNjZW50SW52ZXJ0ZWQgfTtcblxuXHRcdFx0LS13cC1jb21wb25lbnRzLWNvbG9yLWJhY2tncm91bmQ6ICR7IGNvbG9ycy5iYWNrZ3JvdW5kIH07XG5cdFx0XHQtLXdwLWNvbXBvbmVudHMtY29sb3ItZm9yZWdyb3VuZDogJHsgY29sb3JzLmZvcmVncm91bmQgfTtcblx0XHRcdC0td3AtY29tcG9uZW50cy1jb2xvci1mb3JlZ3JvdW5kLWludmVydGVkOiAkeyBjb2xvcnMuZm9yZWdyb3VuZEludmVydGVkIH07XG5cblx0XHRcdCR7IHNoYWRlcyB9XG5cdFx0YCxcblx0XTtcbn07XG5cbmV4cG9ydCBjb25zdCBXcmFwcGVyID0gc3R5bGVkLmRpdmBcblx0Y29sb3I6IHZhciggLS13cC1jb21wb25lbnRzLWNvbG9yLWZvcmVncm91bmQsIGN1cnJlbnRDb2xvciApO1xuYDtcbiJdfQ== */",
  toString: _EMOTION_STRINGIFIED_CSS_ERROR__
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Wrapper,
  colorVariables
});
//# sourceMappingURL=styles.cjs.map
