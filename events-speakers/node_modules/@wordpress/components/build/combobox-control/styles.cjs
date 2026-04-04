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

// packages/components/src/combobox-control/styles.ts
var styles_exports = {};
__export(styles_exports, {
  InputWrapperFlex: () => InputWrapperFlex
});
module.exports = __toCommonJS(styles_exports);
var import_base = __toESM(require("@emotion/styled/base"));
var import_react = require("@emotion/react");
var import_flex = require("../flex/index.cjs");
var import_space = require("../utils/space.cjs");
var deprecatedDefaultSize = ({
  __next40pxDefaultSize
}) => !__next40pxDefaultSize && /* @__PURE__ */ (0, import_react.css)("height:28px;padding-left:", (0, import_space.space)(1), ";padding-right:", (0, import_space.space)(1), ";" + (process.env.NODE_ENV === "production" ? "" : ";label:deprecatedDefaultSize;"), process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN0eWxlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFpQkkiLCJmaWxlIjoic3R5bGVzLnRzIiwic291cmNlc0NvbnRlbnQiOlsiLyoqXG4gKiBFeHRlcm5hbCBkZXBlbmRlbmNpZXNcbiAqL1xuaW1wb3J0IHN0eWxlZCBmcm9tICdAZW1vdGlvbi9zdHlsZWQnO1xuaW1wb3J0IHsgY3NzIH0gZnJvbSAnQGVtb3Rpb24vcmVhY3QnO1xuXG4vKipcbiAqIEludGVybmFsIGRlcGVuZGVuY2llc1xuICovXG5pbXBvcnQgeyBGbGV4IH0gZnJvbSAnLi4vZmxleCc7XG5pbXBvcnQgeyBzcGFjZSB9IGZyb20gJy4uL3V0aWxzL3NwYWNlJztcbmltcG9ydCB0eXBlIHsgQ29tYm9ib3hDb250cm9sUHJvcHMgfSBmcm9tICcuL3R5cGVzJztcblxuY29uc3QgZGVwcmVjYXRlZERlZmF1bHRTaXplID0gKCB7XG5cdF9fbmV4dDQwcHhEZWZhdWx0U2l6ZSxcbn06IFBpY2s8IENvbWJvYm94Q29udHJvbFByb3BzLCAnX19uZXh0NDBweERlZmF1bHRTaXplJyA+ICkgPT5cblx0ISBfX25leHQ0MHB4RGVmYXVsdFNpemUgJiZcblx0Y3NzYFxuXHRcdGhlaWdodDogMjhweDsgLy8gMzBweCAtIDJweCB2ZXJ0aWNhbCBib3JkZXJzIG9uIHBhcmVudCBjb250YWluZXJcblx0XHRwYWRkaW5nLWxlZnQ6ICR7IHNwYWNlKCAxICkgfTtcblx0XHRwYWRkaW5nLXJpZ2h0OiAkeyBzcGFjZSggMSApIH07XG5cdGA7XG5cbmV4cG9ydCBjb25zdCBJbnB1dFdyYXBwZXJGbGV4ID0gc3R5bGVkKCBGbGV4IClgXG5cdGhlaWdodDogMzhweDsgLy8gNDBweCAtIDJweCB2ZXJ0aWNhbCBib3JkZXJzIG9uIHBhcmVudCBjb250YWluZXJcblx0cGFkZGluZy1sZWZ0OiAkeyBzcGFjZSggMiApIH07XG5cdHBhZGRpbmctcmlnaHQ6ICR7IHNwYWNlKCAyICkgfTtcblxuXHQkeyBkZXByZWNhdGVkRGVmYXVsdFNpemUgfVxuYDtcbiJdfQ== */");
var InputWrapperFlex = /* @__PURE__ */ (0, import_base.default)(import_flex.Flex, process.env.NODE_ENV === "production" ? {
  target: "evuatpg0"
} : {
  target: "evuatpg0",
  label: "InputWrapperFlex"
})("height:38px;padding-left:", (0, import_space.space)(2), ";padding-right:", (0, import_space.space)(2), ";", deprecatedDefaultSize, ";" + (process.env.NODE_ENV === "production" ? "" : "/*# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInN0eWxlcy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUF1QjhDIiwiZmlsZSI6InN0eWxlcy50cyIsInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogRXh0ZXJuYWwgZGVwZW5kZW5jaWVzXG4gKi9cbmltcG9ydCBzdHlsZWQgZnJvbSAnQGVtb3Rpb24vc3R5bGVkJztcbmltcG9ydCB7IGNzcyB9IGZyb20gJ0BlbW90aW9uL3JlYWN0JztcblxuLyoqXG4gKiBJbnRlcm5hbCBkZXBlbmRlbmNpZXNcbiAqL1xuaW1wb3J0IHsgRmxleCB9IGZyb20gJy4uL2ZsZXgnO1xuaW1wb3J0IHsgc3BhY2UgfSBmcm9tICcuLi91dGlscy9zcGFjZSc7XG5pbXBvcnQgdHlwZSB7IENvbWJvYm94Q29udHJvbFByb3BzIH0gZnJvbSAnLi90eXBlcyc7XG5cbmNvbnN0IGRlcHJlY2F0ZWREZWZhdWx0U2l6ZSA9ICgge1xuXHRfX25leHQ0MHB4RGVmYXVsdFNpemUsXG59OiBQaWNrPCBDb21ib2JveENvbnRyb2xQcm9wcywgJ19fbmV4dDQwcHhEZWZhdWx0U2l6ZScgPiApID0+XG5cdCEgX19uZXh0NDBweERlZmF1bHRTaXplICYmXG5cdGNzc2Bcblx0XHRoZWlnaHQ6IDI4cHg7IC8vIDMwcHggLSAycHggdmVydGljYWwgYm9yZGVycyBvbiBwYXJlbnQgY29udGFpbmVyXG5cdFx0cGFkZGluZy1sZWZ0OiAkeyBzcGFjZSggMSApIH07XG5cdFx0cGFkZGluZy1yaWdodDogJHsgc3BhY2UoIDEgKSB9O1xuXHRgO1xuXG5leHBvcnQgY29uc3QgSW5wdXRXcmFwcGVyRmxleCA9IHN0eWxlZCggRmxleCApYFxuXHRoZWlnaHQ6IDM4cHg7IC8vIDQwcHggLSAycHggdmVydGljYWwgYm9yZGVycyBvbiBwYXJlbnQgY29udGFpbmVyXG5cdHBhZGRpbmctbGVmdDogJHsgc3BhY2UoIDIgKSB9O1xuXHRwYWRkaW5nLXJpZ2h0OiAkeyBzcGFjZSggMiApIH07XG5cblx0JHsgZGVwcmVjYXRlZERlZmF1bHRTaXplIH1cbmA7XG4iXX0= */"));
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  InputWrapperFlex
});
//# sourceMappingURL=styles.cjs.map
