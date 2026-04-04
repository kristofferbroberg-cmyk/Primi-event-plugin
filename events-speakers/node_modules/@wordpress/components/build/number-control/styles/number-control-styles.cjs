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

// packages/components/src/number-control/styles/number-control-styles.ts
var number_control_styles_exports = {};
__export(number_control_styles_exports, {
  Input: () => Input,
  SpinButton: () => SpinButton,
  styles: () => styles
});
module.exports = __toCommonJS(number_control_styles_exports);
var import_base = __toESM(require("@emotion/styled/base"));
var import_react = require("@emotion/react");
var import_input_control = __toESM(require("../../input-control/index.cjs"));
var import_utils = require("../../utils/index.cjs");
var import_button = __toESM(require("../../button/index.cjs"));
var import_space = require("../../utils/space.cjs");
function _EMOTION_STRINGIFIED_CSS_ERROR__() {
  return "You have tried to stringify object returned from `css` function. It isn't supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop).";
}
var _ref = process.env.NODE_ENV === "production" ? {
  name: "euqsgg",
  styles: "input[type='number']::-webkit-outer-spin-button,input[type='number']::-webkit-inner-spin-button{-webkit-appearance:none!important;margin:0!important;}input[type='number']{-moz-appearance:textfield;}"
} : {
  name: "jl4rev-htmlArrowStyles",
  styles: "input[type='number']::-webkit-outer-spin-button,input[type='number']::-webkit-inner-spin-button{-webkit-appearance:none!important;margin:0!important;}input[type='number']{-moz-appearance:textfield;};label:htmlArrowStyles;/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm51bWJlci1jb250cm9sLXN0eWxlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFtQlciLCJmaWxlIjoibnVtYmVyLWNvbnRyb2wtc3R5bGVzLnRzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBFeHRlcm5hbCBkZXBlbmRlbmNpZXNcbiAqL1xuaW1wb3J0IHsgY3NzIH0gZnJvbSAnQGVtb3Rpb24vcmVhY3QnO1xuaW1wb3J0IHN0eWxlZCBmcm9tICdAZW1vdGlvbi9zdHlsZWQnO1xuXG4vKipcbiAqIEludGVybmFsIGRlcGVuZGVuY2llc1xuICovXG5pbXBvcnQgSW5wdXRDb250cm9sIGZyb20gJy4uLy4uL2lucHV0LWNvbnRyb2wnO1xuaW1wb3J0IHsgQ09MT1JTIH0gZnJvbSAnLi4vLi4vdXRpbHMnO1xuaW1wb3J0IEJ1dHRvbiBmcm9tICcuLi8uLi9idXR0b24nO1xuaW1wb3J0IHsgc3BhY2UgfSBmcm9tICcuLi8uLi91dGlscy9zcGFjZSc7XG5cbmNvbnN0IGh0bWxBcnJvd1N0eWxlcyA9ICggeyBoaWRlSFRNTEFycm93cyB9OiB7IGhpZGVIVE1MQXJyb3dzOiBib29sZWFuIH0gKSA9PiB7XG5cdGlmICggISBoaWRlSFRNTEFycm93cyApIHtcblx0XHRyZXR1cm4gYGA7XG5cdH1cblxuXHRyZXR1cm4gY3NzYFxuXHRcdGlucHV0W3R5cGU9J251bWJlciddOjotd2Via2l0LW91dGVyLXNwaW4tYnV0dG9uLFxuXHRcdGlucHV0W3R5cGU9J251bWJlciddOjotd2Via2l0LWlubmVyLXNwaW4tYnV0dG9uIHtcblx0XHRcdC13ZWJraXQtYXBwZWFyYW5jZTogbm9uZSAhaW1wb3J0YW50O1xuXHRcdFx0bWFyZ2luOiAwICFpbXBvcnRhbnQ7XG5cdFx0fVxuXG5cdFx0aW5wdXRbdHlwZT0nbnVtYmVyJ10ge1xuXHRcdFx0LW1vei1hcHBlYXJhbmNlOiB0ZXh0ZmllbGQ7XG5cdFx0fVxuXHRgO1xufTtcblxuZXhwb3J0IGNvbnN0IElucHV0ID0gc3R5bGVkKCBJbnB1dENvbnRyb2wgKWBcblx0JHsgaHRtbEFycm93U3R5bGVzIH07XG5gO1xuXG5leHBvcnQgY29uc3QgU3BpbkJ1dHRvbiA9IHN0eWxlZCggQnV0dG9uIClgXG5cdCYmJiYmIHtcblx0XHRjb2xvcjogJHsgQ09MT1JTLnRoZW1lLmFjY2VudCB9O1xuXHR9XG5gO1xuXG5jb25zdCBzbWFsbFNwaW5CdXR0b25zID0gY3NzYFxuXHR3aWR0aDogJHsgc3BhY2UoIDUgKSB9O1xuXHRtaW4td2lkdGg6ICR7IHNwYWNlKCA1ICkgfTtcblx0aGVpZ2h0OiAkeyBzcGFjZSggNSApIH07XG5gO1xuXG5leHBvcnQgY29uc3Qgc3R5bGVzID0geyBzbWFsbFNwaW5CdXR0b25zIH07XG4iXX0= */",
  toString: _EMOTION_STRINGIFIED_CSS_ERROR__
};
var htmlArrowStyles = ({
  hideHTMLArrows
}) => {
  if (!hideHTMLArrows) {
    return ``;
  }
  return _ref;
};
var Input = /* @__PURE__ */ (0, import_base.default)(import_input_control.default, process.env.NODE_ENV === "production" ? {
  target: "ep09it41"
} : {
  target: "ep09it41",
  label: "Input"
})(htmlArrowStyles, ";" + (process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm51bWJlci1jb250cm9sLXN0eWxlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFnQzJDIiwiZmlsZSI6Im51bWJlci1jb250cm9sLXN0eWxlcy50cyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogRXh0ZXJuYWwgZGVwZW5kZW5jaWVzXG4gKi9cbmltcG9ydCB7IGNzcyB9IGZyb20gJ0BlbW90aW9uL3JlYWN0JztcbmltcG9ydCBzdHlsZWQgZnJvbSAnQGVtb3Rpb24vc3R5bGVkJztcblxuLyoqXG4gKiBJbnRlcm5hbCBkZXBlbmRlbmNpZXNcbiAqL1xuaW1wb3J0IElucHV0Q29udHJvbCBmcm9tICcuLi8uLi9pbnB1dC1jb250cm9sJztcbmltcG9ydCB7IENPTE9SUyB9IGZyb20gJy4uLy4uL3V0aWxzJztcbmltcG9ydCBCdXR0b24gZnJvbSAnLi4vLi4vYnV0dG9uJztcbmltcG9ydCB7IHNwYWNlIH0gZnJvbSAnLi4vLi4vdXRpbHMvc3BhY2UnO1xuXG5jb25zdCBodG1sQXJyb3dTdHlsZXMgPSAoIHsgaGlkZUhUTUxBcnJvd3MgfTogeyBoaWRlSFRNTEFycm93czogYm9vbGVhbiB9ICkgPT4ge1xuXHRpZiAoICEgaGlkZUhUTUxBcnJvd3MgKSB7XG5cdFx0cmV0dXJuIGBgO1xuXHR9XG5cblx0cmV0dXJuIGNzc2Bcblx0XHRpbnB1dFt0eXBlPSdudW1iZXInXTo6LXdlYmtpdC1vdXRlci1zcGluLWJ1dHRvbixcblx0XHRpbnB1dFt0eXBlPSdudW1iZXInXTo6LXdlYmtpdC1pbm5lci1zcGluLWJ1dHRvbiB7XG5cdFx0XHQtd2Via2l0LWFwcGVhcmFuY2U6IG5vbmUgIWltcG9ydGFudDtcblx0XHRcdG1hcmdpbjogMCAhaW1wb3J0YW50O1xuXHRcdH1cblxuXHRcdGlucHV0W3R5cGU9J251bWJlciddIHtcblx0XHRcdC1tb3otYXBwZWFyYW5jZTogdGV4dGZpZWxkO1xuXHRcdH1cblx0YDtcbn07XG5cbmV4cG9ydCBjb25zdCBJbnB1dCA9IHN0eWxlZCggSW5wdXRDb250cm9sIClgXG5cdCR7IGh0bWxBcnJvd1N0eWxlcyB9O1xuYDtcblxuZXhwb3J0IGNvbnN0IFNwaW5CdXR0b24gPSBzdHlsZWQoIEJ1dHRvbiApYFxuXHQmJiYmJiB7XG5cdFx0Y29sb3I6ICR7IENPTE9SUy50aGVtZS5hY2NlbnQgfTtcblx0fVxuYDtcblxuY29uc3Qgc21hbGxTcGluQnV0dG9ucyA9IGNzc2Bcblx0d2lkdGg6ICR7IHNwYWNlKCA1ICkgfTtcblx0bWluLXdpZHRoOiAkeyBzcGFjZSggNSApIH07XG5cdGhlaWdodDogJHsgc3BhY2UoIDUgKSB9O1xuYDtcblxuZXhwb3J0IGNvbnN0IHN0eWxlcyA9IHsgc21hbGxTcGluQnV0dG9ucyB9O1xuIl19 */"));
var SpinButton = /* @__PURE__ */ (0, import_base.default)(import_button.default, process.env.NODE_ENV === "production" ? {
  target: "ep09it40"
} : {
  target: "ep09it40",
  label: "SpinButton"
})("&&&&&{color:", import_utils.COLORS.theme.accent, ";}" + (process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm51bWJlci1jb250cm9sLXN0eWxlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFvQzBDIiwiZmlsZSI6Im51bWJlci1jb250cm9sLXN0eWxlcy50cyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogRXh0ZXJuYWwgZGVwZW5kZW5jaWVzXG4gKi9cbmltcG9ydCB7IGNzcyB9IGZyb20gJ0BlbW90aW9uL3JlYWN0JztcbmltcG9ydCBzdHlsZWQgZnJvbSAnQGVtb3Rpb24vc3R5bGVkJztcblxuLyoqXG4gKiBJbnRlcm5hbCBkZXBlbmRlbmNpZXNcbiAqL1xuaW1wb3J0IElucHV0Q29udHJvbCBmcm9tICcuLi8uLi9pbnB1dC1jb250cm9sJztcbmltcG9ydCB7IENPTE9SUyB9IGZyb20gJy4uLy4uL3V0aWxzJztcbmltcG9ydCBCdXR0b24gZnJvbSAnLi4vLi4vYnV0dG9uJztcbmltcG9ydCB7IHNwYWNlIH0gZnJvbSAnLi4vLi4vdXRpbHMvc3BhY2UnO1xuXG5jb25zdCBodG1sQXJyb3dTdHlsZXMgPSAoIHsgaGlkZUhUTUxBcnJvd3MgfTogeyBoaWRlSFRNTEFycm93czogYm9vbGVhbiB9ICkgPT4ge1xuXHRpZiAoICEgaGlkZUhUTUxBcnJvd3MgKSB7XG5cdFx0cmV0dXJuIGBgO1xuXHR9XG5cblx0cmV0dXJuIGNzc2Bcblx0XHRpbnB1dFt0eXBlPSdudW1iZXInXTo6LXdlYmtpdC1vdXRlci1zcGluLWJ1dHRvbixcblx0XHRpbnB1dFt0eXBlPSdudW1iZXInXTo6LXdlYmtpdC1pbm5lci1zcGluLWJ1dHRvbiB7XG5cdFx0XHQtd2Via2l0LWFwcGVhcmFuY2U6IG5vbmUgIWltcG9ydGFudDtcblx0XHRcdG1hcmdpbjogMCAhaW1wb3J0YW50O1xuXHRcdH1cblxuXHRcdGlucHV0W3R5cGU9J251bWJlciddIHtcblx0XHRcdC1tb3otYXBwZWFyYW5jZTogdGV4dGZpZWxkO1xuXHRcdH1cblx0YDtcbn07XG5cbmV4cG9ydCBjb25zdCBJbnB1dCA9IHN0eWxlZCggSW5wdXRDb250cm9sIClgXG5cdCR7IGh0bWxBcnJvd1N0eWxlcyB9O1xuYDtcblxuZXhwb3J0IGNvbnN0IFNwaW5CdXR0b24gPSBzdHlsZWQoIEJ1dHRvbiApYFxuXHQmJiYmJiB7XG5cdFx0Y29sb3I6ICR7IENPTE9SUy50aGVtZS5hY2NlbnQgfTtcblx0fVxuYDtcblxuY29uc3Qgc21hbGxTcGluQnV0dG9ucyA9IGNzc2Bcblx0d2lkdGg6ICR7IHNwYWNlKCA1ICkgfTtcblx0bWluLXdpZHRoOiAkeyBzcGFjZSggNSApIH07XG5cdGhlaWdodDogJHsgc3BhY2UoIDUgKSB9O1xuYDtcblxuZXhwb3J0IGNvbnN0IHN0eWxlcyA9IHsgc21hbGxTcGluQnV0dG9ucyB9O1xuIl19 */"));
var smallSpinButtons = /* @__PURE__ */ (0, import_react.css)("width:", (0, import_space.space)(5), ";min-width:", (0, import_space.space)(5), ";height:", (0, import_space.space)(5), ";" + (process.env.NODE_ENV === "production" ? "" : ";label:smallSpinButtons;"), process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm51bWJlci1jb250cm9sLXN0eWxlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUEwQzRCIiwiZmlsZSI6Im51bWJlci1jb250cm9sLXN0eWxlcy50cyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogRXh0ZXJuYWwgZGVwZW5kZW5jaWVzXG4gKi9cbmltcG9ydCB7IGNzcyB9IGZyb20gJ0BlbW90aW9uL3JlYWN0JztcbmltcG9ydCBzdHlsZWQgZnJvbSAnQGVtb3Rpb24vc3R5bGVkJztcblxuLyoqXG4gKiBJbnRlcm5hbCBkZXBlbmRlbmNpZXNcbiAqL1xuaW1wb3J0IElucHV0Q29udHJvbCBmcm9tICcuLi8uLi9pbnB1dC1jb250cm9sJztcbmltcG9ydCB7IENPTE9SUyB9IGZyb20gJy4uLy4uL3V0aWxzJztcbmltcG9ydCBCdXR0b24gZnJvbSAnLi4vLi4vYnV0dG9uJztcbmltcG9ydCB7IHNwYWNlIH0gZnJvbSAnLi4vLi4vdXRpbHMvc3BhY2UnO1xuXG5jb25zdCBodG1sQXJyb3dTdHlsZXMgPSAoIHsgaGlkZUhUTUxBcnJvd3MgfTogeyBoaWRlSFRNTEFycm93czogYm9vbGVhbiB9ICkgPT4ge1xuXHRpZiAoICEgaGlkZUhUTUxBcnJvd3MgKSB7XG5cdFx0cmV0dXJuIGBgO1xuXHR9XG5cblx0cmV0dXJuIGNzc2Bcblx0XHRpbnB1dFt0eXBlPSdudW1iZXInXTo6LXdlYmtpdC1vdXRlci1zcGluLWJ1dHRvbixcblx0XHRpbnB1dFt0eXBlPSdudW1iZXInXTo6LXdlYmtpdC1pbm5lci1zcGluLWJ1dHRvbiB7XG5cdFx0XHQtd2Via2l0LWFwcGVhcmFuY2U6IG5vbmUgIWltcG9ydGFudDtcblx0XHRcdG1hcmdpbjogMCAhaW1wb3J0YW50O1xuXHRcdH1cblxuXHRcdGlucHV0W3R5cGU9J251bWJlciddIHtcblx0XHRcdC1tb3otYXBwZWFyYW5jZTogdGV4dGZpZWxkO1xuXHRcdH1cblx0YDtcbn07XG5cbmV4cG9ydCBjb25zdCBJbnB1dCA9IHN0eWxlZCggSW5wdXRDb250cm9sIClgXG5cdCR7IGh0bWxBcnJvd1N0eWxlcyB9O1xuYDtcblxuZXhwb3J0IGNvbnN0IFNwaW5CdXR0b24gPSBzdHlsZWQoIEJ1dHRvbiApYFxuXHQmJiYmJiB7XG5cdFx0Y29sb3I6ICR7IENPTE9SUy50aGVtZS5hY2NlbnQgfTtcblx0fVxuYDtcblxuY29uc3Qgc21hbGxTcGluQnV0dG9ucyA9IGNzc2Bcblx0d2lkdGg6ICR7IHNwYWNlKCA1ICkgfTtcblx0bWluLXdpZHRoOiAkeyBzcGFjZSggNSApIH07XG5cdGhlaWdodDogJHsgc3BhY2UoIDUgKSB9O1xuYDtcblxuZXhwb3J0IGNvbnN0IHN0eWxlcyA9IHsgc21hbGxTcGluQnV0dG9ucyB9O1xuIl19 */");
var styles = {
  smallSpinButtons
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Input,
  SpinButton,
  styles
});
//# sourceMappingURL=number-control-styles.cjs.map
