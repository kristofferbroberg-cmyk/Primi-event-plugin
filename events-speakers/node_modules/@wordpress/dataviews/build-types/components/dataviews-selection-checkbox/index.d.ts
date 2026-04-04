/**
 * Internal dependencies
 */
import type { SetSelection } from '../../types/private';
import type { NormalizedField } from '../../types';
interface DataViewsSelectionCheckboxProps<Item> {
    selection: string[];
    onChangeSelection: SetSelection;
    item: Item;
    getItemId: (item: Item) => string;
    titleField?: NormalizedField<Item>;
    disabled: boolean;
    tabIndex?: number;
}
export default function DataViewsSelectionCheckbox<Item>({ selection, onChangeSelection, item, getItemId, titleField, disabled, ...extraProps }: DataViewsSelectionCheckboxProps<Item>): import("react").JSX.Element;
export {};
//# sourceMappingURL=index.d.ts.map