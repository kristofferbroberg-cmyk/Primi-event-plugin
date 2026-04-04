// packages/dataviews/src/utils/get-hideable-fields.ts
function getHideableFields(view, fields) {
  const togglableFields = [
    view?.titleField,
    view?.mediaField,
    view?.descriptionField
  ].filter(Boolean);
  return fields.filter(
    (f) => !togglableFields.includes(f.id) && f.type !== "media" && f.enableHiding !== false
  );
}
export {
  getHideableFields as default
};
//# sourceMappingURL=get-hideable-fields.mjs.map
