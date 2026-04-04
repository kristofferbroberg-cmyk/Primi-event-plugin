/**
 * Internal dependencies
 */
import type { View, NormalizedFilter, NormalizedField } from '../../types';
interface UserInputWidgetProps {
    view: View;
    filter: NormalizedFilter;
    onChangeView: (view: View) => void;
    fields: NormalizedField<any>[];
}
export default function InputWidget({ filter, view, onChangeView, fields, }: UserInputWidgetProps): import("react").JSX.Element | null;
export {};
//# sourceMappingURL=input-widget.d.ts.map