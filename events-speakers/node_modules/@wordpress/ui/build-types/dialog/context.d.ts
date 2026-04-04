type DialogValidationContextType = {
    registerTitle: (element: HTMLElement | null) => void;
};
/**
 * Development-only hook to access the dialog validation context.
 */
declare function useDialogValidationContextDev(): DialogValidationContextType | null;
/**
 * Hook to access the dialog validation context.
 * Returns null in production or if not within a Dialog.Popup.
 */
export declare const useDialogValidationContext: typeof useDialogValidationContextDev;
/**
 * Development-only provider that tracks whether Dialog.Title is rendered.
 */
declare function DialogValidationProviderDev({ children, }: {
    children: React.ReactNode;
}): import("react").JSX.Element;
/**
 * Provider component that validates Dialog.Title presence in development mode.
 * In production, this component is a no-op and just renders children.
 */
export declare const DialogValidationProvider: typeof DialogValidationProviderDev;
export {};
//# sourceMappingURL=context.d.ts.map