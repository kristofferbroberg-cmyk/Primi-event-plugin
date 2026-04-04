/**
 * Internal dependencies
 */
import type { NormalizedRules, FieldValidity } from '../../../types';
export default function getCustomValidity<Item>(isValid: NormalizedRules<Item>, validity: FieldValidity | undefined): {
    type: "valid" | "invalid" | "validating";
    message?: string;
} | undefined;
//# sourceMappingURL=get-custom-validity.d.ts.map