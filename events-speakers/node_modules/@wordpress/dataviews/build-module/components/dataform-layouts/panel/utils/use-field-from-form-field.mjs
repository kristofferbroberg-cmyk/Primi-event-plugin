// packages/dataviews/src/components/dataform-layouts/panel/utils/use-field-from-form-field.ts
import { useContext } from "@wordpress/element";
import { getSummaryFields } from "../../get-summary-fields.mjs";
import DataFormContext from "../../../dataform-context/index.mjs";
var getFieldDefinition = (field, fields) => {
  const fieldDefinition = fields.find((_field) => _field.id === field.id);
  if (!fieldDefinition) {
    return fields.find((_field) => {
      if (!!field.children) {
        const simpleChildren = field.children.filter(
          (child) => !child.children
        );
        if (simpleChildren.length === 0) {
          return false;
        }
        return _field.id === simpleChildren[0].id;
      }
      return _field.id === field.id;
    });
  }
  return fieldDefinition;
};
function useFieldFromFormField(field) {
  const { fields } = useContext(DataFormContext);
  const layout = field.layout;
  const summaryFields = getSummaryFields(layout.summary, fields);
  const fieldDefinition = getFieldDefinition(field, fields);
  const fieldLabel = !!field.children ? field.label : fieldDefinition?.label;
  if (summaryFields.length === 0) {
    return {
      summaryFields: fieldDefinition ? [fieldDefinition] : [],
      fieldDefinition,
      fieldLabel
    };
  }
  return {
    summaryFields,
    fieldDefinition,
    fieldLabel
  };
}
var use_field_from_form_field_default = useFieldFromFormField;
export {
  use_field_from_form_field_default as default
};
//# sourceMappingURL=use-field-from-form-field.mjs.map
