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

// packages/components/src/dropdown/styles.ts
var styles_exports = {};
__export(styles_exports, {
  DropdownContentWrapperDiv: () => DropdownContentWrapperDiv
});
module.exports = __toCommonJS(styles_exports);
var import_base = __toESM(require("@emotion/styled/base"));
var import_react = require("@emotion/react");
var import_space = require("../utils/space.cjs");
var padding = ({
  paddingSize = "small"
}) => {
  if (paddingSize === "none") {
    return;
  }
  const paddingValues = {
    small: (0, import_space.space)(2),
    medium: (0, import_space.space)(4)
  };
  return /* @__PURE__ */ (0, import_react.css)("padding:", paddingValues[paddingSize] || paddingValues.small, ";" + (process.env.NODE_ENV === "production" ? "" : ";label:padding;"), process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN0eWxlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFzQlciLCJmaWxlIjoic3R5bGVzLnRzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBFeHRlcm5hbCBkZXBlbmRlbmNpZXNcbiAqL1xuaW1wb3J0IHsgY3NzIH0gZnJvbSAnQGVtb3Rpb24vcmVhY3QnO1xuaW1wb3J0IHN0eWxlZCBmcm9tICdAZW1vdGlvbi9zdHlsZWQnO1xuXG4vKipcbiAqIEludGVybmFsIGRlcGVuZGVuY2llc1xuICovXG5pbXBvcnQgeyBzcGFjZSB9IGZyb20gJy4uL3V0aWxzL3NwYWNlJztcbmltcG9ydCB0eXBlIHsgRHJvcGRvd25Db250ZW50V3JhcHBlclByb3BzIH0gZnJvbSAnLi90eXBlcyc7XG5cbmNvbnN0IHBhZGRpbmcgPSAoIHsgcGFkZGluZ1NpemUgPSAnc21hbGwnIH06IERyb3Bkb3duQ29udGVudFdyYXBwZXJQcm9wcyApID0+IHtcblx0aWYgKCBwYWRkaW5nU2l6ZSA9PT0gJ25vbmUnICkge1xuXHRcdHJldHVybjtcblx0fVxuXG5cdGNvbnN0IHBhZGRpbmdWYWx1ZXMgPSB7XG5cdFx0c21hbGw6IHNwYWNlKCAyICksXG5cdFx0bWVkaXVtOiBzcGFjZSggNCApLFxuXHR9O1xuXG5cdHJldHVybiBjc3NgXG5cdFx0cGFkZGluZzogJHsgcGFkZGluZ1ZhbHVlc1sgcGFkZGluZ1NpemUgXSB8fCBwYWRkaW5nVmFsdWVzLnNtYWxsIH07XG5cdGA7XG59O1xuXG5leHBvcnQgY29uc3QgRHJvcGRvd25Db250ZW50V3JhcHBlckRpdiA9IHN0eWxlZC5kaXY8IERyb3Bkb3duQ29udGVudFdyYXBwZXJQcm9wcyA+YFxuXHQvLyBOZWdhdGl2ZSBtYXJnaW4gdG8gcmVzZXQgKG9mZnNldCkgdGhlIGRlZmF1bHQgcGFkZGluZyBvbiAuY29tcG9uZW50cy1wb3BvdmVyX19jb250ZW50XG5cdG1hcmdpbi1sZWZ0OiAkeyBzcGFjZSggLTIgKSB9O1xuXHRtYXJnaW4tcmlnaHQ6ICR7IHNwYWNlKCAtMiApIH07XG5cdCY6Zmlyc3Qtb2YtdHlwZSB7XG5cdFx0bWFyZ2luLXRvcDogJHsgc3BhY2UoIC0yICkgfTtcblx0fVxuXHQmOmxhc3Qtb2YtdHlwZSB7XG5cdFx0bWFyZ2luLWJvdHRvbTogJHsgc3BhY2UoIC0yICkgfTtcblx0fVxuXG5cdCR7IHBhZGRpbmcgfTtcbmA7XG4iXX0= */");
};
var DropdownContentWrapperDiv = /* @__PURE__ */ (0, import_base.default)("div", process.env.NODE_ENV === "production" ? {
  target: "eovvns30"
} : {
  target: "eovvns30",
  label: "DropdownContentWrapperDiv"
})("margin-left:", (0, import_space.space)(-2), ";margin-right:", (0, import_space.space)(-2), ";&:first-of-type{margin-top:", (0, import_space.space)(-2), ";}&:last-of-type{margin-bottom:", (0, import_space.space)(-2), ";}", padding, ";" + (process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN0eWxlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUEyQmtGIiwiZmlsZSI6InN0eWxlcy50cyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogRXh0ZXJuYWwgZGVwZW5kZW5jaWVzXG4gKi9cbmltcG9ydCB7IGNzcyB9IGZyb20gJ0BlbW90aW9uL3JlYWN0JztcbmltcG9ydCBzdHlsZWQgZnJvbSAnQGVtb3Rpb24vc3R5bGVkJztcblxuLyoqXG4gKiBJbnRlcm5hbCBkZXBlbmRlbmNpZXNcbiAqL1xuaW1wb3J0IHsgc3BhY2UgfSBmcm9tICcuLi91dGlscy9zcGFjZSc7XG5pbXBvcnQgdHlwZSB7IERyb3Bkb3duQ29udGVudFdyYXBwZXJQcm9wcyB9IGZyb20gJy4vdHlwZXMnO1xuXG5jb25zdCBwYWRkaW5nID0gKCB7IHBhZGRpbmdTaXplID0gJ3NtYWxsJyB9OiBEcm9wZG93bkNvbnRlbnRXcmFwcGVyUHJvcHMgKSA9PiB7XG5cdGlmICggcGFkZGluZ1NpemUgPT09ICdub25lJyApIHtcblx0XHRyZXR1cm47XG5cdH1cblxuXHRjb25zdCBwYWRkaW5nVmFsdWVzID0ge1xuXHRcdHNtYWxsOiBzcGFjZSggMiApLFxuXHRcdG1lZGl1bTogc3BhY2UoIDQgKSxcblx0fTtcblxuXHRyZXR1cm4gY3NzYFxuXHRcdHBhZGRpbmc6ICR7IHBhZGRpbmdWYWx1ZXNbIHBhZGRpbmdTaXplIF0gfHwgcGFkZGluZ1ZhbHVlcy5zbWFsbCB9O1xuXHRgO1xufTtcblxuZXhwb3J0IGNvbnN0IERyb3Bkb3duQ29udGVudFdyYXBwZXJEaXYgPSBzdHlsZWQuZGl2PCBEcm9wZG93bkNvbnRlbnRXcmFwcGVyUHJvcHMgPmBcblx0Ly8gTmVnYXRpdmUgbWFyZ2luIHRvIHJlc2V0IChvZmZzZXQpIHRoZSBkZWZhdWx0IHBhZGRpbmcgb24gLmNvbXBvbmVudHMtcG9wb3Zlcl9fY29udGVudFxuXHRtYXJnaW4tbGVmdDogJHsgc3BhY2UoIC0yICkgfTtcblx0bWFyZ2luLXJpZ2h0OiAkeyBzcGFjZSggLTIgKSB9O1xuXHQmOmZpcnN0LW9mLXR5cGUge1xuXHRcdG1hcmdpbi10b3A6ICR7IHNwYWNlKCAtMiApIH07XG5cdH1cblx0JjpsYXN0LW9mLXR5cGUge1xuXHRcdG1hcmdpbi1ib3R0b206ICR7IHNwYWNlKCAtMiApIH07XG5cdH1cblxuXHQkeyBwYWRkaW5nIH07XG5gO1xuIl19 */"));
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  DropdownContentWrapperDiv
});
//# sourceMappingURL=styles.cjs.map
