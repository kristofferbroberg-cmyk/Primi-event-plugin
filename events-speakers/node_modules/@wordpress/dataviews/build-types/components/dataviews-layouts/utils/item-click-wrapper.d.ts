/**
 * External dependencies
 */
import type { ReactNode, ReactElement, ComponentProps } from 'react';
export declare function ItemClickWrapper<Item>({ item, isItemClickable, onClickItem, renderItemLink, className, children, ...extraProps }: {
    item: Item;
    isItemClickable: (item: Item) => boolean;
    onClickItem?: (item: Item) => void;
    renderItemLink?: (props: {
        item: Item;
    } & ComponentProps<'a'>) => ReactElement;
    className?: string;
    title?: string;
    children: ReactNode;
}): import("react").JSX.Element;
//# sourceMappingURL=item-click-wrapper.d.ts.map