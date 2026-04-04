/**
 * Internal dependencies
 */
import type { NormalizedField, NormalizedSummaryField } from '../../types';
/**
 * Returns the summary fields for a given field.
 * @param summaryField - The summary field configuration.
 * @param fields       - The fields to get the summary fields from.
 * @return The summary fields.
 */
export declare const getSummaryFields: <Item>(summaryField: NormalizedSummaryField, fields: NormalizedField<Item>[]) => NormalizedField<Item>[];
//# sourceMappingURL=get-summary-fields.d.ts.map