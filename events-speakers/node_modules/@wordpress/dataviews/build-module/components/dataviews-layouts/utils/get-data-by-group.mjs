// packages/dataviews/src/components/dataviews-layouts/utils/get-data-by-group.ts
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
export {
  getDataByGroup as default
};
//# sourceMappingURL=get-data-by-group.mjs.map
