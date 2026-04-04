/**
 * An icon-only button with automatic tooltip and optimized styling.
 * Inherits all Button props while providing icon-specific enhancements.
 */
export declare const IconButton: import("react").ForwardRefExoticComponent<Omit<import("../button/types").ButtonProps, "children"> & {
    label: string;
    icon: import("../icon/types").IconProps["icon"];
    shortcut?: {
        displayShortcut: string;
        ariaKeyShortcut: string;
    };
} & import("react").RefAttributes<HTMLButtonElement>>;
//# sourceMappingURL=icon-button.d.ts.map