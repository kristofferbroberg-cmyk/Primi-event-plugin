/**
 * Internal dependencies
 */
import type { NormalizedField } from '../../../types';
interface ActivityGroupProps<Item> {
    groupName: string;
    groupData: Item[];
    groupField: NormalizedField<Item>;
    showLabel?: boolean;
    children: React.ReactNode;
}
export default function ActivityGroup<Item>({ groupName, groupData, groupField, showLabel, children, }: ActivityGroupProps<Item>): import("react").JSX.Element;
export {};
//# sourceMappingURL=activity-group.d.ts.map