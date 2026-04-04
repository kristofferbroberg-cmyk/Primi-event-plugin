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

// packages/dataviews/src/field-types/utils/render-from-elements.tsx
var render_from_elements_exports = {};
__export(render_from_elements_exports, {
  default: () => RenderFromElements
});
module.exports = __toCommonJS(render_from_elements_exports);
var import_use_elements = __toESM(require("../../hooks/use-elements.cjs"));
function RenderFromElements({
  item,
  field
}) {
  const { elements, isLoading } = (0, import_use_elements.default)({
    elements: field.elements,
    getElements: field.getElements
  });
  const value = field.getValue({ item });
  if (isLoading) {
    return value;
  }
  if (elements.length === 0) {
    return value;
  }
  return elements?.find((element) => element.value === value)?.label || field.getValue({ item });
}
//# sourceMappingURL=render-from-elements.cjs.map
