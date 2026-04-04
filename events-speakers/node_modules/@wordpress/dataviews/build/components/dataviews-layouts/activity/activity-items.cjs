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

// packages/dataviews/src/components/dataviews-layouts/activity/activity-items.tsx
var activity_items_exports = {};
__export(activity_items_exports, {
  default: () => ActivityItems
});
module.exports = __toCommonJS(activity_items_exports);
var import_activity_item = __toESM(require("./activity-item.cjs"));
var import_react = require("react");
function isDefined(item) {
  return !!item;
}
function ActivityItems(props) {
  const { data, fields, getItemId, view } = props;
  const titleField = fields.find((field) => field.id === view.titleField);
  const mediaField = fields.find((field) => field.id === view.mediaField);
  const descriptionField = fields.find(
    (field) => field.id === view.descriptionField
  );
  const otherFields = (view?.fields ?? []).map((fieldId) => fields.find((f) => fieldId === f.id)).filter(isDefined);
  return data.map((item, index) => {
    return /* @__PURE__ */ (0, import_react.createElement)(
      import_activity_item.default,
      {
        ...props,
        key: getItemId(item),
        item,
        mediaField,
        titleField,
        descriptionField,
        otherFields,
        posinset: view.infiniteScrollEnabled ? index + 1 : void 0
      }
    );
  });
}
//# sourceMappingURL=activity-items.cjs.map
