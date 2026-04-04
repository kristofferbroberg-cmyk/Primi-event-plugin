/**
 * Internal dependencies
 */
import type { NormalizedFormField, NormalizedField } from '../../../../types';
/**
 * Determines the field definition and summary fields for a panel layout.
 *
 * Summary fields are determined with the following priority:
 * 1. Use layout.summary fields if they exist
 * 2. Fall back to the field definition that matches the form field's id
 * 3. If the form field id doesn't exist, pick the first child field
 * 4. If no field definition is found, return empty summary fields
 *
 * @param field The form field to get definition for
 * @return Object containing fieldDefinition, fieldLabel, and summaryFields
 */
declare function useFieldFromFormField(field: NormalizedFormField): {
    summaryFields: NormalizedField<any>[];
    fieldDefinition: NormalizedField<any> | undefined;
    fieldLabel: string | undefined;
};
export default useFieldFromFormField;
//# sourceMappingURL=use-field-from-form-field.d.ts.map