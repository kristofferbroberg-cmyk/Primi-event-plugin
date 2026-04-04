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

// packages/dataviews/src/index.ts
var index_exports = {};
__export(index_exports, {
  DataForm: () => import_dataform.default,
  DataViews: () => import_dataviews.default,
  DataViewsPicker: () => import_dataviews_picker.default,
  VIEW_LAYOUTS: () => import_dataviews_layouts.VIEW_LAYOUTS,
  filterSortAndPaginate: () => import_filter_sort_and_paginate.default,
  useFormValidity: () => import_hooks.useFormValidity
});
module.exports = __toCommonJS(index_exports);
var import_dataviews = __toESM(require("./dataviews/index.cjs"));
var import_dataviews_picker = __toESM(require("./dataviews-picker/index.cjs"));
var import_dataform = __toESM(require("./dataform/index.cjs"));
var import_filter_sort_and_paginate = __toESM(require("./utils/filter-sort-and-paginate.cjs"));
var import_hooks = require("./hooks/index.cjs");
var import_dataviews_layouts = require("./components/dataviews-layouts/index.cjs");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  DataForm,
  DataViews,
  DataViewsPicker,
  VIEW_LAYOUTS,
  filterSortAndPaginate,
  useFormValidity
});
//# sourceMappingURL=index.cjs.map
