"use strict";
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// packages/dataviews/src/components/dataviews-layouts/utils/get-data-by-group.ts
var get_data_by_group_exports = {};
__export(get_data_by_group_exports, {
  default: () => getDataByGroup
});
module.exports = __toCommonJS(get_data_by_group_exports);
function getDataByGroup(data, groupByField) {
  return data.reduce((groups, item) => {
    const groupName = groupByField.getValue({ item });
    if (!groups.has(groupName)) {
      groups.set(groupName, []);
    }
    groups.get(groupName)?.push(item);
    return groups;
  }, /* @__PURE__ */ new Map());
}
//# sourceMappingURL=get-data-by-group.cjs.map
