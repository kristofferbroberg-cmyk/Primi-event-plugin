declare const ValidationComponent: ({ required, elements, custom, pattern, minMax, layout, }: {
    required: boolean;
    elements: "sync" | "async" | "none";
    custom: "sync" | "async" | "none";
    pattern: boolean;
    minMax: boolean;
    layout: "regular" | "panel-dropdown" | "panel-modal" | "card-collapsible" | "card-not-collapsible" | "details";
}) => import("react").JSX.Element;
export default ValidationComponent;
//# sourceMappingURL=validation.d.ts.map