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

// packages/ui/src/form/primitives/index.ts
var primitives_exports = {};
__export(primitives_exports, {
  Field: () => Field,
  Fieldset: () => Fieldset,
  Input: () => import_input.Input,
  InputLayout: () => import_input_layout.InputLayout,
  Select: () => Select,
  Textarea: () => import_textarea.Textarea
});
module.exports = __toCommonJS(primitives_exports);
var Field = __toESM(require("./field/index.cjs"));
var Fieldset = __toESM(require("./fieldset/index.cjs"));
var import_input = require("./input/index.cjs");
var import_input_layout = require("./input-layout/index.cjs");
var Select = __toESM(require("./select/index.cjs"));
var import_textarea = require("./textarea/index.cjs");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Field,
  Fieldset,
  Input,
  InputLayout,
  Select,
  Textarea
});
//# sourceMappingURL=index.cjs.map
