import type { EditVisibility } from '../../types';
declare const LayoutPanelComponent: ({ labelPosition, openAs: openAsArg, editVisibility, applyLabel, cancelLabel, }: {
    type: "default" | "regular" | "panel" | "card";
    labelPosition: "default" | "top" | "side" | "none";
    openAs: "default" | "dropdown" | "modal";
    editVisibility: "default" | EditVisibility;
    applyLabel?: string;
    cancelLabel?: string;
}) => import("react").JSX.Element;
export default LayoutPanelComponent;
//# sourceMappingURL=layout-panel.d.ts.map