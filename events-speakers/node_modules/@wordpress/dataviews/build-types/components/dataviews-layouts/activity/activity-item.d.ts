import type { NormalizedField, ViewActivityProps } from '../../../types';
declare function ActivityItem<Item>(props: ViewActivityProps<Item> & {
    item: Item;
    mediaField?: NormalizedField<Item>;
    titleField?: NormalizedField<Item>;
    descriptionField?: NormalizedField<Item>;
    otherFields: NormalizedField<Item>[];
    posinset?: number;
}): import("react").JSX.Element;
export default ActivityItem;
//# sourceMappingURL=activity-item.d.ts.map