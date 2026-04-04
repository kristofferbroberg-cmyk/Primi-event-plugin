/**
 * External dependencies
 */
import type { ComponentProps, ReactElement } from 'react';
/**
 * Internal dependencies
 */
import type { NormalizedField } from '../../../types';
declare function ColumnPrimary<Item>({ item, level, titleField, mediaField, descriptionField, onClickItem, renderItemLink, isItemClickable, }: {
    item: Item;
    level?: number;
    titleField?: NormalizedField<Item>;
    mediaField?: NormalizedField<Item>;
    descriptionField?: NormalizedField<Item>;
    onClickItem?: (item: Item) => void;
    renderItemLink?: (props: {
        item: Item;
    } & ComponentProps<'a'>) => ReactElement;
    isItemClickable: (item: Item) => boolean;
}): import("react").JSX.Element;
export default ColumnPrimary;
//# sourceMappingURL=column-primary.d.ts.map