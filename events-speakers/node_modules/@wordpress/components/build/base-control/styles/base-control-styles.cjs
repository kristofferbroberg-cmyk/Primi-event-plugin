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

// packages/components/src/base-control/styles/base-control-styles.ts
var base_control_styles_exports = {};
__export(base_control_styles_exports, {
  StyledField: () => StyledField,
  StyledHelp: () => StyledHelp,
  StyledLabel: () => StyledLabel,
  StyledVisualLabel: () => StyledVisualLabel,
  Wrapper: () => Wrapper
});
module.exports = __toCommonJS(base_control_styles_exports);
var import_base = __toESM(require("@emotion/styled/base"));
var import_react = require("@emotion/react");
var import_utils = require("../../utils/index.cjs");
var import_space = require("../../utils/space.cjs");
function _EMOTION_STRINGIFIED_CSS_ERROR__() {
  return "You have tried to stringify object returned from `css` function. It isn't supposed to be used directly (e.g. as value of the `className` prop), but rather handed to emotion so it can handle it (e.g. as value of `css` prop).";
}
var Wrapper = /* @__PURE__ */ (0, import_base.default)("div", process.env.NODE_ENV === "production" ? {
  target: "ej5x27r4"
} : {
  target: "ej5x27r4",
  label: "Wrapper"
})("font-family:", (0, import_utils.font)("default.fontFamily"), ";font-size:", (0, import_utils.font)("default.fontSize"), ";", import_utils.boxSizingReset, ";" + (process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImJhc2UtY29udHJvbC1zdHlsZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBWWlDIiwiZmlsZSI6ImJhc2UtY29udHJvbC1zdHlsZXMudHMiLCJzb3VyY2VzQ29udGVudCI6WyIvKipcbiAqIEV4dGVybmFsIGRlcGVuZGVuY2llc1xuICovXG5pbXBvcnQgc3R5bGVkIGZyb20gJ0BlbW90aW9uL3N0eWxlZCc7XG5pbXBvcnQgeyBjc3MgfSBmcm9tICdAZW1vdGlvbi9yZWFjdCc7XG5cbi8qKlxuICogSW50ZXJuYWwgZGVwZW5kZW5jaWVzXG4gKi9cbmltcG9ydCB7IGJhc2VMYWJlbFR5cG9ncmFwaHksIGJveFNpemluZ1Jlc2V0LCBmb250LCBDT0xPUlMgfSBmcm9tICcuLi8uLi91dGlscyc7XG5pbXBvcnQgeyBzcGFjZSB9IGZyb20gJy4uLy4uL3V0aWxzL3NwYWNlJztcblxuZXhwb3J0IGNvbnN0IFdyYXBwZXIgPSBzdHlsZWQuZGl2YFxuXHRmb250LWZhbWlseTogJHsgZm9udCggJ2RlZmF1bHQuZm9udEZhbWlseScgKSB9O1xuXHRmb250LXNpemU6ICR7IGZvbnQoICdkZWZhdWx0LmZvbnRTaXplJyApIH07XG5cblx0JHsgYm94U2l6aW5nUmVzZXQgfVxuYDtcblxuZXhwb3J0IGNvbnN0IFN0eWxlZEZpZWxkID0gc3R5bGVkLmRpdmBcblx0LmNvbXBvbmVudHMtcGFuZWxfX3JvdyAmIHtcblx0XHRtYXJnaW4tYm90dG9tOiBpbmhlcml0O1xuXHR9XG5gO1xuXG5jb25zdCBsYWJlbFN0eWxlcyA9IGNzc2Bcblx0JHsgYmFzZUxhYmVsVHlwb2dyYXBoeSB9O1xuXG5cdGRpc3BsYXk6IGJsb2NrO1xuXHRtYXJnaW4tYm90dG9tOiAkeyBzcGFjZSggMiApIH07XG5cdC8qKlxuXHQgKiBSZW1vdmVzIENocm9tZS9TYWZhcmkvRmlyZWZveCB1c2VyIGFnZW50IHN0eWxlc2hlZXQgcGFkZGluZyBmcm9tXG5cdCAqIFN0eWxlZExhYmVsIHdoZW4gaXQgaXMgcmVuZGVyZWQgYXMgYSBsZWdlbmQuXG5cdCAqL1xuXHRwYWRkaW5nOiAwO1xuYDtcblxuZXhwb3J0IGNvbnN0IFN0eWxlZExhYmVsID0gc3R5bGVkLmxhYmVsYFxuXHQkeyBsYWJlbFN0eWxlcyB9XG5gO1xuXG5leHBvcnQgY29uc3QgU3R5bGVkSGVscCA9IHN0eWxlZC5wYFxuXHRtYXJnaW4tdG9wOiAkeyBzcGFjZSggMiApIH07XG5cdG1hcmdpbi1ib3R0b206IDA7XG5cdGZvbnQtc2l6ZTogJHsgZm9udCggJ2hlbHBUZXh0LmZvbnRTaXplJyApIH07XG5cdGZvbnQtc3R5bGU6IG5vcm1hbDtcblx0Y29sb3I6ICR7IENPTE9SUy5ncmF5WyA3MDAgXSB9O1xuYDtcblxuZXhwb3J0IGNvbnN0IFN0eWxlZFZpc3VhbExhYmVsID0gc3R5bGVkLnNwYW5gXG5cdCR7IGxhYmVsU3R5bGVzIH1cbmA7XG4iXX0= */"));
var StyledField = /* @__PURE__ */ (0, import_base.default)("div", process.env.NODE_ENV === "production" ? {
  target: "ej5x27r3"
} : {
  target: "ej5x27r3",
  label: "StyledField"
})(process.env.NODE_ENV === "production" ? {
  name: "1chyuqs",
  styles: ".components-panel__row &{margin-bottom:inherit;}"
} : {
  name: "1chyuqs",
  styles: ".components-panel__row &{margin-bottom:inherit;}/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImJhc2UtY29udHJvbC1zdHlsZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBbUJxQyIsImZpbGUiOiJiYXNlLWNvbnRyb2wtc3R5bGVzLnRzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBFeHRlcm5hbCBkZXBlbmRlbmNpZXNcbiAqL1xuaW1wb3J0IHN0eWxlZCBmcm9tICdAZW1vdGlvbi9zdHlsZWQnO1xuaW1wb3J0IHsgY3NzIH0gZnJvbSAnQGVtb3Rpb24vcmVhY3QnO1xuXG4vKipcbiAqIEludGVybmFsIGRlcGVuZGVuY2llc1xuICovXG5pbXBvcnQgeyBiYXNlTGFiZWxUeXBvZ3JhcGh5LCBib3hTaXppbmdSZXNldCwgZm9udCwgQ09MT1JTIH0gZnJvbSAnLi4vLi4vdXRpbHMnO1xuaW1wb3J0IHsgc3BhY2UgfSBmcm9tICcuLi8uLi91dGlscy9zcGFjZSc7XG5cbmV4cG9ydCBjb25zdCBXcmFwcGVyID0gc3R5bGVkLmRpdmBcblx0Zm9udC1mYW1pbHk6ICR7IGZvbnQoICdkZWZhdWx0LmZvbnRGYW1pbHknICkgfTtcblx0Zm9udC1zaXplOiAkeyBmb250KCAnZGVmYXVsdC5mb250U2l6ZScgKSB9O1xuXG5cdCR7IGJveFNpemluZ1Jlc2V0IH1cbmA7XG5cbmV4cG9ydCBjb25zdCBTdHlsZWRGaWVsZCA9IHN0eWxlZC5kaXZgXG5cdC5jb21wb25lbnRzLXBhbmVsX19yb3cgJiB7XG5cdFx0bWFyZ2luLWJvdHRvbTogaW5oZXJpdDtcblx0fVxuYDtcblxuY29uc3QgbGFiZWxTdHlsZXMgPSBjc3NgXG5cdCR7IGJhc2VMYWJlbFR5cG9ncmFwaHkgfTtcblxuXHRkaXNwbGF5OiBibG9jaztcblx0bWFyZ2luLWJvdHRvbTogJHsgc3BhY2UoIDIgKSB9O1xuXHQvKipcblx0ICogUmVtb3ZlcyBDaHJvbWUvU2FmYXJpL0ZpcmVmb3ggdXNlciBhZ2VudCBzdHlsZXNoZWV0IHBhZGRpbmcgZnJvbVxuXHQgKiBTdHlsZWRMYWJlbCB3aGVuIGl0IGlzIHJlbmRlcmVkIGFzIGEgbGVnZW5kLlxuXHQgKi9cblx0cGFkZGluZzogMDtcbmA7XG5cbmV4cG9ydCBjb25zdCBTdHlsZWRMYWJlbCA9IHN0eWxlZC5sYWJlbGBcblx0JHsgbGFiZWxTdHlsZXMgfVxuYDtcblxuZXhwb3J0IGNvbnN0IFN0eWxlZEhlbHAgPSBzdHlsZWQucGBcblx0bWFyZ2luLXRvcDogJHsgc3BhY2UoIDIgKSB9O1xuXHRtYXJnaW4tYm90dG9tOiAwO1xuXHRmb250LXNpemU6ICR7IGZvbnQoICdoZWxwVGV4dC5mb250U2l6ZScgKSB9O1xuXHRmb250LXN0eWxlOiBub3JtYWw7XG5cdGNvbG9yOiAkeyBDT0xPUlMuZ3JheVsgNzAwIF0gfTtcbmA7XG5cbmV4cG9ydCBjb25zdCBTdHlsZWRWaXN1YWxMYWJlbCA9IHN0eWxlZC5zcGFuYFxuXHQkeyBsYWJlbFN0eWxlcyB9XG5gO1xuIl19 */",
  toString: _EMOTION_STRINGIFIED_CSS_ERROR__
});
var labelStyles = /* @__PURE__ */ (0, import_react.css)(import_utils.baseLabelTypography, ";display:block;margin-bottom:", (0, import_space.space)(2), ";padding:0;" + (process.env.NODE_ENV === "production" ? "" : ";label:labelStyles;"), process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImJhc2UtY29udHJvbC1zdHlsZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBeUJ1QiIsImZpbGUiOiJiYXNlLWNvbnRyb2wtc3R5bGVzLnRzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBFeHRlcm5hbCBkZXBlbmRlbmNpZXNcbiAqL1xuaW1wb3J0IHN0eWxlZCBmcm9tICdAZW1vdGlvbi9zdHlsZWQnO1xuaW1wb3J0IHsgY3NzIH0gZnJvbSAnQGVtb3Rpb24vcmVhY3QnO1xuXG4vKipcbiAqIEludGVybmFsIGRlcGVuZGVuY2llc1xuICovXG5pbXBvcnQgeyBiYXNlTGFiZWxUeXBvZ3JhcGh5LCBib3hTaXppbmdSZXNldCwgZm9udCwgQ09MT1JTIH0gZnJvbSAnLi4vLi4vdXRpbHMnO1xuaW1wb3J0IHsgc3BhY2UgfSBmcm9tICcuLi8uLi91dGlscy9zcGFjZSc7XG5cbmV4cG9ydCBjb25zdCBXcmFwcGVyID0gc3R5bGVkLmRpdmBcblx0Zm9udC1mYW1pbHk6ICR7IGZvbnQoICdkZWZhdWx0LmZvbnRGYW1pbHknICkgfTtcblx0Zm9udC1zaXplOiAkeyBmb250KCAnZGVmYXVsdC5mb250U2l6ZScgKSB9O1xuXG5cdCR7IGJveFNpemluZ1Jlc2V0IH1cbmA7XG5cbmV4cG9ydCBjb25zdCBTdHlsZWRGaWVsZCA9IHN0eWxlZC5kaXZgXG5cdC5jb21wb25lbnRzLXBhbmVsX19yb3cgJiB7XG5cdFx0bWFyZ2luLWJvdHRvbTogaW5oZXJpdDtcblx0fVxuYDtcblxuY29uc3QgbGFiZWxTdHlsZXMgPSBjc3NgXG5cdCR7IGJhc2VMYWJlbFR5cG9ncmFwaHkgfTtcblxuXHRkaXNwbGF5OiBibG9jaztcblx0bWFyZ2luLWJvdHRvbTogJHsgc3BhY2UoIDIgKSB9O1xuXHQvKipcblx0ICogUmVtb3ZlcyBDaHJvbWUvU2FmYXJpL0ZpcmVmb3ggdXNlciBhZ2VudCBzdHlsZXNoZWV0IHBhZGRpbmcgZnJvbVxuXHQgKiBTdHlsZWRMYWJlbCB3aGVuIGl0IGlzIHJlbmRlcmVkIGFzIGEgbGVnZW5kLlxuXHQgKi9cblx0cGFkZGluZzogMDtcbmA7XG5cbmV4cG9ydCBjb25zdCBTdHlsZWRMYWJlbCA9IHN0eWxlZC5sYWJlbGBcblx0JHsgbGFiZWxTdHlsZXMgfVxuYDtcblxuZXhwb3J0IGNvbnN0IFN0eWxlZEhlbHAgPSBzdHlsZWQucGBcblx0bWFyZ2luLXRvcDogJHsgc3BhY2UoIDIgKSB9O1xuXHRtYXJnaW4tYm90dG9tOiAwO1xuXHRmb250LXNpemU6ICR7IGZvbnQoICdoZWxwVGV4dC5mb250U2l6ZScgKSB9O1xuXHRmb250LXN0eWxlOiBub3JtYWw7XG5cdGNvbG9yOiAkeyBDT0xPUlMuZ3JheVsgNzAwIF0gfTtcbmA7XG5cbmV4cG9ydCBjb25zdCBTdHlsZWRWaXN1YWxMYWJlbCA9IHN0eWxlZC5zcGFuYFxuXHQkeyBsYWJlbFN0eWxlcyB9XG5gO1xuIl19 */");
var StyledLabel = /* @__PURE__ */ (0, import_base.default)("label", process.env.NODE_ENV === "production" ? {
  target: "ej5x27r2"
} : {
  target: "ej5x27r2",
  label: "StyledLabel"
})(labelStyles, ";" + (process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImJhc2UtY29udHJvbC1zdHlsZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBcUN1QyIsImZpbGUiOiJiYXNlLWNvbnRyb2wtc3R5bGVzLnRzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBFeHRlcm5hbCBkZXBlbmRlbmNpZXNcbiAqL1xuaW1wb3J0IHN0eWxlZCBmcm9tICdAZW1vdGlvbi9zdHlsZWQnO1xuaW1wb3J0IHsgY3NzIH0gZnJvbSAnQGVtb3Rpb24vcmVhY3QnO1xuXG4vKipcbiAqIEludGVybmFsIGRlcGVuZGVuY2llc1xuICovXG5pbXBvcnQgeyBiYXNlTGFiZWxUeXBvZ3JhcGh5LCBib3hTaXppbmdSZXNldCwgZm9udCwgQ09MT1JTIH0gZnJvbSAnLi4vLi4vdXRpbHMnO1xuaW1wb3J0IHsgc3BhY2UgfSBmcm9tICcuLi8uLi91dGlscy9zcGFjZSc7XG5cbmV4cG9ydCBjb25zdCBXcmFwcGVyID0gc3R5bGVkLmRpdmBcblx0Zm9udC1mYW1pbHk6ICR7IGZvbnQoICdkZWZhdWx0LmZvbnRGYW1pbHknICkgfTtcblx0Zm9udC1zaXplOiAkeyBmb250KCAnZGVmYXVsdC5mb250U2l6ZScgKSB9O1xuXG5cdCR7IGJveFNpemluZ1Jlc2V0IH1cbmA7XG5cbmV4cG9ydCBjb25zdCBTdHlsZWRGaWVsZCA9IHN0eWxlZC5kaXZgXG5cdC5jb21wb25lbnRzLXBhbmVsX19yb3cgJiB7XG5cdFx0bWFyZ2luLWJvdHRvbTogaW5oZXJpdDtcblx0fVxuYDtcblxuY29uc3QgbGFiZWxTdHlsZXMgPSBjc3NgXG5cdCR7IGJhc2VMYWJlbFR5cG9ncmFwaHkgfTtcblxuXHRkaXNwbGF5OiBibG9jaztcblx0bWFyZ2luLWJvdHRvbTogJHsgc3BhY2UoIDIgKSB9O1xuXHQvKipcblx0ICogUmVtb3ZlcyBDaHJvbWUvU2FmYXJpL0ZpcmVmb3ggdXNlciBhZ2VudCBzdHlsZXNoZWV0IHBhZGRpbmcgZnJvbVxuXHQgKiBTdHlsZWRMYWJlbCB3aGVuIGl0IGlzIHJlbmRlcmVkIGFzIGEgbGVnZW5kLlxuXHQgKi9cblx0cGFkZGluZzogMDtcbmA7XG5cbmV4cG9ydCBjb25zdCBTdHlsZWRMYWJlbCA9IHN0eWxlZC5sYWJlbGBcblx0JHsgbGFiZWxTdHlsZXMgfVxuYDtcblxuZXhwb3J0IGNvbnN0IFN0eWxlZEhlbHAgPSBzdHlsZWQucGBcblx0bWFyZ2luLXRvcDogJHsgc3BhY2UoIDIgKSB9O1xuXHRtYXJnaW4tYm90dG9tOiAwO1xuXHRmb250LXNpemU6ICR7IGZvbnQoICdoZWxwVGV4dC5mb250U2l6ZScgKSB9O1xuXHRmb250LXN0eWxlOiBub3JtYWw7XG5cdGNvbG9yOiAkeyBDT0xPUlMuZ3JheVsgNzAwIF0gfTtcbmA7XG5cbmV4cG9ydCBjb25zdCBTdHlsZWRWaXN1YWxMYWJlbCA9IHN0eWxlZC5zcGFuYFxuXHQkeyBsYWJlbFN0eWxlcyB9XG5gO1xuIl19 */"));
var StyledHelp = /* @__PURE__ */ (0, import_base.default)("p", process.env.NODE_ENV === "production" ? {
  target: "ej5x27r1"
} : {
  target: "ej5x27r1",
  label: "StyledHelp"
})("margin-top:", (0, import_space.space)(2), ";margin-bottom:0;font-size:", (0, import_utils.font)("helpText.fontSize"), ";font-style:normal;color:", import_utils.COLORS.gray[700], ";" + (process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImJhc2UtY29udHJvbC1zdHlsZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBeUNrQyIsImZpbGUiOiJiYXNlLWNvbnRyb2wtc3R5bGVzLnRzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBFeHRlcm5hbCBkZXBlbmRlbmNpZXNcbiAqL1xuaW1wb3J0IHN0eWxlZCBmcm9tICdAZW1vdGlvbi9zdHlsZWQnO1xuaW1wb3J0IHsgY3NzIH0gZnJvbSAnQGVtb3Rpb24vcmVhY3QnO1xuXG4vKipcbiAqIEludGVybmFsIGRlcGVuZGVuY2llc1xuICovXG5pbXBvcnQgeyBiYXNlTGFiZWxUeXBvZ3JhcGh5LCBib3hTaXppbmdSZXNldCwgZm9udCwgQ09MT1JTIH0gZnJvbSAnLi4vLi4vdXRpbHMnO1xuaW1wb3J0IHsgc3BhY2UgfSBmcm9tICcuLi8uLi91dGlscy9zcGFjZSc7XG5cbmV4cG9ydCBjb25zdCBXcmFwcGVyID0gc3R5bGVkLmRpdmBcblx0Zm9udC1mYW1pbHk6ICR7IGZvbnQoICdkZWZhdWx0LmZvbnRGYW1pbHknICkgfTtcblx0Zm9udC1zaXplOiAkeyBmb250KCAnZGVmYXVsdC5mb250U2l6ZScgKSB9O1xuXG5cdCR7IGJveFNpemluZ1Jlc2V0IH1cbmA7XG5cbmV4cG9ydCBjb25zdCBTdHlsZWRGaWVsZCA9IHN0eWxlZC5kaXZgXG5cdC5jb21wb25lbnRzLXBhbmVsX19yb3cgJiB7XG5cdFx0bWFyZ2luLWJvdHRvbTogaW5oZXJpdDtcblx0fVxuYDtcblxuY29uc3QgbGFiZWxTdHlsZXMgPSBjc3NgXG5cdCR7IGJhc2VMYWJlbFR5cG9ncmFwaHkgfTtcblxuXHRkaXNwbGF5OiBibG9jaztcblx0bWFyZ2luLWJvdHRvbTogJHsgc3BhY2UoIDIgKSB9O1xuXHQvKipcblx0ICogUmVtb3ZlcyBDaHJvbWUvU2FmYXJpL0ZpcmVmb3ggdXNlciBhZ2VudCBzdHlsZXNoZWV0IHBhZGRpbmcgZnJvbVxuXHQgKiBTdHlsZWRMYWJlbCB3aGVuIGl0IGlzIHJlbmRlcmVkIGFzIGEgbGVnZW5kLlxuXHQgKi9cblx0cGFkZGluZzogMDtcbmA7XG5cbmV4cG9ydCBjb25zdCBTdHlsZWRMYWJlbCA9IHN0eWxlZC5sYWJlbGBcblx0JHsgbGFiZWxTdHlsZXMgfVxuYDtcblxuZXhwb3J0IGNvbnN0IFN0eWxlZEhlbHAgPSBzdHlsZWQucGBcblx0bWFyZ2luLXRvcDogJHsgc3BhY2UoIDIgKSB9O1xuXHRtYXJnaW4tYm90dG9tOiAwO1xuXHRmb250LXNpemU6ICR7IGZvbnQoICdoZWxwVGV4dC5mb250U2l6ZScgKSB9O1xuXHRmb250LXN0eWxlOiBub3JtYWw7XG5cdGNvbG9yOiAkeyBDT0xPUlMuZ3JheVsgNzAwIF0gfTtcbmA7XG5cbmV4cG9ydCBjb25zdCBTdHlsZWRWaXN1YWxMYWJlbCA9IHN0eWxlZC5zcGFuYFxuXHQkeyBsYWJlbFN0eWxlcyB9XG5gO1xuIl19 */"));
var StyledVisualLabel = /* @__PURE__ */ (0, import_base.default)("span", process.env.NODE_ENV === "production" ? {
  target: "ej5x27r0"
} : {
  target: "ej5x27r0",
  label: "StyledVisualLabel"
})(labelStyles, ";" + (process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImJhc2UtY29udHJvbC1zdHlsZXMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBaUQ0QyIsImZpbGUiOiJiYXNlLWNvbnRyb2wtc3R5bGVzLnRzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBFeHRlcm5hbCBkZXBlbmRlbmNpZXNcbiAqL1xuaW1wb3J0IHN0eWxlZCBmcm9tICdAZW1vdGlvbi9zdHlsZWQnO1xuaW1wb3J0IHsgY3NzIH0gZnJvbSAnQGVtb3Rpb24vcmVhY3QnO1xuXG4vKipcbiAqIEludGVybmFsIGRlcGVuZGVuY2llc1xuICovXG5pbXBvcnQgeyBiYXNlTGFiZWxUeXBvZ3JhcGh5LCBib3hTaXppbmdSZXNldCwgZm9udCwgQ09MT1JTIH0gZnJvbSAnLi4vLi4vdXRpbHMnO1xuaW1wb3J0IHsgc3BhY2UgfSBmcm9tICcuLi8uLi91dGlscy9zcGFjZSc7XG5cbmV4cG9ydCBjb25zdCBXcmFwcGVyID0gc3R5bGVkLmRpdmBcblx0Zm9udC1mYW1pbHk6ICR7IGZvbnQoICdkZWZhdWx0LmZvbnRGYW1pbHknICkgfTtcblx0Zm9udC1zaXplOiAkeyBmb250KCAnZGVmYXVsdC5mb250U2l6ZScgKSB9O1xuXG5cdCR7IGJveFNpemluZ1Jlc2V0IH1cbmA7XG5cbmV4cG9ydCBjb25zdCBTdHlsZWRGaWVsZCA9IHN0eWxlZC5kaXZgXG5cdC5jb21wb25lbnRzLXBhbmVsX19yb3cgJiB7XG5cdFx0bWFyZ2luLWJvdHRvbTogaW5oZXJpdDtcblx0fVxuYDtcblxuY29uc3QgbGFiZWxTdHlsZXMgPSBjc3NgXG5cdCR7IGJhc2VMYWJlbFR5cG9ncmFwaHkgfTtcblxuXHRkaXNwbGF5OiBibG9jaztcblx0bWFyZ2luLWJvdHRvbTogJHsgc3BhY2UoIDIgKSB9O1xuXHQvKipcblx0ICogUmVtb3ZlcyBDaHJvbWUvU2FmYXJpL0ZpcmVmb3ggdXNlciBhZ2VudCBzdHlsZXNoZWV0IHBhZGRpbmcgZnJvbVxuXHQgKiBTdHlsZWRMYWJlbCB3aGVuIGl0IGlzIHJlbmRlcmVkIGFzIGEgbGVnZW5kLlxuXHQgKi9cblx0cGFkZGluZzogMDtcbmA7XG5cbmV4cG9ydCBjb25zdCBTdHlsZWRMYWJlbCA9IHN0eWxlZC5sYWJlbGBcblx0JHsgbGFiZWxTdHlsZXMgfVxuYDtcblxuZXhwb3J0IGNvbnN0IFN0eWxlZEhlbHAgPSBzdHlsZWQucGBcblx0bWFyZ2luLXRvcDogJHsgc3BhY2UoIDIgKSB9O1xuXHRtYXJnaW4tYm90dG9tOiAwO1xuXHRmb250LXNpemU6ICR7IGZvbnQoICdoZWxwVGV4dC5mb250U2l6ZScgKSB9O1xuXHRmb250LXN0eWxlOiBub3JtYWw7XG5cdGNvbG9yOiAkeyBDT0xPUlMuZ3JheVsgNzAwIF0gfTtcbmA7XG5cbmV4cG9ydCBjb25zdCBTdHlsZWRWaXN1YWxMYWJlbCA9IHN0eWxlZC5zcGFuYFxuXHQkeyBsYWJlbFN0eWxlcyB9XG5gO1xuIl19 */"));
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  StyledField,
  StyledHelp,
  StyledLabel,
  StyledVisualLabel,
  Wrapper
});
//# sourceMappingURL=base-control-styles.cjs.map
