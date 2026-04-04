/**
 * Internal dependencies
 */
import type { NormalizedFilter, View } from '../../types';
interface ResetFilterProps {
    filters: NormalizedFilter[];
    view: View;
    onChangeView: (view: View) => void;
}
export default function ResetFilter({ filters, view, onChangeView, }: ResetFilterProps): import("react").JSX.Element;
export {};
//# sourceMappingURL=reset-filters.d.ts.map