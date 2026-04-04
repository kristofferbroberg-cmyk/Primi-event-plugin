/**
 * External dependencies
 */
import type { PropsWithoutRef, RefAttributes } from 'react';
import type { NormalizedField, ViewTable as ViewTableType, ViewPickerTable as ViewPickerTableType } from '../../../types';
interface HeaderMenuProps<Item> {
    fieldId: string;
    view: ViewTableType | ViewPickerTableType;
    fields: NormalizedField<Item>[];
    onChangeView: (view: ViewTableType | ViewPickerTableType) => void;
    onHide: (field: NormalizedField<Item>) => void;
    setOpenedFilter: (fieldId: string) => void;
    canMove?: boolean;
    canInsertLeft?: boolean;
    canInsertRight?: boolean;
}
declare const _HeaderMenu: import("react").ForwardRefExoticComponent<HeaderMenuProps<unknown> & RefAttributes<HTMLButtonElement>>;
declare const ColumnHeaderMenu: <Item>(props: PropsWithoutRef<HeaderMenuProps<Item>> & RefAttributes<HTMLButtonElement>) => ReturnType<typeof _HeaderMenu>;
export default ColumnHeaderMenu;
//# sourceMappingURL=column-header-menu.d.ts.map