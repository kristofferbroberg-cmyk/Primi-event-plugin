import type { ComponentProps, ReactElement } from 'react';
import type { Action, NormalizedField, ViewGrid as ViewGridType } from '../../../types';
import type { SetSelection } from '../../../types/private';
interface CompositeGridProps<Item> {
    data: Item[];
    isInfiniteScroll: boolean;
    className?: string;
    inert?: string;
    isLoading?: boolean;
    view: ViewGridType;
    fields: NormalizedField<Item>[];
    selection: string[];
    onChangeSelection: SetSelection;
    onClickItem?: (item: Item) => void;
    isItemClickable: (item: Item) => boolean;
    renderItemLink?: (props: {
        item: Item;
    } & ComponentProps<'a'>) => ReactElement;
    getItemId: (item: Item) => string;
    actions: Action<Item>[];
}
export default function CompositeGrid<Item>({ data, isInfiniteScroll, className, inert, isLoading, view, fields, selection, onChangeSelection, onClickItem, isItemClickable, renderItemLink, getItemId, actions, }: CompositeGridProps<Item>): import("react").JSX.Element;
export {};
//# sourceMappingURL=composite-grid.d.ts.map