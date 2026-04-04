import type { AutocompleteProps, UseAutocompleteProps } from './types';
export declare function useAutocomplete({ record, onChange, onReplace, completers, contentRef, }: UseAutocompleteProps): {
    listBoxId: string | undefined;
    activeId: string | null;
    onKeyDown: (event: KeyboardEvent) => void;
    popover: false | import("react").JSX.Element;
};
export declare function useAutocompleteProps(options: UseAutocompleteProps): {
    ref: import("react").RefCallback<HTMLElement>;
    children?: undefined;
    'aria-autocomplete'?: undefined;
    'aria-owns'?: undefined;
    'aria-activedescendant'?: undefined;
} | {
    ref: import("react").RefCallback<HTMLElement>;
    children: false | import("react").JSX.Element;
    'aria-autocomplete': string | undefined;
    'aria-owns': string | undefined;
    'aria-activedescendant': string | null;
};
export default function Autocomplete({ children, isSelected, ...options }: AutocompleteProps): import("react").JSX.Element;
//# sourceMappingURL=index.d.ts.map