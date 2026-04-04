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

// packages/components/src/utils/strings.ts
var strings_exports = {};
__export(strings_exports, {
  escapeRegExp: () => escapeRegExp,
  kebabCase: () => kebabCase,
  normalizeTextString: () => normalizeTextString
});
module.exports = __toCommonJS(strings_exports);
var import_remove_accents = __toESM(require("remove-accents"));
var import_change_case = require("change-case");
var ALL_UNICODE_DASH_CHARACTERS = new RegExp(/[\u007e\u00ad\u2053\u207b\u208b\u2212\p{Pd}]/gu);
var normalizeTextString = (value) => {
  return (0, import_remove_accents.default)(value).normalize("NFKC").toLocaleLowerCase().replace(ALL_UNICODE_DASH_CHARACTERS, "-");
};
function kebabCase(str) {
  let input = str?.toString?.() ?? "";
  input = input.replace(/['\u2019]/, "");
  return (0, import_change_case.paramCase)(input, {
    splitRegexp: [
      /(?!(?:1ST|2ND|3RD|[4-9]TH)(?![a-z]))([a-z0-9])([A-Z])/g,
      // fooBar => foo-bar, 3Bar => 3-bar
      /(?!(?:1st|2nd|3rd|[4-9]th)(?![a-z]))([0-9])([a-z])/g,
      // 3bar => 3-bar
      /([A-Za-z])([0-9])/g,
      // Foo3 => foo-3, foo3 => foo-3
      /([A-Z])([A-Z][a-z])/g
      // FOOBar => foo-bar
    ]
  });
}
function escapeRegExp(string) {
  return string.replace(/[\\^$.*+?()[\]{}|]/g, "\\$&");
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  escapeRegExp,
  kebabCase,
  normalizeTextString
});
//# sourceMappingURL=strings.cjs.map
