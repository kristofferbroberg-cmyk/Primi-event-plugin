// packages/dataviews/src/components/dataform-layouts/panel/utils/get-label-classname.ts
import clsx from "clsx";
function getLabelClassName(labelPosition, showError) {
  return clsx(
    "dataforms-layouts-panel__field-label",
    `dataforms-layouts-panel__field-label--label-position-${labelPosition}`,
    { "has-error": showError }
  );
}
var get_label_classname_default = getLabelClassName;
export {
  get_label_classname_default as default
};
//# sourceMappingURL=get-label-classname.mjs.map
