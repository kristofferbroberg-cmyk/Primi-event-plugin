import type { Field, Form, FormValidity } from '../types';
/**
 * Hook that validates a form item and returns an object with error messages for each field.
 *
 * @param item   The item to validate.
 * @param fields Fields config.
 * @param form   Form config.
 *
 * @return Record of field IDs to error messages (undefined means no error).
 */
export declare function useFormValidity<Item>(item: Item, fields: Field<Item>[], form: Form): {
    validity: FormValidity;
    isValid: boolean;
};
export default useFormValidity;
//# sourceMappingURL=use-form-validity.d.ts.map