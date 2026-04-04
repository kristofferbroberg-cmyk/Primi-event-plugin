import type { Action, Field } from '../../types';
export type OrderEvent = {
    id: number;
    name: {
        title: string;
        description: string;
    };
    type: string;
    categories: string[];
    date: string;
    datetime: string;
    email?: string;
    orderNumber: string;
};
export declare const eventTypeIcons: Record<string, any>;
export declare const orderEventData: OrderEvent[];
export declare const orderEventFields: Field<OrderEvent>[];
export declare const orderEventActions: Action<OrderEvent>[];
declare const LayoutActivityComponent: ({ backgroundColor, fullWidth, hasClickableItems, groupBy, groupByLabel, perPageSizes, showMedia, }: {
    backgroundColor?: string;
    fullWidth?: boolean;
    hasClickableItems?: boolean;
    groupBy?: boolean;
    groupByLabel?: boolean;
    perPageSizes?: number[];
    showMedia?: boolean;
}) => import("react").JSX.Element;
export default LayoutActivityComponent;
//# sourceMappingURL=layout-activity.d.ts.map