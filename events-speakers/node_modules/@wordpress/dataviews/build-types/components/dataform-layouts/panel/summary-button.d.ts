/**
 * Internal dependencies
 */
import type { FieldValidity, NormalizedField, NormalizedFormField } from '../../../types';
export default function SummaryButton<Item>({ data, field, fieldLabel, summaryFields, validity, touched, disabled, onClick, 'aria-expanded': ariaExpanded, }: {
    data: Item;
    field: NormalizedFormField;
    fieldLabel?: string;
    summaryFields: NormalizedField<Item>[];
    validity?: FieldValidity;
    touched: boolean;
    disabled?: boolean;
    onClick: () => void;
    'aria-expanded'?: boolean;
}): import("react").JSX.Element;
//# sourceMappingURL=summary-button.d.ts.map